import { useEffect, useState } from 'react';
import { useReadContract } from 'wagmi';
import { timeCapsuleABI } from '@/contracts/TimeCapsuleABI';

interface TimeCapsule {
  id: string;
  owner: string;
  title: string;
  description: string;
  metadataCid: string;
  unlockTimestamp: bigint;
}

export function useTimeCapsule(userAddress: string | undefined) {
  const [contractAddress, setContractAddress] = useState<`0x${string}` | undefined>(undefined);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS) {
      setContractAddress(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`);
    }
  }, []);

  const { data: userCapsules } = useReadContract({
    ...(contractAddress && userAddress ? {
      address: contractAddress,
      abi: timeCapsuleABI,
      functionName: 'getCapsulesByOwner' as const,
      args: [userAddress],
    } : {
      address: undefined,
      abi: undefined,
      functionName: undefined,
      args: undefined,
    })
  });

  return {
    userCapsules: userCapsules as TimeCapsule[] | undefined,
    contractAddress,
  };
}
