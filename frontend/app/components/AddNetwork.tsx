// components/AddNetwork.tsx
'use client';

export const AddNetworkButton = () => {
  const addNetwork = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0x13881', // 80001 en hexadécimal
            chainName: 'Polygon Amoy',
            nativeCurrency: {
              name: 'MATIC',
              symbol: 'MATIC',
              decimals: 18
            },
            rpcUrls: ['https://rpc-amoy.polygon.technology'],
            blockExplorerUrls: ['https://www.oklink.com/amoy']
          }]
        });
      } catch (error) {
        console.error('Error adding network:', error);
      }
    }
  };

  return (
    <button
      onClick={addNetwork}
      className="bg-[#FFC107] text-[#1E2530] px-6 py-2 rounded-md font-medium hover:bg-[#FFD54F] transition-colors"
    >
      Add Polygon Amoy Network
    </button>
  );
};