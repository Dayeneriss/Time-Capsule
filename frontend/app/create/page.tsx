"use client";

import { useState, useCallback, useEffect } from 'react';  
import { useAccount } from 'wagmi';  
import { ConnectKitButton } from 'connectkit';  
import Image from 'next/image';  
import { useRouter } from 'next/navigation';  
import { parseEther } from 'viem';  
import { useWriteContract, useWatchContractEvent } from 'wagmi';  
import { timeCapsuleABI } from '@/contracts/TimeCapsuleABI';  
import FileUploadInfo from '../components/FileUploadInfo';

// Modifiez l'interface du formData  
interface FormData {  
  title: string;  
  description: string;  
  unlockDate: string;  
  files: File[] | null; // Utilisez le type File natif  
}  

export default function CreatePage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { writeContract, status: writeStatus, error: writeError } = useWriteContract();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    unlockDate: '',
    files: null,
  });

  // Cleanup effect fore previews
  useEffect(() => {
    return () => {
      previews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const uploadToPinata = async (files: File[]) => {
    if (!process.env.NEXT_PUBLIC_PINATA_JWT) {  
      throw new Error('Pinata JWT is not configured');  
    }

    try {
      // Create form data for files
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('file', file);
      });

      // Upload to Pinata
      const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`
        },
        body: formData
      });

      if (!res.ok) {
        throw new Error('Failed to upload to Pinata');
      }

      const data = await res.json();
      return data.IpfsHash;
    } catch (error) {
      console.error('Error uploading to Pinata:', error);
      throw new Error('Failed to upload files to IPFS');
    }
  };

  const handleFileChange = useCallback((e: 
    React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    // Validate file size  
        const maxSize = 10 * 1024 * 1024; // 10MB  
        const invalidFiles = selectedFiles.filter(file => file.size > maxSize);  
    
        if (invalidFiles.length > 0) {  
          setError('Some files exceed the 10MB size limit');  
          return;  
        }  

    setFormData(prev => ({ ...prev, files: selectedFiles }));

    // Create previews for images
    const newPreviews = selectedFiles
    .filter(file => file.type.startsWith('image/'))
    .map(file => URL.createObjectURL(file));
    
    setPreviews(prev=> {
      // Cleanup old previews
      prev.forEach(url=> URL.revokeObjectURL(url));
      return newPreviews ;
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {  
    e.preventDefault();  
    setError(null);  
    setIsUploading(true);  
    setIsConfirming(false);  
    setIsSuccess(false);  

    try {  
      if (!formData.files || formData.files.length === 0) {  
        throw new Error('Please select at least one file');  
      }  

      const unlockTimestamp = Math.floor(new Date(formData.unlockDate).getTime() / 1000);  
      const currentTimestamp = Math.floor(Date.now() / 1000);  

      if (unlockTimestamp <= currentTimestamp) {  
        throw new Error('Unlock date must be in the future');  
      }  

      // Upload files to Pinata
      setIsUploading(true);
      const filesCid = await uploadToPinata(formData.files);  

      // Prepare metadata  
      const metadata = {  
        title: formData.title,  
        description: formData.description,  
        files: filesCid,  
        created: currentTimestamp,  
      };  

      // Upload metadata to Pinata
      const metadataBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
      const metadataFile = new File([metadataBlob], 'metadata.json', { type: 'application/json' });
      const metadataCid = await uploadToPinata([metadataFile]);

      setIsUploading(false);  
      setIsConfirming(true);  

      // Create capsule  
      if (!process.env.NEXT_PUBLIC_CONTRACT_ADDRESS) {  
        throw new Error('Contract address is not configured');  
      }  

      const { hash } = await writeContract({  
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,  
        abi: timeCapsuleABI,  
        functionName: 'createCapsule',  
        args: [
          formData.title,
          formData.description,
          metadataCid,
          BigInt(unlockTimestamp)
        ],  
        value: parseEther('0.01'),  // Montant correct selon le contrat
      });

      // Attendre la confirmation de la transaction
      if (hash) {
        setIsSuccess(true);
        // Attendre un peu pour montrer le message de succès
        await new Promise(resolve => setTimeout(resolve, 2000));
        // Rediriger vers la page des capsules
        router.push('/capsules');
      }

    } catch (err) {  
      setError(err instanceof Error ? err.message : 'Failed to create time capsule');  
      console.error('Error creating time capsule:', err);  
      setIsConfirming(false);  
    } finally {  
      setIsUploading(false);  
      cleanup();  
    }  
  };  

  const cleanup = useCallback(() => {
    previews.forEach(preview => URL.revokeObjectURL(preview));
  }, [previews]);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-[#1E2530] flex flex-col items-center justify-center p-4">
        <div className="bg-[#262B35] p-8 rounded-lg text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h2>
          <p className="text-gray-400 mb-6">
            Please connect your wallet to continue
          </p>
          <ConnectKitButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1E2530] p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Create Time Capsule</h1>

        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {writeError && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-6">
            Transaction failed. Please try again.
          </div>
        )}

        {isSuccess && (
          <div className="bg-green-500 text-white p-4 rounded-lg mb-6">
            Time capsule created successfully! Redirecting...
          </div>
        )}
        <form onSubmit={handleSubmit} className="bg-[#262B35] p-6 rounded-lg">
          <div className="mb-6">
            <p className="text-gray-400 mb-4 text-sm">
              Coût de création : 0.01 ETH (environ 25$)
            </p>
            <label className="block text-white mb-2">Title</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-[#1E2530] text-white border border-gray-700"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-white mb-2">Description</label>
            <textarea
              className="w-full p-2 rounded bg-[#1E2530] text-white border border-gray-700 h-32"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-white mb-2">Unlock Date</label>
            <input
              type="datetime-local"
              className="w-full p-2 rounded bg-[#1E2530] text-white border border-gray-700"
              value={formData.unlockDate}
              onChange={(e) => setFormData({ ...formData, unlockDate: e.target.value })}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-white mb-2">Upload Files</label>
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-4">
              <input
                type="file"
                multiple
                className="hidden"
                id="file-upload"
                onChange={handleFileChange}
                accept="image/*"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer text-gray-400 hover:text-[#FFC107] block text-center mb-4"
              >
                Click to upload or drag and drop files here
              </label>
              
              {/* Image Previews */}
              {previews.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {previews.map((preview, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                      <Image
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
              {formData.files && (
                <FileUploadInfo file={formData.files[0]} maxSize={10} />
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isUploading || isConfirming}
            className="w-full bg-[#FFC107] text-gray-900 py-3 rounded font-medium hover:bg-[#FFD54F] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? 'Uploading to IPFS...' : 
             writeStatus === 'pending' ? 'Confirming Transaction...' : 
             'Create Time Capsule'}
          </button>
        </form>
      </div>
    </div>
  );
}