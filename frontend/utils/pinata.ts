// utils/pinata.ts
import axios from 'axios';


const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT;

export const uploadToIPFS = async (file: File | Blob) => {
  if (!file) return null;

  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      headers: {
        'Authorization': `Bearer ${PINATA_JWT}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return `ipfs://${res.data.IpfsHash}`;
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    return null;
  }
};