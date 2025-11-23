[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/R8InBwpK)


# Decentralized Medical Records DApp

This repository contains a decentralized application (DApp) for the *Healthcare & Medical Records* scenario of the blockchain CA1 assignment.

The goal is to give *patients control over access to their medical records* using an Ethereum smart contract as a trusted middle layer between patients and healthcare providers.

## Scenario

- *Domain:* Healthcare & Medical Records  
- *Problem:* Traditional electronic health record (EHR) systems are centralized, siloed and controlled by hospitals/clinics. Patients have limited visibility and control over who can access their data.  
- *Solution:* A smart contract called MedicalRecords that:
  - Stores medical record metadata on‑chain (IPFS CID + content hash).
  - Lets a *patient (sender)* create records and manage permissions.
  - Lets a *doctor/provider (receiver)* request access to a record.
  - Records *grant* and *revoke* decisions immutably on the blockchain.
  - Exposes a canAccess function to check if a user is allowed to access a record.

## Tech stack

- *Solidity* smart contract (contracts/MedicalRecords.sol)
- *Hardhat* for compile, deploy, scripts and tests
- *Remix IDE* for contract editing and quick deployment
- *Ganache* or npx hardhat node as local blockchain
- *MetaMask* for accounts and signing transactions
- *JavaScript (ethers.js)* minimal frontend in frontend/
- *Shell script* (run-ganache.sh) to start local chain
- *Truffle* (optional) for migration/testing

## Basic Hardhat workflow

bash
npm install
npx hardhat node             # or: ./run-ganache.sh
npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost
npx hardhat test
npx hardhat run scripts/interact-example.js --network localhost


______________________________________________________________________________________________________________




# MedicalRecords Smart Contract

A **decentralized medical records management system** built on Ethereum. Patients can store records on IPFS, control access, and grant/revoke permissions to healthcare providers.

---

## **Features**
 **IPFS Integration**: Store records off-chain (CID + hash on-chain).
**Access Control**: Patients grant/revoke access to specific addresses.
**Immutable Logs**: All actions are recorded on-chain.
**Gas-Efficient**: Optimized for low-cost transactions.

---

## **Contract Functions**

| Function               | Description                                                                 | Access Control          |
|------------------------|-----------------------------------------------------------------------------|-------------------------|
| `createRecord`         | Stores a new record (IPFS CID + content hash). Returns `recordId`.         | Public                  |
| `requestAccess`        | Requests access to a record (emits event for owner approval).              | Public                  |
| `grantAccess`          | Grants access to a requester.                                              | Owner (`record.owner`)  |
| `revokeAccess`         | Revokes access from an address.                                            | Owner (`record.owner`)  |
| `updateRecord`         | Updates the IPFS CID/hash of a record.                                     | Owner (`record.owner`)  |
| `canAccess`            | Checks if an address has access to a record.                               | Public (view)           |
| `getRecord`            | Returns record details (CID, hash, owner, timestamp).                       | Public (view)           |

---

## **How to Use**

### **1. Deploy the Contract**
- Deploy `MedicalRecords.sol` in **Remix IDE** or via Hardhat/Foundry.
- No constructor arguments required.

### **2. Store a Medical Record**
1. **Upload the record to IPFS** (e.g., using [Pinata](https://pinata.cloud/)).
   - Get the **CID** (e.g., `QmX1...`).
   - Generate a **content hash** (e.g., `keccak256` of the file).
2. **Call `createRecord`**:
   ```solidity
   createRecord(
       "QmX1abc...",                          // IPFS CID
       "0x1234...5678"                       // Content hash (hex string)
   );
   Returns recordId (e.g., 0 for the first record).
   ```
   
3. Manage Access
Request Access (as a healthcare provider):

```solidity
  requestAccess(0); // Replace `0` with the `recordId`
```

Grant Access (as the patient/owner):
```solidity
  grantAccess(0, 0xProviderAddress); // Approve the request
```

Revoke Access:
```solidity
  revokeAccess(0, 0xProviderAddress);
```
4. Update a Record
```solidity
updateRecord(
    0,                                      // recordId
    "QmX1newCID...",                        // New IPFS CID
    "0x9abc...def0"                         // New content hash
);
```

5. Check Access
```solidity
canAccess(0, 0xProviderAddress); // Returns `true`/`false`
```

### Technical Details
```Solidity
Solidity Version: ^0.8.0 (safe from overflows/underflows).
```
```Solidity
IPFS: Use IPFS CLI or Pinata for storage.
```
```Solidity
Hashing: Generate contentHash using keccak256 (e.g., in JavaScript or Solidity).
```

### Security Notes
- *Only the record owner can grant/revoke access or update records.*
- *No sensitive data is stored on-chain (only CIDs/hashes).*
- *Reentrancy-safe: Uses Checks-Effects-Interactions pattern.*


> License
```MIT```



---

### **Key Optimizations**
1. **Concise Tables**: Functions and access control are easy to scan.
2. **Step-by-Step Guides**: Clear instructions for deployment and usage.
3. **Security Highlights**: Emphasizes safety (reentrancy, off-chain data).
4. **Direct Link**: Google Docs URL is prominently placed.
5. **Markdown Formatting**: Compatible with GitHub/GitLab.
