'use client'

import { useState } from 'react';

interface TimeCapsule {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  unlockDate: string;
  creator: string;
}

export default function ExplorePage() {
  // Exemple de données (à remplacer par des données réelles plus tard)
  const [capsules] = useState<TimeCapsule[]>([
    {
      id: '1',
      title: 'Souvenirs de 2023',
      description: 'Une collection de moments précieux de cette année inoubliable.',
      createdAt: '2023-12-01',
      unlockDate: '2024-12-01',
      creator: '0x1234...5678'
    },
    {
      id: '2',
      title: 'Message pour le futur',
      description: 'Des pensées et des espoirs pour les années à venir.',
      createdAt: '2023-11-15',
      unlockDate: '2025-01-01',
      creator: '0x8765...4321'
    },
    // Ajoutez plus de capsules ici
  ]);

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-white mb-6">Explore Capsules</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {capsules.map((capsule) => (
          <div 
            key={capsule.id}
            className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200 border border-gray-700"
          >
            <h3 className="text-xl font-semibold text-white mb-2">{capsule.title}</h3>
            <p className="text-gray-400 mb-4">{capsule.description}</p>
            
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex justify-between">
                <span>Created:</span>
                <span>{new Date(capsule.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Unlocks:</span>
                <span>{new Date(capsule.unlockDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Creator:</span>
                <span className="text-yellow-500">{capsule.creator}</span>
              </div>
            </div>

            <button 
              className="w-full mt-4 px-4 py-2 bg-yellow-500 text-gray-900 rounded-md hover:bg-yellow-400 transition font-semibold"
              onClick={() => alert('Viewing details for capsule ' + capsule.id)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}