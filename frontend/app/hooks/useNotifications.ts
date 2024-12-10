import { useState, useEffect } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  capsuleId: string;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Charger les notifications depuis le localStorage au montage
  useEffect(() => {
    const stored = localStorage.getItem('timeCapsuleNotifications');
    if (stored) {
      setNotifications(JSON.parse(stored));
    }
  }, []);

  // Sauvegarder les notifications dans le localStorage
  const saveNotifications = (newNotifications: Notification[]) => {
    localStorage.setItem('timeCapsuleNotifications', JSON.stringify(newNotifications));
    setNotifications(newNotifications);
  };

  // Ajouter une nouvelle notification
  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      read: false,
    };
    saveNotifications([newNotification, ...notifications]);
  };

  // Marquer une notification comme lue
  const markAsRead = (notificationId: string) => {
    const updated = notifications.map(notif =>
      notif.id === notificationId ? { ...notif, read: true } : notif
    );
    saveNotifications(updated);
  };

  // Marquer toutes les notifications comme lues
  const markAllAsRead = () => {
    const updated = notifications.map(notif => ({ ...notif, read: true }));
    saveNotifications(updated);
  };

  // Supprimer une notification
  const removeNotification = (notificationId: string) => {
    const updated = notifications.filter(notif => notif.id !== notificationId);
    saveNotifications(updated);
  };

  // Compter les notifications non lues
  const unreadCount = notifications.filter(notif => !notif.read).length;

  return {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    unreadCount,
  };
}
