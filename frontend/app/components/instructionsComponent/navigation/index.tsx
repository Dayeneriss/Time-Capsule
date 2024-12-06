import { useAccount } from 'wagmi'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../../constants/contracts'

export default function InstructionsComponent() {
    const { address } = useAccount()

    const { config } = usePrepareContractWrite({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'createCapsule',
        args: ['My first capsule', Date.now() + 86400000], // Débloquable dans 24h
    })

    const { write: createCapsule } = useContractWrite(config)

    return (
        <div className="text-center py-20">
            <h1 className="text-5xl font-bold text-white mb-4">
                Preserve Your <span className="text-yellow-500">Memories</span> Forever
            </h1>
            <button
                onClick={() => createCapsule?.()}
                className="px-6 py-3 bg-yellow-500 text-gray-900 rounded-md"
            >
                Create Time Capsule
            </button>
        </div>
    )
}