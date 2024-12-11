import { useEffect, useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { timeCapsuleABI } from '@/contracts/TimeCapsuleABI';
import { Address } from 'viem';

export function useTimeCapsule() {
  const { address: userAddress } = useAccount();
  const [contractAddress, setContractAddress] = useState<Address>();

  useEffect(() => {
    const addr = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
    if (addr?.startsWith('0x')) {
      setContractAddress(addr as Address);
    }
  }, []);

  const { data: userCapsules } = useReadContract({
    address: contractAddress,
    abi: timeCapsuleABI,
    functionName: 'getCapsulesByOwner',
    args: userAddress ? [userAddress] : undefined,
    enabled: Boolean(userAddress && contractAddress),
  });

  return {
    userCapsules,
    contractAddress,
    isReady: Boolean(contractAddress),
  };
}
