'use client'

import { useAccount, useContractWrite } from 'wagmi'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/contracts/TimeCapsuleABI'
import { parseEther } from 'viem'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function Navigation() {
    const { address, isConnected } = useAccount()
    const [showTxDetails, setShowTxDetails] = useState(false)

    const { 
        writeContract: createCapsule,
        data: writeData,
        error: writeError,
        isPending: isWriteLoading,
        isSuccess: isWriteSuccess,
        isError: isWriteError,
    } = useContractWrite()

    const handleCreateCapsule = async () => {
        if (!createCapsule) {
            console.error('Write function not available')
            return
        }

        try {
            await createCapsule({
                address: CONTRACT_ADDRESS,
                abi: CONTRACT_ABI,
                functionName: 'createCapsule',
                args: ['My first capsule', 'Title', 'Description', BigInt(Date.now() + 86400000)],
            })
            setShowTxDetails(true)

        } catch (error: any) {
            if (error.code === 'ACTION_REJECTED') {
                console.error('Transaction rejected by user')
            } else if (error.code === 'INSUFFICIENT_FUNDS') {
                console.error('Insufficient funds for transaction')
            } else {
                console.error('Error creating capsule:', error)
            }
        }
    }

    return (
        <nav className="flex items-center justify-between flex-wrap bg-transparent p-6">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center flex-shrink-0 text-white mr-6"
            >
                <span className="font-semibold text-xl tracking-tight">Time Capsule</span>
            </motion.div>

            <div className="flex items-center space-x-4">
                {isConnected ? (
                    <motion.div 
                        className="flex items-center space-x-4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <motion.button
                            onClick={handleCreateCapsule}
                            disabled={isWriteLoading}
                            className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg 
                                     font-semibold shadow-lg hover:bg-yellow-400 
                                     disabled:opacity-50 disabled:cursor-not-allowed 
                                     transition-all duration-300"
                            whileHover={{ scale: !isWriteLoading ? 1.05 : 1 }}
                            whileTap={{ scale: !isWriteLoading ? 0.95 : 1 }}
                        >
                            {isWriteLoading ? 'Creating...' : 'Create Capsule'}
                        </motion.button>

                        <motion.span 
                            className="text-white text-sm opacity-80"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.8 }}
                        >
                            {`${address?.slice(0, 6)}...${address?.slice(-4)}`}
                        </motion.span>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <span className="text-white opacity-80">
                            Connect wallet to continue
                        </span>
                    </motion.div>
                )}
            </div>

            <AnimatePresence>
                {isWriteError && (
                    <motion.div 
                        className="absolute top-20 right-6 text-red-500 bg-red-100/10 p-3 rounded-lg backdrop-blur-sm"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <div className="flex items-center space-x-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{writeError?.message || 'Transaction failed'}</span>
                        </div>
                    </motion.div>
                )}

                {isWriteSuccess && (
                    <motion.div 
                        className="absolute top-20 right-6 text-green-500 bg-green-100/10 p-3 rounded-lg backdrop-blur-sm"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <div className="flex items-center space-x-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Capsule created!</span>
                        </div>
                        {showTxDetails && writeData && (
                            <motion.div 
                                className="text-xs mt-2 opacity-80"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                Hash: {writeData.slice(2, 12)}...
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
