'use client';

import { useEffect, useState } from 'react';
import { useTimeCapsule } from '../hooks/useTimeCapsule';
import { useAccount } from 'wagmi';

interface Notification {
  id: string;
  title: string;
  description: string;
  unlockTimestamp: bigint;
}

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { address: userAddress } = useAccount();
  const { userCapsules, contractAddress } = useTimeCapsule(userAddress);

  useEffect(() => {
    if (!contractAddress || !userCapsules) {
      return;
    }

    const now = BigInt(Math.floor(Date.now() / 1000));
    const unlockedCapsules = userCapsules.filter(
      (capsule) => capsule.unlockTimestamp <= now
    );

    setNotifications(
      unlockedCapsules.map((capsule) => ({
        id: capsule.id,
        title: capsule.title,
        description: capsule.description,
        unlockTimestamp: capsule.unlockTimestamp,
      }))
    );
  }, [userCapsules, contractAddress]);

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-white rounded-lg shadow-lg p-4 max-w-sm"
        >
          <h3 className="font-bold">{notification.title}</h3>
          <p className="text-sm text-gray-600">{notification.description}</p>
        </div>
      ))}
    </div>
  );
}