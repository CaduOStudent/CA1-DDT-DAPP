const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MedicalRecords", function () {
  let med, patient, provider, other;

  beforeEach(async function () {
    [patient, provider, other] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("MedicalRecords");
    med = await Factory.deploy();
    await med.deployed();
  });

  it("creates a record with correct owner and cid", async function () {
    const cid = "QmTestCid";
    const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("data"));
    await med.connect(patient).createRecord(cid, hash);
    const rec = await med.records(0);
    expect(rec.owner).to.equal(patient.address);
    expect(rec.cid).to.equal(cid);
  });

  it("grants and revokes access correctly", async function () {
    const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("data"));
    await med.connect(patient).createRecord("Qm", hash);
    expect(await med.canAccess(0, provider.address)).to.equal(false);

    await med.connect(patient).grantAccess(0, provider.address);
    expect(await med.canAccess(0, provider.address)).to.equal(true);

    await med.connect(patient).revokeAccess(0, provider.address);
    expect(await med.canAccess(0, provider.address)).to.equal(false);
  });

  it("emits AccessRequested when provider requests", async function () {
    const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("data"));
    await med.connect(patient).createRecord("Qm", hash);
    await expect(med.connect(provider).requestAccess(0))
      .to.emit(med, "AccessRequested")
      .withArgs(0, provider.address);
  });
});