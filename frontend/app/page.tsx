'use client';

import Link from 'next/link';
import { ConnectKitButton } from 'connectkit';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1E2530]">
      {/* Hero Section */}
      <section className="text-center py-32 px-4 max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-6 text-white">
          Preserve Your <span className="text-primary">Memories</span> Forever
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-lg">
          Create digital time capsules that capture your most precious moments, to be opened at a future date of your choosing.
        </p>
        <div className="flex justify-center gap-6">
          <Link
            href="/create"
            className="bg-primary text-gray-900 px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
          >
            Create Time Capsule
          </Link>
          <Link
            href="/explore"
            className="bg-card text-white px-8 py-3 rounded-lg font-medium hover:bg-opacity-80 transition-colors border border-primary"
          >
            Explore Capsules
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-card">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center p-6">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-3 text-white">Time Travel</h3>
            <p className="text-gray-400">
              Set a future date to unlock your memories, creating a bridge between present and future.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold mb-3 text-white">Digital Preservation</h3>
            <p className="text-gray-400">
              Securely store photos, videos, messages, and documents in a digital vault.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">⛓️</div>
            <h3 className="text-xl font-bold mb-3 text-white">Blockchain Security</h3>
            <p className="text-gray-400">
              Leverage blockchain technology to ensure the integrity and immutability of your memories.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-24 px-4">
        <h2 className="text-3xl font-bold mb-6 text-white">Ready to Capture Your Legacy?</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          Start your time capsule journey today and create memories that transcend time.
        </p>
        <Link
          href="/create"
          className="inline-block bg-primary text-gray-900 px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
}