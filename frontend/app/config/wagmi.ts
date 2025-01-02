import { createConfig, http } from 'wagmi'
import { polygon } from 'wagmi/chains'
import { injected } from 'wagmi'

// Configuration pour le mainnet Polygon
const config = createConfig({
  chains: [polygon],
  connectors: [
    injected(),
  ],
  transports: {
    [polygon.id]: http('https://polygon-rpc.com') // Utiliser le RPC public par défaut
  }
})

export default config
