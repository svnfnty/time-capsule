import React, { useEffect, useState } from 'react';
import { getUserCapsules } from '../services/web3Service';

const CapsuleList = ({ fromAddress }) => {
  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCapsules = async () => {
      try {
        const userCapsules = await getUserCapsules(fromAddress);
        setCapsules(userCapsules);
      } catch (error) {
        console.error("Error fetching capsules:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCapsules();
  }, [fromAddress]);

  if (loading) {
    return <div>Loading capsules...</div>;
  }

  return (
    <div>
      <h2>Your Capsules</h2>
      <ul>
        {capsules.map(capsule => (
          <li key={capsule.id}>
            Capsule ID: {capsule.id} - Content: {capsule.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CapsuleList;