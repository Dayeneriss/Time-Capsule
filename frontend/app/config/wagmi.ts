import { createConfig, http } from 'wagmi'
import { polygon } from 'wagmi/chains'
import { injected } from 'wagmi'

// Récupération de la clé Alchemy via une variable d'environnement
const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY

// Configuration pour le mainnet Polygon
const config = createConfig({
  chains: [polygon],
  connectors: [
    injected(),
  ],
  transports: {
    [polygon.id]: http(
      ALCHEMY_API_KEY 
        ? `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
        : 'https://polygon-rpc.com' // Fallback vers un RPC public si la clé n'est pas disponible
    )
  }
})

export default config
