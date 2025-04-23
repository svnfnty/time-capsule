// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TimeCapsule {
    struct Capsule {
        string ipfsHash;
        uint256 unlockTimestamp;
        address owner;
        bool exists;
    }

    mapping(bytes32 => Capsule) private capsules;
    mapping(address => bytes32[]) private ownerCapsules;

    event CapsuleCreated(bytes32 indexed capsuleId, address indexed owner, uint256 unlockTimestamp);
    event CapsuleUnlocked(bytes32 indexed capsuleId, address indexed viewer);

    function createCapsule(string memory _ipfsHash, uint256 _unlockTimestamp) external {
        require(bytes(_ipfsHash).length > 0, "IPFS hash cannot be empty");
        require(_unlockTimestamp > block.timestamp, "Unlock time must be in the future");

        bytes32 capsuleId = keccak256(abi.encodePacked(_ipfsHash, _unlockTimestamp, msg.sender));
        require(!capsules[capsuleId].exists, "Capsule already exists");

        capsules[capsuleId] = Capsule({
            ipfsHash: _ipfsHash,
            unlockTimestamp: _unlockTimestamp,
            owner: msg.sender,
            exists: true
        });

        ownerCapsules[msg.sender].push(capsuleId);
        emit CapsuleCreated(capsuleId, msg.sender, _unlockTimestamp);
    }

    function getCapsuleContent(bytes32 _capsuleId) external view returns (string memory) {
        require(capsules[_capsuleId].exists, "Capsule does not exist");
        
        Capsule memory capsule = capsules[_capsuleId];
        if (block.timestamp >= capsule.unlockTimestamp || msg.sender == capsule.owner) {
            return capsule.ipfsHash;
        }
        
        revert("Capsule is still locked");
    }

    function getMyCapsules() external view returns (bytes32[] memory) {
        return ownerCapsules[msg.sender];
    }

    function isCapsuleUnlocked(bytes32 _capsuleId) external view returns (bool) {
        require(capsules[_capsuleId].exists, "Capsule does not exist");
        return block.timestamp >= capsules[_capsuleId].unlockTimestamp;
    }
}