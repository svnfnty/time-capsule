import React, { useEffect, useState } from 'react';
import { getCapsuleContent, isCapsuleUnlocked } from '../services/web3Service';

const CapsuleDetails = ({ capsuleId, fromAddress }) => {
  const [capsuleContent, setCapsuleContent] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCapsuleDetails = async () => {
      try {
        const content = await getCapsuleContent(capsuleId, fromAddress);
        const unlocked = await isCapsuleUnlocked(capsuleId);
        setCapsuleContent(content);
        setIsUnlocked(unlocked);
      } catch (error) {
        console.error('Error fetching capsule details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCapsuleDetails();
  }, [capsuleId, fromAddress]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Capsule Details</h2>
      <p><strong>Content:</strong> {capsuleContent}</p>
      <p><strong>Status:</strong> {isUnlocked ? 'Unlocked' : 'Locked'}</p>
    </div>
  );
};

export default CapsuleDetails;