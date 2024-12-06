'use client'

import { ConnectKitButton } from "connectkit";
import Link from 'next/link';
import { useAccount } from 'wagmi';


// app/components/instructionsComponent/navigation/footer.tsx

export default function Footer() {
  return (
    <footer className="bg-[#1B2028] py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-gray-400 text-sm">
            © 2024 Time Capsule. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-500 transition"
            >
              Twitter
            </a>
            <a 
              href="https://discord.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-500 transition"
            >
              Discord
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-500 transition"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
