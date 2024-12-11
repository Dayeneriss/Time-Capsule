export interface TimeCapsule {
  id: string;
  owner: string;
  unlockTime: number;
  ipfsHash: string;
  isRevealed: boolean;
}
