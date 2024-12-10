'use client';

import { useState, useMemo } from 'react';
import FloatingParticles from '../components/FloatingParticles';

interface TimeCapsule {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  unlockDate: string;
  creator: string;
}

export default function ExplorePage() {
  const [capsules, setCapsules] = useState<TimeCapsule[]>([
    {
      id: '1',
      title: 'Memories of 2023',
      description: 'A collection of precious moments from this unforgettable year.',
      createdAt: '2023-12-01',
      unlockDate: '2024-12-01',
      creator: '0x1234...5678'
    },
    {
      id: '2',
      title: 'Message to the Future',
      description: 'Thoughts and hopes for the years to come.',
      createdAt: '2023-11-15',
      unlockDate: '2025-01-01',
      creator: '0x8765...4321'
    },
    // Ajoutez plus de capsules ici
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredCapsules = useMemo(() => {
    let filtered = [...capsules];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(capsule =>
        capsule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        capsule.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
      const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
      const oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1));

      filtered = filtered.filter(capsule => {
        const createdDate = new Date(capsule.createdAt);
        switch (dateFilter) {
          case 'last-week':
            return createdDate >= oneWeekAgo;
          case 'last-month':
            return createdDate >= oneMonthAgo;
          case 'last-year':
            return createdDate >= oneYearAgo;
          default:
            return true;
        }
      });
    }

    // Sort by creation date
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    return filtered;
  }, [capsules, searchTerm, dateFilter, sortOrder]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-background via-background/90 to-background/80">
      <FloatingParticles />
      
      <div className="relative z-10 p-8">
        <h1 className="text-center mb-12">
          <span className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 animate-gradient">
            Explore Time Capsules
          </span>
        </h1>

        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label htmlFor="search" className="sr-only">Search capsules</label>
              <input
                type="text"
                id="search"
                placeholder="Search capsules..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 text-white"
              />
            </div>
            <div className="flex gap-4">
              <div>
                <label htmlFor="date-filter" className="sr-only">Filter by date</label>
                <select
                  id="date-filter"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                >
                  <option value="all">All time</option>
                  <option value="last-week">Last week</option>
                  <option value="last-month">Last month</option>
                  <option value="last-year">Last year</option>
                </select>
              </div>
              <button
                aria-label="Sort by date"
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-purple-500 transition-colors text-white"
              >
                Sort {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredCapsules.length === 0 ? (
            <div className="col-span-full text-center text-gray-400">
              No capsules found
            </div>
          ) : (
            filteredCapsules.map((capsule) => (
              <div 
                key={capsule.id}
                className="group relative backdrop-blur-sm bg-white/5 rounded-xl p-6 
                          border border-white/10 hover:border-white/20 
                          transition-all duration-300 hover:scale-[1.02]
                          shadow-lg hover:shadow-xl hover:shadow-purple-500/10"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-500 transition-all duration-300">
                  {capsule.title}
                </h3>
                
                <p className="text-gray-400 mb-4">{capsule.description}</p>
                
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Created</span>
                    <span className="text-white/80">{new Date(capsule.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Unlocks</span>
                    <span className="text-white/80">{new Date(capsule.unlockDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Creator</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                      {capsule.creator}
                    </span>
                  </div>
                </div>

                <button 
                  className="w-full mt-6 px-4 py-2.5 rounded-lg font-semibold
                            bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500
                            hover:from-purple-600 hover:via-pink-600 hover:to-yellow-600
                            text-white shadow-lg shadow-purple-500/20
                            transition-all duration-300 hover:scale-[1.02]
                            backdrop-blur-sm"
                  onClick={() => alert('Viewing details for capsule ' + capsule.id)}
                >
                  View Details
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}