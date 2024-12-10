import { http } from 'viem'
import { polygonMumbai } from 'viem/chains'
import { AlchemyProvider } from "@alchemy/aa-core"

if (!process.env.NEXT_PUBLIC_ALCHEMY_API_KEY) {
  throw new Error('NEXT_PUBLIC_ALCHEMY_API_KEY is not defined')
}

const chain = polygonMumbai

// Initialize the provider without connecting immediately
export const provider = new AlchemyProvider({
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!,
  chain,
})

// Export the chain configuration for wagmi
export const config = {
  chains: [chain],
  transports: {
    [chain.id]: http(`https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`)
  }
}
