const hre = require("hardhat");

async function main() {
  const [patient, provider] = await hre.ethers.getSigners();
  const MedicalRecords = await hre.ethers.getContractFactory("MedicalRecords");
  const med = await MedicalRecords.deploy();
  await med.deployed();
  console.log("Deployed at:", med.address);

  const sampleCid = "QmDemoCid123";
  const sampleHash = hre.ethers.utils.keccak256(hre.ethers.utils.toUtf8Bytes("demo-record-1"));
  const tx1 = await med.connect(patient).createRecord(sampleCid, sampleHash);
  await tx1.wait();
  console.log("createRecord tx hash:", tx1.hash);

  const tx2 = await med.connect(provider).requestAccess(0);
  await tx2.wait();
  console.log("requestAccess tx hash:", tx2.hash);

  const tx3 = await med.connect(patient).grantAccess(0, provider.address);
  await tx3.wait();
  console.log("grantAccess tx hash:", tx3.hash);

  const allowed = await med.canAccess(0, provider.address);
  console.log("provider canAccess:", allowed);
}

main().catch(e => { console.error(e); process.exit(1); });