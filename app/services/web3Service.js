const Web3 = require('web3');
const TimeCapsuleContract = require('../../build/contracts/TimeCapsule.json');
require('dotenv').config();

let web3;
let contract;

const initializeWeb3 = async () => {
  if (!web3) {
    web3 = new Web3(process.env.GANACHE_URL || 'http://localhost:8545');
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = TimeCapsuleContract.networks[networkId];
    contract = new web3.eth.Contract(
      TimeCapsuleContract.abi,
      deployedNetwork && deployedNetwork.address
    );
  }
};

exports.getAccounts = async () => {
  await initializeWeb3();
  return web3.eth.getAccounts();
};

exports.createCapsule = async (ipfsHash, unlockTimestamp, fromAddress) => {
  await initializeWeb3();
  const tx = await contract.methods
    .createCapsule(ipfsHash, unlockTimestamp)
    .send({ from: fromAddress });
  
  // Extract capsuleId from event logs
  const event = tx.events.CapsuleCreated;
  return event.returnValues.capsuleId;
};

exports.getCapsuleContent = async (capsuleId, fromAddress) => {
  await initializeWeb3();
  return contract.methods
    .getCapsuleContent(capsuleId)
    .call({ from: fromAddress });
};

exports.getUserCapsules = async (fromAddress) => {
  await initializeWeb3();
  return contract.methods
    .getMyCapsules()
    .call({ from: fromAddress });
};

exports.isCapsuleUnlocked = async (capsuleId) => {
  await initializeWeb3();
  return contract.methods
    .isCapsuleUnlocked(capsuleId)
    .call();
};