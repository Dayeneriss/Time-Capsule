'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useState, useEffect } from 'react';

export default function ConnectButton() {
  const { isConnected, address } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [mounted, setMounted] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-700">
          {`${address.slice(0, 6)}...${address.slice(-4)}`}
        </span>
        <button
          onClick={() => disconnect()}
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          disabled={isConnecting}
        >
          Disconnect
        </button>
      </div>
    );
  }

  const connector = connectors.find((c) => c.name === 'MetaMask');

  const handleConnect = async () => {
    if (!connector) return;
    setIsConnecting(true);
    try {
      await connect({ connector });
    } catch (error) {
      console.error('Failed to connect:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <button
      onClick={handleConnect}
      className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      disabled={isConnecting}
    >
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
}
