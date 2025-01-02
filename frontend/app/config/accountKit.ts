import { createConfig, http } from 'wagmi';
import { polygon } from 'wagmi/chains';

// Configuration pour le mainnet Polygon
export const config = createConfig({
  chains: [polygon],
  transports: {
    [polygon.id]: http(),
  },
});
