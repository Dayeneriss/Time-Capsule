import { createConfig, http } from 'wagmi'
import { polygonMumbai } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

if (!process.env.NEXT_PUBLIC_ALCHEMY_API_KEY) {
  throw new Error('NEXT_PUBLIC_ALCHEMY_API_KEY is not defined')
}

const config = createConfig({
  chains: [polygonMumbai],
  connectors: [
    injected(),
  ],
  transports: {
    [polygonMumbai.id]: http(`https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`)
  }
})

export default config
