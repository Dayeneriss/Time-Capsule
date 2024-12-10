'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useState, useEffect } from 'react';

export default function WalletConnect() {
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Pendant le SSR ou avant le montage, afficher un placeholder
  if (!mounted) {
    return (
      <div className="flex items-center space-x-4">
        <button
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          disabled
        >
          Loading...
        </button>
      </div>
    );
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-700">
          {`${address.slice(0, 6)}...${address.slice(-4)}`}
        </span>
        <button
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          onClick={() => disconnect()}
        >
          Disconnect
        </button>
      </div>
    );
  }

  const connector = connectors.find((c) => c.name === 'MetaMask');

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => connector && connect({ connector })}
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Connect Wallet
      </button>
    </div>
  );
}
