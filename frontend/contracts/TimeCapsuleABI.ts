export const CONTRACT_ADDRESS = "0x8C6dD3d921B833719194D99ED747EF411187624C"
export const PRICING_CONTRACT_ADDRESS = "0xC34E3C7B63A3c5f0f3c2830397d09C2FDe3c437a"

// ABI du contrat TimeCapsule
export const CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_content",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_unlockTime",
        "type": "uint256"
      }
    ],
    "name": "createCapsule",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "unlockCapsule",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

// ABI du contrat Pricing
export const PRICING_ABI = [
  {
    "inputs": [],
    "name": "calculatePrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// Ajoutez ceci à la fin du fichier
export const timeCapsuleABI = CONTRACT_ABI;