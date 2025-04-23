const ipfsService = require('../services/ipfsService');
const web3Service = require('../services/web3Service');

exports.createCapsule = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload to IPFS
    const ipfsHash = await ipfsService.uploadToIPFS(req.file.buffer);
    
    // Set unlock date to year 3000 (January 1, 3000 00:00:00 UTC)
    const unlockTimestamp = new Date('3000-01-01T00:00:00Z').getTime() / 1000;
    
    // Create capsule on blockchain
    const accounts = await web3Service.getAccounts();
    const capsuleId = await web3Service.createCapsule(ipfsHash, unlockTimestamp, accounts[0]);
    
    res.status(201).json({ 
      success: true, 
      capsuleId, 
      ipfsHash, 
      unlockTimestamp 
    });
  } catch (error) {
    next(error);
  }
};

exports.getCapsuleContent = async (req, res, next) => {
  try {
    const { capsuleId } = req.params;
    const accounts = await web3Service.getAccounts();
    
    const ipfsHash = await web3Service.getCapsuleContent(capsuleId, accounts[0]);
    const fileContent = await ipfsService.downloadFromIPFS(ipfsHash);
    
    res.set('Content-Type', 'application/octet-stream');
    res.send(fileContent);
  } catch (error) {
    next(error);
  }
};

exports.getUserCapsules = async (req, res, next) => {
  try {
    const accounts = await web3Service.getAccounts();
    const capsules = await web3Service.getUserCapsules(accounts[0]);
    
    res.json({ capsules });
  } catch (error) {
    next(error);
  }
};

exports.checkCapsuleStatus = async (req, res, next) => {
  try {
    const { capsuleId } = req.params;
    const isUnlocked = await web3Service.isCapsuleUnlocked(capsuleId);
    
    res.json({ isUnlocked });
  } catch (error) {
    next(error);
  }
};