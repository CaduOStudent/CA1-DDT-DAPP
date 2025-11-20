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

