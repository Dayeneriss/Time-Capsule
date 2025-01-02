// components/AddNetwork.tsx
'use client';

export const AddNetworkButton = () => {
  const addNetwork = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0x89', // 137 en hexadécimal pour le mainnet Polygon
            chainName: 'Polygon Mainnet',
            nativeCurrency: {
              name: 'MATIC',
              symbol: 'MATIC',
              decimals: 18
            },
            rpcUrls: ['https://polygon-rpc.com', 'https://rpc-mainnet.maticvigil.com'],
            blockExplorerUrls: ['https://polygonscan.com']
          }]
        });
      } catch (error) {
        console.error('Error adding Polygon Mainnet:', error);
      }
    }
  };

  return (
    <button
      onClick={addNetwork}
      className="bg-[#8247E5] text-white px-6 py-2 rounded-md font-medium hover:bg-[#6D31C9] transition-colors"
    >
      Add Polygon Mainnet
    </button>
  );
};