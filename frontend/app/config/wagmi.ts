import { createConfig, http } from 'wagmi'
import { polygon } from 'wagmi/chains'
import { injected } from 'wagmi'

// Vérifiez que vous utilisez bien une clé Alchemy pour le mainnet Polygon
if (!process.env.ALCHEMY_API_KEY) {
  throw new Error('ALCHEMY_API_KEY is not defined. Assurez-vous que la clé est configurée pour le mainnet Polygon.')
}

// Configuration pour le mainnet Polygon
const config = createConfig({
  // Utilisation du mainnet Polygon
  chains: [polygon],
  connectors: [
    injected(),
  ],
  // Configuration du transport RPC pour Polygon mainnet via Alchemy
  transports: {
    [polygon.id]: http(`https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`)
  }
})

export default config
