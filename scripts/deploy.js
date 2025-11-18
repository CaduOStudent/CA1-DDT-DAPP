const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const MedicalRecords = await hre.ethers.getContractFactory("MedicalRecords");
  const med = await MedicalRecords.deploy();
  await med.deployed();

  console.log("MedicalRecords deployed at:", med.address);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});