// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Test, console2} from "forge-std/Test.sol";
import {Pricing} from "../contracts/Pricing.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./mocks/MockERC20.sol";

contract PricingTest is Test {
    Pricing public pricing;
    MockERC20 public mockUSDC;
    address public owner;
    address public user;

    // Events from Pricing contract
    event CapsuleTypeUpdated(string name, uint256 basePrice, uint256 maxSize, uint256 duration);
    event PriceCalculated(address user, string capsuleType, uint256 totalPrice);

    function setUp() public {
        owner = address(this);
        user = makeAddr("user");
        
        // Deploy mock USDC
        mockUSDC = new MockERC20("USD Coin", "USDC", 6);
        
        // Deploy Pricing contract
        pricing = new Pricing(address(mockUSDC));

        // Mint some USDC to user
        mockUSDC.mint(user, 1000 * 10**6); // 1000 USDC
    }

    function test_Constructor() public {
        // Verify USDC token address
        assertEq(address(pricing.usdcToken()), address(mockUSDC));

        // Verify initial capsule types
        (uint256 basePrice, uint256 maxSize, uint256 duration) = getCapsuleTypeDetails("small");
        assertEq(basePrice, 2000000); // 2 USDC
        assertEq(maxSize, 10);
        assertEq(duration, 5);

        // Verify promotional period
        assertTrue(pricing.isPromotionalPeriod());
    }

    function test_CalculatePriceDuringPromo() public {
        // During promotional period
        assertTrue(pricing.isPromotionalPeriod());
        
        uint256 price = pricing.calculatePrice("small", 0, false);
        // Should be PROMO_FIXED_FEE (0.5 USDC) + 2% of transaction value
        assertEq(price, 500000); // 0.5 USDC
    }

    function test_CalculatePriceAfterPromo() public {
        // Warp time to after promotional period
        vm.warp(block.timestamp + 181 days);
        
        uint256 price = pricing.calculatePrice("small", 0, false);
        // Base price (2 USDC) + fixed fee (0.5 USDC) + 2% fee
        assertEq(price, 2550000); // 2.55 USDC
    }

    function test_ProcessPayment() public {
        uint256 initialBalance = mockUSDC.balanceOf(user);
        uint256 price = pricing.calculatePrice("small", 0, false);

        vm.startPrank(user);
        mockUSDC.approve(address(pricing), price);
        
        bool success = pricing.processCapsulePayment(user, "small", 0, false);
        assertTrue(success);
        
        // Verify balance deduction
        assertEq(mockUSDC.balanceOf(user), initialBalance - price);
        vm.stopPrank();
    }

    function test_UpdateCapsuleType() public {
        string memory capsuleType = "test";
        uint256 newBasePrice = 1000000; // 1 USDC
        uint256 newMaxSize = 5;
        uint256 newDuration = 1;

        vm.expectEmit(true, true, true, true);
        emit CapsuleTypeUpdated(capsuleType, newBasePrice, newMaxSize, newDuration);
        
        pricing.updateCapsuleType(capsuleType, newBasePrice, newMaxSize, newDuration);
        
        (uint256 basePrice, uint256 maxSize, uint256 duration) = getCapsuleTypeDetails(capsuleType);
        assertEq(basePrice, newBasePrice);
        assertEq(maxSize, newMaxSize);
        assertEq(duration, newDuration);
    }

    function test_WithdrawUSDC() public {
        uint256 amount = 100 * 10**6; // 100 USDC
        address recipient = makeAddr("recipient");
        
        // First, let's get some USDC in the contract
        mockUSDC.mint(address(pricing), amount);
        
        // Withdraw USDC
        pricing.withdrawUSDC(recipient, amount);
        
        // Verify recipient received the USDC
        assertEq(mockUSDC.balanceOf(recipient), amount);
    }

    function test_RevertOnInvalidCapsuleType() public {
        vm.expectRevert("Type de capsule invalide");
        pricing.calculatePrice("invalid_type", 0, false);
    }

    function test_ExtraStorageCalculation() public {
        vm.warp(block.timestamp + 181 days); // After promo period
        
        uint256 basePrice = pricing.calculatePrice("small", 0, false);
        uint256 priceWithStorage = pricing.calculatePrice("small", 2, false);
        
        // Extra storage should add 0.5 USDC per 10 Mo
        assertEq(priceWithStorage - basePrice, 1020000); // 1.02 USDC (1 USDC + 2% fee)
    }

    function test_CustomAccessPricing() public {
        vm.warp(block.timestamp + 181 days); // After promo period
        
        uint256 basePrice = pricing.calculatePrice("small", 0, false);
        uint256 priceWithCustomAccess = pricing.calculatePrice("small", 0, true);
        
        // Custom access should add 1.5 USDC + fee
        assertEq(priceWithCustomAccess - basePrice, 1530000); // 1.53 USDC (1.5 USDC + 2% fee)
    }

    // Helper function to get capsule type details
    function getCapsuleTypeDetails(string memory capsuleType) internal view returns (uint256, uint256, uint256) {
        (uint256 basePrice, uint256 maxSize, uint256 duration) = pricing.capsuleTypes(capsuleType);
        return (basePrice, maxSize, duration);
    }
}
