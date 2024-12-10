'use client';

import { ConnectKitButton } from 'connectkit';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import FloatingParticles from '../components/FloatingParticles';

export default function PricingPage() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pt-20">
      {/* Background gradients */}
      <div className="fixed inset-0 bg-nebula opacity-80" />
      <div className="fixed inset-0 bg-stardust opacity-60" />
      <div className="fixed inset-0 bg-aurora opacity-40" />
      
      <FloatingParticles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-center mb-12 animate-float bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
          Time Capsule Pricing
        </h1>
        
        {/* Basic Models */}
        <div className="bg-card/20 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-primary/20 shadow-cosmic">
          <h2 className="text-2xl font-semibold text-text-light mb-6 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">Basic Models</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Small Capsule */}
            <div className="bg-background/30 rounded-xl p-6 backdrop-blur-sm hover:backdrop-blur-lg transition-all transform hover:-translate-y-2 border border-primary/10 hover:border-primary/30">
              <h3 className="text-xl text-primary mb-3">Small Capsule</h3>
              <div className="flex justify-between items-baseline mb-4">
                <p className="text-3xl font-bold text-text-light">2 USDC</p>
                <p className="text-text-muted">Up to 10 MB, 5 years</p>
              </div>
              <ul className="text-text-light space-y-2 mt-4">
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span>
                  Secure storage for 5 years
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span>
                  Perfect for personal memories
                </li>
              </ul>
            </div>

            {/* Medium Capsule */}
            <div className="bg-background/30 rounded-xl p-6 backdrop-blur-sm hover:backdrop-blur-lg transition-all transform hover:-translate-y-2 border border-primary/10 hover:border-primary/30">
              <h3 className="text-xl text-primary mb-3">Medium Capsule</h3>
              <div className="flex justify-between items-baseline mb-4">
                <p className="text-3xl font-bold text-text-light">6 USDC</p>
                <p className="text-text-muted">Up to 50 MB, 10 years</p>
              </div>
              <ul className="text-text-light space-y-2 mt-4">
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span>
                  Secure storage for 10 years
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span>
                  Ideal for photo collections
                </li>
              </ul>
            </div>

            {/* Large Capsule */}
            <div className="bg-background/30 rounded-xl p-6 backdrop-blur-sm hover:backdrop-blur-lg transition-all transform hover:-translate-y-2 border border-primary/10 hover:border-primary/30">
              <h3 className="text-xl text-primary mb-3">Large Capsule</h3>
              <div className="flex justify-between items-baseline mb-4">
                <p className="text-3xl font-bold text-text-light">11 USDC</p>
                <p className="text-text-muted">Up to 100 MB, 20 years</p>
              </div>
              <ul className="text-text-light space-y-2 mt-4">
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span>
                  Secure storage for 20 years
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span>
                  Perfect for family archives
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Premium Options */}
        <div className="bg-card/20 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-primary/20 shadow-cosmic">
          <h2 className="text-2xl font-semibold text-text-light mb-6 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">Premium Options</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Premium Capsule */}
            <div className="bg-background/30 rounded-xl p-6 backdrop-blur-sm hover:backdrop-blur-lg transition-all transform hover:-translate-y-2 border border-primary/10 hover:border-primary/30">
              <h3 className="text-xl text-primary mb-3">Premium Capsule</h3>
              <div className="flex justify-between items-baseline mb-4">
                <p className="text-3xl font-bold text-text-light">25 USDC</p>
                <p className="text-text-muted">Up to 100 MB, 50 years</p>
              </div>
              <ul className="text-text-light space-y-2 mt-4">
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span>
                  Secure storage for 50 years
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span>
                  Access to premium features
                </li>
              </ul>
            </div>

            {/* Eternal Capsule */}
            <div className="bg-background/30 rounded-xl p-6 backdrop-blur-sm hover:backdrop-blur-lg transition-all transform hover:-translate-y-2 border border-primary/10 hover:border-primary/30">
              <h3 className="text-xl text-primary mb-3">Eternal Capsule</h3>
              <div className="flex justify-between items-baseline mb-4">
                <p className="text-3xl font-bold text-text-light">65 USDC</p>
                <p className="text-text-muted">Up to 100 MB, indefinite</p>
              </div>
              <ul className="text-text-light space-y-2 mt-4">
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span>
                  Permanent storage
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">✓</span>
                  All premium features included
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Additional Services */}
        <div className="bg-card/20 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-primary/20 shadow-cosmic">
          <h2 className="text-2xl font-semibold text-text-light mb-6 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">Additional Services</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center text-text-light">
              <span>Additional Storage</span>
              <span className="font-semibold">0.5 USDC / 10 MB</span>
            </div>
            <div className="flex justify-between items-center text-text-light">
              <span>Custom Access Settings</span>
              <span className="font-semibold">1.5 USDC</span>
            </div>
          </div>
        </div>

        {/* Transaction Fees */}
        <div className="bg-card/20 backdrop-blur-lg rounded-2xl p-8 mb-12 border border-primary/20 shadow-cosmic">
          <h2 className="text-2xl font-semibold text-text-light mb-6 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">Transaction Fees</h2>
          
          <div className="space-y-6">
            <div className="border-b border-primary/20 pb-4">
              <div className="flex justify-between items-center text-text-light mb-2">
                <span>Fixed fee per transaction</span>
                <span className="font-semibold">0.50 USDC</span>
              </div>
              <p className="text-sm text-text-muted">Applied to each capsule creation</p>
            </div>
            
            <div className="border-b border-primary/20 pb-4">
              <div className="flex justify-between items-center text-text-light mb-2">
                <span>Transaction commission</span>
                <span className="font-semibold">2%</span>
              </div>
              <p className="text-sm text-text-muted">Percentage applied to total amount</p>
            </div>

            {/* Calculation Example */}
            <div className="bg-background/30 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-lg text-primary mb-3">Calculation Example</h3>
              <p className="text-text-light mb-2">For a Small Capsule at 2 USDC:</p>
              <ul className="space-y-2 text-text-muted">
                <li>Base price: 2.00 USDC</li>
                <li>Fixed fee: +0.50 USDC</li>
                <li>Commission (2%): +0.04 USDC</li>
                <li className="text-text-light font-semibold pt-2 border-t border-primary/20">
                  Total: 2.54 USDC
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          {isConnected ? (
            <Link 
              href="/create" 
              className="inline-block bg-magic hover:bg-magic-shine text-text-light px-8 py-4 rounded-lg font-medium transition-all transform hover:scale-105 shadow-cosmic"
            >
              Create a Capsule
            </Link>
          ) : (
            <div className="space-y-4">
              <p className="text-text-muted mb-4">Connect your wallet to create a capsule</p>
              <ConnectKitButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
