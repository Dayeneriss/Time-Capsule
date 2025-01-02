// utils/pinata.ts
import axios from 'axios';

export const uploadToIPFS = async (file: File | Blob) => {
  if (!file) {
    console.error('No file provided for IPFS upload');
    return null;
  }

  try {
    // Dans Next.js, on accède aux variables publiques via window.ENV ou process.env.NEXT_PUBLIC_*
    const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT;
    
    if (!PINATA_JWT) {
      console.error('Pinata JWT is not defined in environment variables');
      throw new Error('Pinata JWT is not configured');
    }

    const formData = new FormData();
    formData.append('file', file);

    console.log('Attempting IPFS upload...');
    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      headers: {
        'Authorization': `Bearer ${PINATA_JWT}`,
        "Content-Type": "multipart/form-data",
      },
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    });

    console.log('Pinata response:', res.data);

    if (!res.data.IpfsHash) {
      console.error('No IPFS hash returned from Pinata');
      console.error('Response:', res.data);
      throw new Error('No CID returned from Pinata');
    }

    console.log(`Successfully uploaded to IPFS. Hash: ${res.data.IpfsHash}`);
    return `ipfs://${res.data.IpfsHash}`;
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    if (axios.isAxiosError(error)) {
      console.error('Response data:', error.response?.data);
    }
    throw error;
  }
}