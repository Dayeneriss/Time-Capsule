'use client'

import { useAlchemyAccount } from './hooks/useAlchemyAccount'
import { useState } from 'react'

export default function AATestPage() {
  const { connect, disconnect, isConnected, isLoading, error, batchMintNFTs, batchTransferNFTs } = useAlchemyAccount()
  const [nftContract, setNftContract] = useState('')
  const [recipients, setRecipients] = useState<string[]>([''])
  const [tokenIds, setTokenIds] = useState<number[]>([0])
  const [txHash, setTxHash] = useState<string>('')
  const [isBatchLoading, setIsBatchLoading] = useState(false)

  const addRecipient = () => {
    setRecipients([...recipients, ''])
    setTokenIds([...tokenIds, 0])
  }

  const removeRecipient = (index: number) => {
    setRecipients(recipients.filter((_, i) => i !== index))
    setTokenIds(tokenIds.filter((_, i) => i !== index))
  }

  const updateRecipient = (index: number, value: string) => {
    const newRecipients = [...recipients]
    newRecipients[index] = value
    setRecipients(newRecipients)
  }

  const updateTokenId = (index: number, value: number) => {
    const newTokenIds = [...tokenIds]
    newTokenIds[index] = value
    setTokenIds(newTokenIds)
  }

  const handleBatchMint = async () => {
    try {
      setIsBatchLoading(true)
      const hash = await batchMintNFTs(nftContract, recipients.filter(r => r !== ''))
      setTxHash(hash)
    } catch (err) {
      console.error('Failed to batch mint:', err)
    } finally {
      setIsBatchLoading(false)
    }
  }

  const handleBatchTransfer = async () => {
    try {
      setIsBatchLoading(true)
      const hash = await batchTransferNFTs(
        nftContract,
        '0x...', // Replace with the owner's address
        recipients.filter(r => r !== ''),
        tokenIds
      )
      setTxHash(hash)
    } catch (err) {
      console.error('Failed to batch transfer:', err)
    } finally {
      setIsBatchLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Account Abstraction Test Page</h1>
        
        <div className="space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error.message}
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <span>Connection Status:</span>
            <span className={`font-semibold ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>

          <button
            onClick={isConnected ? disconnect : connect}
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-md font-medium ${
              isConnected
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLoading
              ? 'Loading...'
              : isConnected
              ? 'Disconnect'
              : 'Connect with MetaMask'}
          </button>

          {isConnected && (
            <div className="space-y-6 pt-6 border-t">
              <h2 className="text-xl font-semibold">Batch NFT Operations</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  NFT Contract Address
                </label>
                <input
                  type="text"
                  value={nftContract}
                  onChange={(e) => setNftContract(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="0x..."
                />
              </div>

              <div className="space-y-4">
                {recipients.map((recipient, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={recipient}
                        onChange={(e) => updateRecipient(index, e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Recipient address"
                      />
                    </div>
                    <div className="w-24">
                      <input
                        type="number"
                        value={tokenIds[index]}
                        onChange={(e) => updateTokenId(index, parseInt(e.target.value))}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Token ID"
                      />
                    </div>
                    <button
                      onClick={() => removeRecipient(index)}
                      className="px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <button
                  onClick={addRecipient}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  + Add Recipient
                </button>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleBatchMint}
                  disabled={isBatchLoading || !nftContract || recipients.every(r => !r)}
                  className="flex-1 py-2 px-4 rounded-md font-medium bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
                >
                  Batch Mint
                </button>
                <button
                  onClick={handleBatchTransfer}
                  disabled={isBatchLoading || !nftContract || recipients.every(r => !r)}
                  className="flex-1 py-2 px-4 rounded-md font-medium bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50"
                >
                  Batch Transfer
                </button>
              </div>

              {txHash && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <h3 className="text-sm font-medium text-gray-900">Transaction Hash</h3>
                  <p className="mt-2 text-sm text-gray-500 break-all">{txHash}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
