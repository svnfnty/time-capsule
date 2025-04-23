import React, { useState } from 'react';
import web3Service from '../services/web3Service';

const CapsuleForm = () => {
  const [ipfsHash, setIpfsHash] = useState('');
  const [unlockTimestamp, setUnlockTimestamp] = useState('');
  const [fromAddress, setFromAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const capsuleId = await web3Service.createCapsule(ipfsHash, unlockTimestamp, fromAddress);
      setMessage(`Capsule created successfully with ID: ${capsuleId}`);
    } catch (error) {
      setMessage(`Error creating capsule: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Create a New Capsule</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>IPFS Hash:</label>
          <input
            type="text"
            value={ipfsHash}
            onChange={(e) => setIpfsHash(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Unlock Timestamp:</label>
          <input
            type="number"
            value={unlockTimestamp}
            onChange={(e) => setUnlockTimestamp(e.target.value)}
            required
          />
        </div>
        <div>
          <label>From Address:</label>
          <input
            type="text"
            value={fromAddress}
            onChange={(e) => setFromAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Capsule</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CapsuleForm;