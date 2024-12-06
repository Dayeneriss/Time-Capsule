"use client";

interface FileUploadInfoProps {
  file: File | null;
  maxSize: number; // en Mo
}

export default function FileUploadInfo({ file, maxSize }: FileUploadInfoProps) {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getUsagePercentage = (fileSize: number): number => {
    return (fileSize / (maxSize * 1024 * 1024)) * 100;
  };

  if (!file) return null;

  const fileSize = file.size;
  const usagePercentage = getUsagePercentage(fileSize);
  const isOverLimit = usagePercentage > 100;

  return (
    <div className="mt-4 p-4 bg-[#262B35] rounded-lg">
      <div className="flex justify-between mb-2">
        <span className="text-gray-300">Taille du fichier:</span>
        <span className={`font-medium ${isOverLimit ? 'text-red-500' : 'text-white'}`}>
          {formatFileSize(fileSize)}
        </span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${
            isOverLimit ? 'bg-red-500' : 'bg-[#FFC107]'
          }`}
          style={{ width: `${Math.min(usagePercentage, 100)}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-400">0 MB</span>
        <span className="text-xs text-gray-400">{maxSize} MB</span>
      </div>
      {isOverLimit && (
        <p className="text-red-500 text-sm mt-2">
          ⚠️ Le fichier dépasse la limite de {maxSize} MB
        </p>
      )}
    </div>
  );
}
