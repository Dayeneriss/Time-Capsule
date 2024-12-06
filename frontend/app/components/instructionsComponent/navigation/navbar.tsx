'use client'

import { ConnectKitButton } from "connectkit";
import Link from 'next/link';
import { useAccount } from 'wagmi';

export default function Navbar() {
  const { isConnected } = useAccount();

  return (
    <nav className="p-4 flex justify-between items-center bg-[#1f2937]">
      <Link href="/" className="flex items-center">
        <span className="text-yellow-500 text-xl font-bold"> Time Capsule</span>
      </Link>

      <div className="flex items-center gap-6">
        <Link href="/create" className="text-gray-300 hover:text-yellow-500 transition">
          Create Capsule
        </Link>
        <Link href="/explore" className="text-gray-300 hover:text-yellow-500 transition">
          Explore
        </Link>
        <Link href="/pricing" className="text-gray-300 hover:text-yellow-500 transition">
          Pricing
        </Link>
        
        {/* Bouton de connexion du wallet personnalisé */}
        <ConnectKitButton.Custom>
          {({ isConnecting, show }) => {
            return (
              <button
                onClick={show}
                className={`px-4 py-2 rounded-md font-semibold transition-all duration-200 
                  ${isConnected 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'bg-yellow-500 hover:bg-yellow-400 text-gray-900'
                  }
                  ${isConnecting ? 'opacity-50 cursor-wait' : ''}
                `}
              >
                {isConnecting 
                  ? 'Connecting...' 
                  : isConnected 
                    ? 'Wallet Connected' 
                    : 'Connect Wallet'
                }
              </button>
            );
          }}
        </ConnectKitButton.Custom>
      </div>
    </nav>
  );
}