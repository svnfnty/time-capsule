const TimeCapsule = artifacts.require("TimeCapsule");

contract("TimeCapsule", (accounts) => {
  let timeCapsule;
  const owner = accounts[0];
  const futureTimestamp = Math.floor(new Date('3000-01-01').getTime() / 1000);

  beforeEach(async () => {
    timeCapsule = await TimeCapsule.new();
  });

  it("should create a new time capsule", async () => {
    const ipfsHash = "QmSomeIPFSHash";
    const tx = await timeCapsule.createCapsule(ipfsHash, futureTimestamp, { from: owner });
    
    assert.equal(tx.logs.length, 1, "Should emit one event");
    assert.equal(tx.logs[0].event, "CapsuleCreated", "Should be the CapsuleCreated event");
  });

  it("should not allow viewing content before unlock time", async () => {
    const ipfsHash = "QmAnotherIPFSHash";
    const tx = await timeCapsule.createCapsule(ipfsHash, futureTimestamp, { from: owner });
    const capsuleId = tx.logs[0].args.capsuleId;
    
    try {
      await timeCapsule.getCapsuleContent(capsuleId, { from: accounts[1] });
      assert.fail("Should have thrown an error");
    } catch (error) {
      assert.include(error.message, "Capsule is still locked", "Should reject viewing locked capsule");
    }
  });

  it("should allow owner to view content before unlock time", async () => {
    const ipfsHash = "QmOwnerViewableHash";
    const tx = await timeCapsule.createCapsule(ipfsHash, futureTimestamp, { from: owner });
    const capsuleId = tx.logs[0].args.capsuleId;
    
    const content = await timeCapsule.getCapsuleContent(capsuleId, { from: owner });
    assert.equal(content, ipfsHash, "Should return the IPFS hash to owner");
  });

  it("should return user's capsules", async () => {
    const ipfsHash1 = "QmFirstHash";
    const ipfsHash2 = "QmSecondHash";
    
    await timeCapsule.createCapsule(ipfsHash1, futureTimestamp, { from: owner });
    await timeCapsule.createCapsule(ipfsHash2, futureTimestamp, { from: owner });
    
    const capsules = await timeCapsule.getMyCapsules({ from: owner });
    assert.equal(capsules.length, 2, "Should return 2 capsules");
  });
});