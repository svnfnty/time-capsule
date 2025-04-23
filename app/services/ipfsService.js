const { create } = require('ipfs-http-client');
require('dotenv').config();

let ipfs;

const initializeIPFS = () => {
  if (!ipfs) {
    ipfs = create({
      host: process.env.IPFS_HOST || 'localhost',
      port: process.env.IPFS_PORT || 5001,
      protocol: process.env.IPFS_PROTOCOL || 'http'
    });
  }
};

exports.uploadToIPFS = async (fileBuffer) => {
  initializeIPFS();
  const { cid } = await ipfs.add(fileBuffer);
  return cid.toString();
};

exports.downloadFromIPFS = async (ipfsHash) => {
  initializeIPFS();
  const chunks = [];
  for await (const chunk of ipfs.cat(ipfsHash)) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
};