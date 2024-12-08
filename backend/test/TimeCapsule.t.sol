// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../contracts/TimeCapsule.sol";

contract TimeCapsuleTest is Test {
    TimeCapsule public timeCapsule;
    address public owner;
    address public user1;
    address public user2;

    event CapsuleCreated(
        uint256 indexed id, 
        address indexed owner, 
        uint256 unlockTime,
        string title,
        string description
    );

    event CapsuleUnlocked(
        uint256 indexed id,
        address indexed owner,
        uint256 unlockAt
    );

    event CapsuleMetadataUpdated(
        uint256 indexed id,
        string newTitle,
        string newDescription
    );

    function setUp() public {
        timeCapsule = new TimeCapsule();
        owner = address(this);
        user1 = address(0x1);
        user2 = address(0x2);
        
        // Give some ETH to test accounts
        vm.deal(user1, 100 ether);
        vm.deal(user2, 100 ether);
    }

    function testCreateCapsule() public {
        string memory content = "Test content";
        string memory title = "Test title";
        string memory description = "Test description";
        uint256 unlockTime = block.timestamp + 1 days;

        vm.prank(user1);
        timeCapsule.createCapsule(content, title, description, unlockTime);

        // Verify capsule was created
        (
            string memory storedContent,
            string memory storedTitle,
            string memory storedDescription,
            uint256 storedUnlockTime,
            address storedOwner,
            bool isUnlocked,
            uint96 createdAt
        ) = timeCapsule.capsules(0);

        assertEq(storedTitle, title, "Title should match");
        assertEq(storedDescription, description, "Description should match");
        assertEq(storedUnlockTime, unlockTime, "Unlock time should match");
        assertEq(storedOwner, user1, "Owner should be user1");
        assertFalse(isUnlocked, "Capsule should be locked");
        assertEq(uint256(createdAt), block.timestamp, "Created at should be current timestamp");
    }

    function testFailCreateCapsuleWithPastUnlockTime() public {
        vm.prank(user1);
        timeCapsule.createCapsule(
            "content",
            "title",
            "description",
            block.timestamp - 1 // Past time
        );
    }

    function testFailCreateCapsuleWithEmptyTitle() public {
        vm.prank(user1);
        timeCapsule.createCapsule(
            "content",
            "", // Empty title
            "description",
            block.timestamp + 1 days
        );
    }

    function testGetCapsuleByOwner() public {
        // Create capsules for different users
        vm.startPrank(user1);
        timeCapsule.createCapsule("content1", "title1", "desc1", block.timestamp + 1 days);
        timeCapsule.createCapsule("content2", "title2", "desc2", block.timestamp + 2 days);
        vm.stopPrank();

        vm.prank(user2);
        timeCapsule.createCapsule("content3", "title3", "desc3", block.timestamp + 3 days);

        // Get user1's capsules
        uint256[] memory user1Capsules = timeCapsule.getCapsuleByOwner(user1);
        assertEq(user1Capsules.length, 2, "User1 should have 2 capsules");

        // Get user2's capsules
        uint256[] memory user2Capsules = timeCapsule.getCapsuleByOwner(user2);
        assertEq(user2Capsules.length, 1, "User2 should have 1 capsule");
    }

    function testCanUnlock() public {
        // Create a capsule
        vm.prank(user1);
        timeCapsule.createCapsule(
            "content",
            "title",
            "description",
            block.timestamp + 1 days
        );

        // Should not be able to unlock yet
        assertFalse(timeCapsule.canUnlock(0), "Should not be able to unlock yet");

        // Fast forward time
        vm.warp(block.timestamp + 1 days);

        // Now should be able to unlock
        vm.prank(user1);
        assertTrue(timeCapsule.canUnlock(0), "Should be able to unlock now");

        // Other users should not be able to unlock
        vm.prank(user2);
        assertFalse(timeCapsule.canUnlock(0), "Other users should not be able to unlock");
    }

    function testUnlockCapsule() public {
        // Create a capsule
        vm.prank(user1);
        timeCapsule.createCapsule(
            "content",
            "title",
            "description",
            block.timestamp + 1 days
        );

        // Try to unlock too early
        vm.prank(user1);
        vm.expectRevert("Too early to unlock");
        timeCapsule.unlockCapsule(0);

        // Fast forward time
        vm.warp(block.timestamp + 1 days);

        // Unlock capsule
        vm.prank(user1);
        timeCapsule.unlockCapsule(0);

        // Verify capsule is unlocked
        (, , , , , bool isUnlocked, ) = timeCapsule.capsules(0);
        assertTrue(isUnlocked, "Capsule should be unlocked");

        // Try to unlock again
        vm.prank(user1);
        vm.expectRevert("Already unlocked");
        timeCapsule.unlockCapsule(0);
    }

    function testUpdateCapsuleMetadata() public {
        // Create a capsule
        vm.prank(user1);
        timeCapsule.createCapsule(
            "content",
            "title",
            "description",
            block.timestamp + 1 days
        );

        string memory newTitle = "New Title";
        string memory newDescription = "New Description";

        // Update metadata
        vm.prank(user1);
        timeCapsule.updateCapsuleMetadata(0, newTitle, newDescription);

        // Verify updates
        (, string memory storedTitle, string memory storedDescription, , , , ) = timeCapsule.capsules(0);
        assertEq(storedTitle, newTitle, "Title should be updated");
        assertEq(storedDescription, newDescription, "Description should be updated");

        // Try to update with wrong owner
        vm.prank(user2);
        vm.expectRevert("Not the capsule owner");
        timeCapsule.updateCapsuleMetadata(0, "Another Title", "Another Description");

        // Unlock capsule
        vm.warp(block.timestamp + 1 days);
        vm.prank(user1);
        timeCapsule.unlockCapsule(0);

        // Try to update after unlock
        vm.prank(user1);
        vm.expectRevert("Cannot modify unlocked capsule");
        timeCapsule.updateCapsuleMetadata(0, "Another Title", "Another Description");
    }

    function testDeleteCapsule() public {
        // Create a capsule
        vm.prank(user1);
        timeCapsule.createCapsule(
            "content",
            "title",
            "description",
            block.timestamp + 1 days
        );

        // Try to delete before unlock
        vm.prank(user1);
        vm.expectRevert("Can only delete unlocked capsules");
        timeCapsule.deleteCapsule(0);

        // Unlock capsule
        vm.warp(block.timestamp + 1 days);
        vm.prank(user1);
        timeCapsule.unlockCapsule(0);

        // Delete capsule
        vm.prank(user1);
        timeCapsule.deleteCapsule(0);

        // Verify capsule is deleted
        (, string memory title, , , , , ) = timeCapsule.capsules(0);
        assertEq(title, "", "Title should be empty after deletion");

        // Try to delete with wrong owner
        vm.prank(user2);
        vm.expectRevert("Not the capsule owner");
        timeCapsule.deleteCapsule(0);
    }

    function testEmitEvents() public {
        string memory content = "Test content";
        string memory title = "Test title";
        string memory description = "Test description";
        uint256 unlockTime = block.timestamp + 1 days;

        // Test CapsuleCreated event
        vm.expectEmit(true, true, false, true);
        emit CapsuleCreated(0, user1, unlockTime, title, description);
        
        vm.prank(user1);
        timeCapsule.createCapsule(content, title, description, unlockTime);

        // Test CapsuleMetadataUpdated event
        string memory newTitle = "New Title";
        string memory newDescription = "New Description";
        
        vm.expectEmit(true, false, false, true);
        emit CapsuleMetadataUpdated(0, newTitle, newDescription);
        
        vm.prank(user1);
        timeCapsule.updateCapsuleMetadata(0, newTitle, newDescription);

        // Test CapsuleUnlocked event
        vm.warp(unlockTime);
        
        vm.expectEmit(true, true, false, false);
        emit CapsuleUnlocked(0, user1, block.timestamp);
        
        vm.prank(user1);
        timeCapsule.unlockCapsule(0);
    }
}
