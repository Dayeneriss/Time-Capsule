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

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { address } = useAccount();

  // Read user's capsules
  const { data: userCapsules } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
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

    // Check immediately and set up interval
    checkExpiredCapsules();
    const interval = setInterval(checkExpiredCapsules, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [userCapsules, address]);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 
            ${notification.type === 'success' ? 'bg-green-500' : 
              notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'}`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-white">{notification.title}</h3>
              <p className="text-white text-sm mt-1">{notification.message}</p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
