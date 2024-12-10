'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import FloatingParticles from './components/FloatingParticles';
import ConnectButton from './components/ConnectButton';
import NotificationTest from './components/NotificationTest';

export default function Home() {
  const { isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Couches de dégradés pour l'arrière-plan */}
      <div className="fixed inset-0 bg-nebula opacity-80" />
      <div className="fixed inset-0 bg-stardust opacity-60" />
      <div className="fixed inset-0 bg-aurora opacity-40" />
      
      <FloatingParticles />

      {/* Hero Section avec effets cosmiques */}
      <section className="relative text-center py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-40" />
        <div className="absolute inset-0 bg-ethereal opacity-30" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <h1 className="text-6xl font-bold mb-6 text-text-light animate-float bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
            Capture the magic of your <span className="bg-magic-shine bg-clip-text text-transparent animate-shimmer">memories</span>
          </h1>
          <p className="text-text-muted max-w-12xl mx-auto mb-14 text-lg">
            Create digital time capsules that will stand the test of time, preserving your memories <span className="bg-magic-shine bg-clip-text text-transparent animate-shimmer">forever.</span>
          </p>
          <div className="flex justify-center gap-6">
            <Link
              href="/create"
              className="bg-magic hover:bg-magic-shine text-text-light px-8 py-4 rounded-lg font-medium transition-all transform hover:scale-105 shadow-cosmic"
            >
              Create a Capsule
            </Link>
            <Link
              href="/explore"
              className="bg-gradient-to-r from-background via-card to-background text-text-light px-8 py-4 rounded-lg font-medium hover:from-card hover:via-background hover:to-card transition-all transform hover:scale-105 border border-primary/30 shadow-glow"
            >
              Explore Capsules
            </Link>
            <Link
              href="/pricing"
              className="bg-gradient-to-r from-background via-card to-background text-text-light px-8 py-4 rounded-lg font-medium hover:from-card hover:via-background hover:to-card transition-all transform hover:scale-105 border border-primary/30 shadow-glow"
            >
              Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section avec design cosmique */}
      <section className="relative py-24 px-4">
        <div className="absolute inset-0 bg-cosmic-dark" />
        <div className="absolute inset-0 bg-stardust opacity-40" />
        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="group p-8 rounded-2xl bg-gradient-to-br from-card/80 via-card/40 to-transparent backdrop-blur-sm hover:from-card hover:via-card/60 hover:to-card/20 transition-all transform hover:-translate-y-2 shadow-glow">
            <div className="text-5xl mb-6 animate-float">🌌</div>
            <h3 className="text-xl font-bold mb-4 text-text-light group-hover:bg-magic-shine group-hover:bg-clip-text group-hover:text-transparent transition-colors">
              Time Travel
            </h3>
            <p className="text-text-muted">
              Schedule the opening of your memories in the future, creating a bridge between the present and eternity.
            </p>
          </div>
          <div className="group p-8 rounded-2xl bg-gradient-to-br from-card/80 via-card/40 to-transparent backdrop-blur-sm hover:from-card hover:via-card/60 hover:to-card/20 transition-all transform hover:-translate-y-2 shadow-gold">
            <div className="text-5xl mb-6 animate-float">⚡</div>
            <h3 className="text-xl font-bold mb-4 text-text-light group-hover:bg-magic-shine group-hover:bg-clip-text group-hover:text-transparent transition-colors">
              Eternal Preservation
            </h3>
            <p className="text-text-muted">
              Store your photos, videos, and messages in a timeless digital vault.
            </p>
          </div>
          <div className="group p-8 rounded-2xl bg-gradient-to-br from-card/80 via-card/40 to-transparent backdrop-blur-sm hover:from-card hover:via-card/60 hover:to-card/20 transition-all transform hover:-translate-y-2 shadow-cosmic">
            <div className="text-5xl mb-6 animate-float">🔮</div>
            <h3 className="text-xl font-bold mb-4 text-text-light group-hover:bg-magic-shine group-hover:bg-clip-text group-hover:text-transparent transition-colors">
              Blockchain Security
            </h3>
            <p className="text-text-muted">
              Use the power of blockchain to ensure the immortality of your memories.
            </p>
          </div>
        </div>
      </section>

      {/* Section de test des notifications - À RETIRER APRÈS LES TESTS */}
      {mounted && isConnected && (
        <section className="relative py-12 px-4">
          <div className="relative z-10 max-w-4xl mx-auto">
            <NotificationTest />
          </div>
        </section>
      )}

      {/* CTA Section avec effets de profondeur */}
      <section className="relative text-center py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-ethereal opacity-30" />
        <div className="absolute inset-0 bg-aurora opacity-20" />
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
            Ready to Create Your Eternal Legacy?
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto mb-8">
            Start your journey through time and create memories that will transcend the ages.
          </p>
          {mounted && (
            <div className="flex justify-center items-center gap-4">
              {!isConnected ? (
                <>
                  <p className="text-text-muted">Connect your wallet to start:</p>
                  <ConnectButton />
                </>
              ) : (
                <Link
                  href="/create"
                  className="inline-block bg-magic hover:bg-magic-shine text-text-light px-10 py-4 rounded-lg font-medium transition-all transform hover:scale-105 shadow-cosmic animate-pulse-slow"
                >
                  Start the Adventure
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}