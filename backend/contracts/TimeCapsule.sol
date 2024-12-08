// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract TimeCapsule is ReentrancyGuard {
    // Ajout de métadonnées importantes 
    struct Capsule {  
        string content;  
        string title;        // Titre de la capsule  
        string description;  // Description  
        uint256 unlockTime;  
        address owner;  
        bool isUnlocked;  
        uint96 createdAt;    // Timestamp de création  
    }  

    mapping(uint256 => Capsule) public capsules;
    uint256 public capsuleCount;
    uint256 public constant CREATION_FEE = 0.01 ether;

    // Events
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
    
    // Fonction de création de capsule
    function createCapsule(
        string memory _content, 
        string memory _title,
        string memory _description,
        uint256 _unlockTime
    ) public payable nonReentrant {
        require(_unlockTime > block.timestamp, "Unlock time must be in the future");
        require(bytes(_title).length > 0, "Title cannot be empty");

        capsules[capsuleCount] = Capsule({
            content: _content,
            title: _title,
            description: _description,
            unlockTime: _unlockTime,
            owner: msg.sender,
            isUnlocked: false,
            createdAt: uint96(block.timestamp)
        });

        emit CapsuleCreated(
            capsuleCount,
            msg.sender,
            _unlockTime,
            _title,
            _description
        );
        
        capsuleCount++;
    }

    // Fonction pour récupérer une capsule
    function getCapsuleByOwner(address _owner)
        public
        view
        returns (uint256[] memory) 
    {
        uint256[] memory result = new uint256[](capsuleCount);
        uint256 counter = 0;

        for (uint256 i = 0; i < capsuleCount; i++) {
            if (capsules[i].owner == _owner) {
                result[counter] = i;
                counter++;
            }
        }

        // Redimensionner le tableau au bon nombre 
        assembly {
            mstore(result, counter)
        }
        
        return result;
    }

    // Fonction pour vérifier si une capsule peut être dévérouillée
    function canUnlock(uint256 _id) public view returns (bool) {
        require(_id < capsuleCount, "Capsule does not exist");  
        Capsule storage capsule = capsules[_id];  
        
        return (  
            msg.sender == capsule.owner &&  
            block.timestamp >= capsule.unlockTime &&  
            !capsule.isUnlocked  
        );  
    }  

    // Fonction pour mettre à jour les métadonnées  
    function updateCapsuleMetadata(
        uint256 _id,  
        string memory _newTitle,  
        string memory _newDescription
    ) public {  
        require(_id < capsuleCount, "Capsule does not exist");  
        Capsule storage capsule = capsules[_id];  
        require(msg.sender == capsule.owner, "Not the capsule owner");  
        require(!capsule.isUnlocked, "Cannot modify unlocked capsule");  

        capsule.title = _newTitle;  
        capsule.description = _newDescription;  

        emit CapsuleMetadataUpdated(_id, _newTitle, _newDescription);  
    }  

    // Fonction pour supprimer une capsule (récupérer du storage)  
    function deleteCapsule(uint256 _id) public {  
        require(_id < capsuleCount, "Capsule does not exist");  
        Capsule storage capsule = capsules[_id];
        require(msg.sender == capsule.owner, "Not the capsule owner");  
        require(capsule.isUnlocked, "Can only delete unlocked capsules");  

        delete capsules[_id];  
    }  

    function unlockCapsule(uint256 _id) public {
        require(_id < capsuleCount, "Capsule does not exist");
        Capsule storage capsule = capsules[_id];
        require(msg.sender == capsule.owner, "Not the capsule owner");
        require(block.timestamp >= capsule.unlockTime, "Too early to unlock");
        require(!capsule.isUnlocked, "Already unlocked");

        capsule.isUnlocked = true;
        emit CapsuleUnlocked(_id, msg.sender, block.timestamp);
    }
}