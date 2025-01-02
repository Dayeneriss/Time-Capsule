import { createConfig, http } from 'wagmi'
import { polygon } from 'wagmi/chains'
import { injected } from 'wagmi'

// Récupération de la clé Alchemy via une variable d'environnement
const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY

// Configuration pour le mainnet Polygon
const config = createConfig({
  // Utilisation du mainnet Polygon
  chains: [polygon],
  connectors: [
    injected(),
  ],
  // Configuration du transport RPC pour Polygon mainnet
  transports: {
    [polygon.id]: http(
      ALCHEMY_API_KEY 
        ? `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
        : 'https://polygon-rpc.com' // Fallback vers un RPC public
    )
  }
})

export default config
