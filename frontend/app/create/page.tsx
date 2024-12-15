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

  const uploadToPinata = async (files: File[]): Promise<string> => {
    try {
      const uploadPromises = files.map(file => uploadToIPFS(file));
      const results = await Promise.all(uploadPromises);
      
      // Filter out any null results
      const successfulUploads = results.filter((result): result is string => result !== null);
      
      // Ensure we have at least one successful upload
      if (successfulUploads.length === 0) {
        throw new Error('Failed to upload files');
      }
      
      // Get the first upload and remove the ipfs:// prefix
      const firstUpload = successfulUploads[0];
      if (!firstUpload) {
        throw new Error('No successful uploads found');
      }
      
      return firstUpload.replace('ipfs://', '');
    } catch (error) {
      console.error('Error uploading to Pinata:', error);
      throw error;
    }
  };

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
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
        value: parseEther('0.01'),  // Montant correct selon le contrat
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
              <input
                type="datetime-local"
                className="w-full bg-background/40 border border-primary/30 rounded-lg p-3 text-text-light focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                value={formData.unlockDate}
                onChange={(e) => setFormData({ ...formData, unlockDate: e.target.value })}
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
                      <p className="text-text-light mb-2">{formData.files.length} file(s) selected</p>
                      <p className="text-text-muted text-sm">Click or drag to add more files</p>
                    </>
                  ) : (
                    <>
                      <p className="text-text-light mb-2">Drag and drop your files here</p>
                      <p className="text-text-muted text-sm">or click to select files</p>
                      <p className="text-text-muted text-xs mt-2">Supported formats: Images, Videos, Audio, PDF, Text, and Documents</p>
                    </>
                  )}
                </label>

                {/* File Preview Section */}
                {formData.files && formData.files.length > 0 && (
                  <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Array.from(formData.files).map((file, index) => (
                      <div key={index} className="relative group">
                        {file.type.startsWith('image/') ? (
                          <div className="relative aspect-square rounded-lg overflow-hidden border border-primary/20">
                            <Image
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="aspect-square rounded-lg border border-primary/20 flex items-center justify-center bg-background/40">
                            <span className="text-2xl">
                              {file.type.includes('video') ? '🎥' :
                               file.type.includes('audio') ? '🎵' :
                               file.type.includes('pdf') ? '📄' :
                               '📁'}
                            </span>
                          </div>
                        )}
                        <div className="mt-1 space-y-0.5">
                          <p className="text-xs text-text-muted truncate">{file.name}</p>
                          <p className="text-xs text-text-muted/70">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Total size information */}
                {formData.files && formData.files.length > 0 && (
                  <div className="mt-4 text-sm text-text-muted">
                    <p>Total size: {formatFileSize(Array.from(formData.files).reduce((acc, file) => acc + file.size, 0))}</p>
                    <p className="text-xs text-text-muted/70">Maximum allowed: 10 MB per file</p>
                  </div>
                )}
              </div>
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isUploading || isConfirming}
              className="w-full bg-magic hover:bg-magic-shine text-text-light py-4 rounded-lg font-medium transition-all transform hover:scale-105 shadow-cosmic"
            >
              {isUploading ? 'Uploading to IPFS...' : 
               writeStatus === 'pending' ? 'Confirming Transaction...' : 
               'Create Time Capsule'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}