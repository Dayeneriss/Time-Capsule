import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useCallback, useState } from 'react'
import { parseEther } from 'viem'

export function useWallet() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const connectWallet = useCallback(() => {
    const connector = connectors.find((c) => c.name === 'MetaMask')
    if (connector) {
      connect({ connector })
    }
  }, [connect, connectors])

  const disconnectWallet = useCallback(() => {
    disconnect()
  }, [disconnect])

  const sendTx = useCallback(async ({ to, value }: { to: string; value: string }) => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Implementation will be added here
      
      setIsLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transaction failed')
      setIsLoading(false)
    }
  }, [])

  return {
    address,
    isConnected,
    isLoading,
    error,
    connect: connectWallet,
    disconnect: disconnectWallet,
    sendTx
  }
}
