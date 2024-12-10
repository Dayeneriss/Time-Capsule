"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ConnectButton from './ConnectButton';
import { NotificationBell } from './NotificationBell';
import { useAccount } from 'wagmi';

export default function Navbar() {
  const pathname = usePathname();
  const { isConnected } = useAccount();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/40 border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3 group">
            <span className="text-2xl animate-pulse">⌛</span>
            <span className="text-xl font-bold bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
              Time Capsule
            </span>
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link 
              href="/create" 
              className={`font-medium transition-all hover:scale-105 ${
                isActive('/create')
                ? 'text-primary'
                : 'text-text-light hover:text-primary'
              }`}
            >
              Create Capsule
            </Link>
            <Link 
              href="/explore" 
              className={`font-medium transition-all hover:scale-105 ${
                isActive('/explore')
                ? 'text-primary'
                : 'text-text-light hover:text-primary'
              }`}
            >
              Explore
            </Link>
            <Link 
              href="/pricing" 
              className={`font-medium transition-all hover:scale-105 ${
                isActive('/pricing')
                ? 'text-primary'
                : 'text-text-light hover:text-primary'
              }`}
            >
              Pricing
            </Link>
            {isConnected && <NotificationBell />}
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
