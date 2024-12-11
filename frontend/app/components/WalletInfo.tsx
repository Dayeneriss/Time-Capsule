'use client'

import { useState } from 'react'
import { useWallet } from '../hooks/useWallet'

export default function WalletInfo() {
  const { isConnected, address, isLoading, error, sendTx } = useWallet()
  const [amount, setAmount] = useState('')
  const [recipientAddress, setRecipientAddress] = useState('')

  // Exemple de transaction ETH
  const handleSendEth = async () => {
    if (!amount || !recipientAddress) return
    try {
      const tx = await sendTx({
        to: recipientAddress,
        value: amount
      })
      console.log('Transaction hash:', tx)
    } catch (err) {
      console.error('Failed to send ETH:', err)
    }
  }

  // Exemple de transaction USDC
  const handleSendUSDC = async () => {
    if (!amount || !recipientAddress) return
    try {
      const USDC_CONTRACT = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' // Mainnet USDC
      // Removed sendUSDC function call
      console.log('USDC transaction hash:')
    } catch (err) {
      console.error('Failed to send USDC:', err)
    }
  }

  // Exemple de batch transactions
  const handleBatchTransfer = async () => {
    if (!amount || !recipientAddress) return
    try {
      const transactions = [
        {
          to: recipientAddress,
          value: amount
        },
        {
          to: recipientAddress,
          value: amount
        }
      ]
      // Removed sendBatchTransactions function call
      console.log('Batch transactions hashes:')
    } catch (err) {
      console.error('Failed to send batch transactions:', err)
    }
  }

  if (!isConnected) {
    return null
  }

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Wallet Info</h2>
        <p className="text-gray-600">
          Address: {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected'}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Amount
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="0.0"
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Recipient Address
            <input
              type="text"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="0x..."
            />
          </label>
        </div>

        <div className="space-x-4">
          <button
            onClick={handleSendEth}
            disabled={isLoading}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            Send ETH
          </button>

          <button
            onClick={handleSendUSDC}
            disabled={isLoading}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
          >
            Send USDC
          </button>

          <button
            onClick={handleBatchTransfer}
            disabled={isLoading}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
          >
            Batch Transfer
          </button>
        </div>

        {isLoading && (
          <p className="text-blue-600">Transaction en cours...</p>
        )}

        {error && (
          <p className="text-red-600">{error}</p>
        )}
      </div>
    </div>
  )
}
