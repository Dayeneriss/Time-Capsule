export const useAccount = () => ({
  address: '0x123',
  isConnected: true,
})

export const useWriteContract = () => ({
  writeContract: jest.fn(),
  status: 'idle',
  error: null,
})

export const useWatchContractEvent = jest.fn()

export default {
  useAccount,
  useWriteContract,
  useWatchContractEvent,
}
