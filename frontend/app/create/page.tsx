"use client";

import { useState, useCallback, useEffect } from 'react';  
import { useAccount } from 'wagmi';  
import ConnectButton from '../components/ConnectButton';  
import Image from 'next/image';  
import { useRouter } from 'next/navigation';  
import { parseEther } from 'viem';  
import { useWriteContract, useWatchContractEvent } from 'wagmi';  
import { timeCapsuleABI } from '@/contracts/TimeCapsuleABI';  
import { uploadToIPFS } from '@/utils/pinata';
import FileUploadInfo from '../components/FileUploadInfo';
import FloatingParticles from '../components/FloatingParticles';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

// Modifiez l'interface du formData  
interface FormData {  
  title: string;  
  description: string;  
  unlockDate: string;  
  files: File[] | null;
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

  const uploadToPinata = async (files: File[]): Promise<string> => {
    try {
      const uploadPromises = files.map(file => uploadToIPFS(file));
      const results = await Promise.all(uploadPromises);
      return results[0]; // Return the first CID for now
    } catch (error) {
      console.error('Error uploading to Pinata:', error);
      throw error;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    setFormData(prev => ({ ...prev, files: fileArray }));

    // Create and set preview URLs
    const newPreviews = fileArray.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files);
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    
    // Create a new DataTransfer object
    const dataTransfer = new DataTransfer();
    files.forEach(file => dataTransfer.items.add(file));
    
    // Set the files to the input
    if (fileInput) {
      fileInput.files = dataTransfer.files;
      // Trigger the onChange event
      const event = new Event('change', { bubbles: true });
      fileInput.dispatchEvent(event);
    }
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

      const hash = await writeContract({  
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,  
        abi: timeCapsuleABI,  
        functionName: 'createCapsule',  
        args: [
          formData.title,
          formData.description,
          metadataCid,
          BigInt(unlockTimestamp)
        ],  
        value: parseEther('0.01'),
      });

      setIsSuccess(true);
      // Attendre un peu pour montrer le message de succès
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Rediriger vers la page des capsules
      router.push('/capsules');
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

  // Fonction utilitaire pour formater la taille des fichiers
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Background gradients */}
        <div className="fixed inset-0 bg-nebula opacity-80" />
        <div className="fixed inset-0 bg-stardust opacity-60" />
        <div className="fixed inset-0 bg-aurora opacity-40" />
        
        <FloatingParticles />

        {/* Main content */}
        <div className="relative z-10 max-w-4xl mx-auto p-8">
          <h1 className="text-5xl font-bold mb-8 text-center animate-float bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
            Connect Your Wallet
          </h1>
          
          <div className="bg-card/20 backdrop-blur-lg rounded-2xl p-8 shadow-cosmic border border-primary/20">
            <ConnectButton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradients */}
      <div className="fixed inset-0 bg-nebula opacity-80" />
      <div className="fixed inset-0 bg-stardust opacity-60" />
      <div className="fixed inset-0 bg-aurora opacity-40" />
      
      <FloatingParticles />

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto p-8">
        <h1 className="text-5xl font-bold mb-8 text-center animate-float bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent">
          Create Your Time Capsule
        </h1>
        
        <div className="bg-card/20 backdrop-blur-lg rounded-2xl p-8 shadow-cosmic border border-primary/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-text-light mb-2 text-lg">Title</label>
              <input
                type="text"
                className="w-full bg-background/40 border border-primary/30 rounded-lg p-3 text-text-light focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                placeholder="Name your capsule"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-text-light mb-2 text-lg">Description</label>
              <textarea
                className="w-full bg-background/40 border border-primary/30 rounded-lg p-3 text-text-light focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all min-h-[120px]"
                placeholder="Share the story behind this capsule"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-text-light mb-2 text-lg">Unlock Date</label>
              <DatePicker
                selected={formData.unlockDate ? new Date(formData.unlockDate) : null}
                onChange={(date) => setFormData({ ...formData, unlockDate: date ? date.toISOString() : '' })}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                minDate={new Date()}
                className="w-full bg-background/40 border border-primary/30 rounded-lg p-3 text-text-light focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                placeholderText="Select unlock date and time"
              />
            </div>

            <div>
              <label className="block text-text-light mb-2 text-lg">Upload Files</label>
              <div 
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer 
                          ${formData.files?.length ? 'border-primary/50 bg-primary/5' : 'border-primary/30 bg-background/40'} 
                          hover:border-primary/50 hover:bg-primary/5`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  multiple
                  className="hidden"
                  id="file-upload"
                  onChange={handleFileChange}
                  accept="image/*,video/*,audio/*,application/pdf,.txt,.doc,.docx"
                />
                <label htmlFor="file-upload" className="cursor-pointer block">
                  <div className="text-4xl mb-4">🌟</div>
                  {formData.files?.length ? (
                    <>
                      <p className="text-lg font-medium mb-2">{formData.files.length} file(s) selected</p>
                      <ul className="text-sm text-text-light/80">
                        {Array.from(formData.files).map((file, index) => (
                          <li key={index} className="mb-1">
                            {file.name} ({formatFileSize(file.size)})
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <>
                      <p className="text-lg font-medium mb-2">Drop your files here or click to browse</p>
                      <p className="text-sm text-text-light/80">Support for images, videos, audio, and documents</p>
                    </>
                  )}
                </label>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-500">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isUploading || isConfirming}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-lg shadow-cosmic
                        transition-all duration-300 transform hover:scale-105 active:scale-95
                        ${isUploading || isConfirming
                          ? 'bg-primary/50 cursor-not-allowed'
                          : 'bg-primary hover:bg-primary/80'}`}
            >
              {isUploading ? 'Uploading...' :
               isConfirming ? 'Confirming...' :
               isSuccess ? 'Success!' :
               'Create Time Capsule'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}