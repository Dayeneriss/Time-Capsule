'use client';

import { useState } from 'react';
import { useNotifications } from '../hooks/useNotifications';

export default function NotificationTest() {
  const { addNotification, notifications, markAllAsRead, removeNotification } = useNotifications();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleAddNotification = () => {
    if (!title || !message) return;
    
    addNotification({
      title,
      message,
      capsuleId: `test-${Date.now()}`,
    });

    setTitle('');
    setMessage('');
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Test des Notifications</h2>
      
      {/* Formulaire d'ajout */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Titre</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Titre de la notification"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Contenu de la notification"
          />
        </div>
        <button
          onClick={handleAddNotification}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Ajouter une notification
        </button>
      </div>

      {/* Actions globales */}
      <div className="space-x-4 mb-6">
        <button
          onClick={markAllAsRead}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Marquer tout comme lu
        </button>
      </div>

      {/* Liste des notifications actuelles */}
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-4">Notifications actuelles ({notifications.length})</h3>
        <div className="space-y-4">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 rounded border ${
                notif.read ? 'bg-gray-50' : 'bg-blue-50'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{notif.title}</h4>
                  <p className="text-sm text-gray-600">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(notif.timestamp).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">
                    Status: {notif.read ? 'Lu' : 'Non lu'}
                  </p>
                </div>
                <button
                  onClick={() => removeNotification(notif.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
