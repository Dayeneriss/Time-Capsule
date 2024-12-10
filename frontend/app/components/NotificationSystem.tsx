'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useReadContract } from 'wagmi';
import { timeCapsuleABI } from '@/contracts/TimeCapsuleABI';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  timestamp: number;
}

// Validate contract address
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
if (!CONTRACT_ADDRESS || !CONTRACT_ADDRESS.startsWith('0x')) {
  throw new Error('Invalid or missing NEXT_PUBLIC_CONTRACT_ADDRESS');
}

// Ensure the contract address is properly typed
const TYPED_CONTRACT_ADDRESS = CONTRACT_ADDRESS as `0x${string}`;

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { address } = useAccount();

  // Read user's capsules
  const { data: userCapsules } = useReadContract({
    address: TYPED_CONTRACT_ADDRESS,
    abi: timeCapsuleABI,
    functionName: 'getCapsulesByOwner',
    args: [address],
    enabled: !!address,
  });

  useEffect(() => {
    if (!userCapsules || !address) return;

    // Check for expired capsules
    const checkExpiredCapsules = () => {
      const currentTime = Math.floor(Date.now() / 1000);
      
      userCapsules.forEach((capsule: any) => {
        if (
          capsule.unlockTime <= currentTime && 
          !localStorage.getItem(`notified-${capsule.id}`)
        ) {
          // Add notification
          const notification: Notification = {
            id: `capsule-${capsule.id}`,
            title: 'Capsule Temporelle Déverrouillée!',
            message: `Votre capsule "${capsule.title}" est maintenant disponible!`,
            type: 'success',
            timestamp: currentTime,
          };

          setNotifications(prev => [...prev, notification]);
          
          // Mark as notified
          localStorage.setItem(`notified-${capsule.id}`, 'true');
        }
      });
    };

    // Initial check
    checkExpiredCapsules();

    // Set up interval for periodic checks
    const interval = setInterval(checkExpiredCapsules, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [userCapsules, address]);

  // Remove a notification
  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 space-y-2">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`p-4 rounded-lg shadow-lg max-w-sm ${
            notification.type === 'success' ? 'bg-green-100' :
            notification.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold">{notification.title}</h3>
              <p className="text-sm">{notification.message}</p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
