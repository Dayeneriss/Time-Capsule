"use client";

import Link from 'next/link';
import { ConnectKitButton } from 'connectkit';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-6 bg-card shadow-lg">
      <Link href="/" className="flex items-center space-x-2">
        <span className="text-2xl">⌛</span>
        <span className="text-xl font-bold text-white">Time Capsule</span>
      </Link>
      <div className="flex items-center space-x-6">
        <Link 
          href="/create" 
          className="text-white hover:text-primary transition-colors font-medium"
        >
          Create Capsule
        </Link>
        <Link 
          href="/explore" 
          className="text-white hover:text-primary transition-colors font-medium"
        >
          Explore
        </Link>
        <Link 
          href="/pricing" 
          className="text-white hover:text-primary transition-colors font-medium"
        >
          Pricing
        </Link>
        <ConnectKitButton />
      </div>
    </nav>
  );
}
