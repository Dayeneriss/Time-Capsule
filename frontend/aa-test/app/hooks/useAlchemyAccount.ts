import { useState, useCallback } from 'react'
import { useConnect, useDisconnect, useWalletClient, useAccount } from 'wagmi'
import { provider } from '../config/accountKit'
import { LightSmartContractAccount, type SmartAccountSigner } from "@alchemy/aa-core"
import { encodeFunctionData, parseAbi } from 'viem'

// ABI for NFT contract
const nftAbi = parseAbi([
  'function safeMint(address to) public',
  'function transferFrom(address from, address to, uint256 tokenId) public'
])

export function useAlchemyAccount() {
  const { connectAsync, connectors } = useConnect()
  const { disconnectAsync } = useDisconnect()
  const { data: walletClient } = useWalletClient()
  const { address: connectedAddress, isConnected } = useAccount()
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [account, setAccount] = useState<LightSmartContractAccount | null>(null)

  const connect = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Connect with MetaMask
      const connector = connectors.find((c) => c.name === 'MetaMask')
      if (!connector) {
        throw new Error('MetaMask connector not found')
      }

      const result = await connectAsync({ connector })
      if (!result?.address) {
        throw new Error('Failed to connect wallet')
      }

      if (!walletClient) {
        throw new Error('Wallet client not found')
      }

      // Create the owner signer
      const owner: SmartAccountSigner = {
        signMessage: async (msg: Uint8Array | string) => {
          return await walletClient.signMessage({ message: msg })
        },
        signTransaction: async (tx: any) => {
          return await walletClient.signTransaction(tx)
        },
        getAddress: async () => result.address,
      }

      // Create a new account instance
      const connectedProvider = provider.connect((rpcClient) => new LightSmartContractAccount({
        chain: provider.chain,
        owner,
        factoryAddress: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
        rpcClient
      }))

      const newAccount = await connectedProvider.getAccount()
      setAccount(newAccount)
    } catch (err) {
      console.error('Failed to connect:', err)
      setError(err instanceof Error ? err : new Error('Failed to connect'))
    } finally {
      setIsLoading(false)
    }
  }, [connectAsync, connectors, walletClient])

  const disconnect = useCallback(async () => {
    try {
      await disconnectAsync()
      setAccount(null)
      setError(null)
    } catch (err) {
      console.error('Failed to disconnect:', err)
      setError(err instanceof Error ? err : new Error('Failed to disconnect'))
    }
  }, [disconnectAsync])

  const batchMintNFTs = useCallback(async (contractAddress: string, recipients: string[]) => {
    if (!account) throw new Error('No account connected')

    const calls = recipients.map(to => ({
      target: contractAddress,
      data: encodeFunctionData({
        abi: nftAbi,
        functionName: 'safeMint',
        args: [to]
      })
    }))

    const uoHash = await account.sendUserOperation({
      target: contractAddress,
      data: calls[0].data // For single call
      // For batch calls, we'll need to implement the batch transaction method
    })

    return uoHash
  }, [account])

  const batchTransferNFTs = useCallback(async (
    contractAddress: string,
    from: string,
    recipients: string[],
    tokenIds: number[]
  ) => {
    if (!account) throw new Error('No account connected')
    if (recipients.length !== tokenIds.length) throw new Error('Recipients and tokenIds must have the same length')

    const calls = recipients.map((to, index) => ({
      target: contractAddress,
      data: encodeFunctionData({
        abi: nftAbi,
        functionName: 'transferFrom',
        args: [from, to, tokenIds[index]]
      })
    }))

    const uoHash = await account.sendUserOperation({
      target: contractAddress,
      data: calls[0].data // For single call
      // For batch calls, we'll need to implement the batch transaction method
    })

    return uoHash
  }, [account])

  return {
    connect,
    disconnect,
    isConnected: !!account,
    isLoading,
    error,
    account,
    batchMintNFTs,
    batchTransferNFTs
  }
}
