// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract MedicalRecords {
    //address public owner; 
    struct Record {
        address owner;
        string cid;         // IPFS CID or encrypted URI
        bytes32 contentHash; // keccak256 or SHA-256 represented as bytes32
        uint256 createdAt;
    }
    
    //constructor() {
    //owner = msg.sender; // Deployer is the owner
//}

    mapping(uint256 => Record) public records;
    mapping(uint256 => mapping(address => bool)) public accessGranted;
    uint256 public nextRecordId;

    event RecordCreated(uint256 indexed recordId, address indexed owner, string cid, bytes32 contentHash);
    event AccessRequested(uint256 indexed recordId, address indexed requester);
    event AccessGranted(uint256 indexed recordId, address indexed grantee, address indexed by);
    event AccessRevoked(uint256 indexed recordId, address indexed grantee, address indexed by);

    modifier onlyOwner(uint256 id) {
        require(records[id].owner == msg.sender, "Not owner");
        _;
    }

    function createRecord(string calldata cid, bytes32 contentHash) external returns (uint256) {
        uint256 id = nextRecordId++;
        records[id] = Record({ owner: msg.sender, cid: cid, contentHash: contentHash, createdAt: block.timestamp });
        emit RecordCreated(id, msg.sender, cid, contentHash);
        return id;
    }

    function requestAccess(uint256 id) external {
        require(records[id].owner != address(0), "No such record");
        emit AccessRequested(id, msg.sender);
    }

    function grantAccess(uint256 id, address grantee) external onlyOwner(id) {
        accessGranted[id][grantee] = true;
        emit AccessGranted(id, grantee, msg.sender);
    }

    function revokeAccess(uint256 id, address grantee) external onlyOwner(id) {
        accessGranted[id][grantee] = false;
        emit AccessRevoked(id, grantee, msg.sender);
    }

    function canAccess(uint256 id, address user) public view returns (bool) {
        if (records[id].owner == user) return true;
        return accessGranted[id][user];
    }

  //  function getOwner() public view returns (address) {
   // return owner;
//}
}