// app/layout.tsx
'use client';

import './globals.css';
import { WagmiProvider, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Chain } from "viem";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotificationSystem from './components/NotificationSystem';

const polygonAmoy: Chain = {
  id: 80002,
  name: 'Polygon Amoy',
  network: 'Polygon Amoy Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'POL',
    symbol: 'POL',
  },
  rpcUrls: {
    default: { 
      http: [`https://polygon-amoy.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`]
    },
    public: {
      http: ['https://rpc-amoy.polygon.technology']
    }
  },
  blockExplorers: {
    default: {
      name: 'OKLink',
      url: 'https://www.oklink.com/amoy'
    }
  },
  testnet: true
};

const config = createConfig(
  getDefaultConfig({
    appName: "Time Capsule",
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    chains: [polygonAmoy],
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  }),
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-[#1E2530] min-h-screen flex flex-col">
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <ConnectKitProvider>
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <NotificationSystem />
              <Footer />
            </ConnectKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
