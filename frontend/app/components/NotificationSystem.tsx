'use client';

import { useEffect, useState } from 'react';
import { useTimeCapsule } from '../hooks/useTimeCapsule';
import { TimeCapsule } from '../types/capsule';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  timestamp: number;
}

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { userCapsules, isReady } = useTimeCapsule();

  if (!isReady) {
    console.warn('Contract not ready');
    return null;
  }

  useEffect(() => {
    // Check for expired capsules
    const checkExpiredCapsules = () => {
      const currentTime = Math.floor(Date.now() / 1000);

      userCapsules.forEach((capsule: TimeCapsule) => {
        if (
          capsule.unlockTime <= currentTime &&
          !localStorage.getItem(`notified-${capsule.id}`)
        ) {
          const notification: Notification = {
            id: `capsule-${capsule.id}`,
            title: 'Capsule Ready!',
            message: `Your time capsule is now ready to be opened!`,
            type: 'info',
            timestamp: Date.now(),
          };

          setNotifications((prev) => [...prev, notification]);
          localStorage.setItem(`notified-${capsule.id}`, 'true');
        }
      });
    };

    // Check immediately
    checkExpiredCapsules();

    // Set up interval to check periodically
    const interval = setInterval(checkExpiredCapsules, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [userCapsules]);

  // Remove a notification
  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`mb-2 p-4 rounded-lg shadow-lg ${
            notification.type === 'info'
              ? 'bg-blue-500'
              : notification.type === 'success'
              ? 'bg-green-500'
              : 'bg-yellow-500'
          } text-white`}
        >
          <h4 className="font-bold">{notification.title}</h4>
          <p>{notification.message}</p>
          <button
            onClick={() => removeNotification(notification.id)}
            className="mt-2 text-sm underline"
          >
            Dismiss
          </button>
        </div>
      ))}
    </div>
  );
}
