import React, { useCallback, useState } from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { fileAPI } from '../services/api';

export const FileUpload = ({ onFileUploaded }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('idle');
  const [uploadMessage, setUploadMessage] = useState('');

  const handleFileUpload = useCallback(async (file) => {
    setIsUploading(true);
    setUploadStatus('idle');
    
    try {
      const response = await fileAPI.uploadFile(file);
      onFileUploaded(response.file);
      setUploadStatus('success');
      setUploadMessage(`${file.name} uploadé avec succès !`);
      
      // Reset status après 3 secondes
      setTimeout(() => {
        setUploadStatus('idle');
        setUploadMessage('');
      }, 3000);
    } catch (error) {
      setUploadStatus('error');
      setUploadMessage(error instanceof Error ? error.message : 'Erreur lors de l\'upload');
    } finally {
      setIsUploading(false);
    }
  }, [onFileUploaded]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileSelect = useCallback((e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
    // Reset input
    e.target.value = '';
  }, [handleFileUpload]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300
          ${isDragOver 
            ? 'border-blue-400 bg-blue-50 scale-105' 
            : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
          }
          ${isUploading ? 'pointer-events-none opacity-75' : 'cursor-pointer'}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => document.getElementById('fileInput')?.click()}
      >
        <input
          id="fileInput"
          type="file"
          className="hidden"
          onChange={handleFileSelect}
          disabled={isUploading}
        />
        
        <div className="flex flex-col items-center space-y-4">
          {isUploading ? (
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          ) : (
            <Upload className={`h-12 w-12 transition-colors ${isDragOver ? 'text-blue-500' : 'text-gray-400'}`} />
          )}
          
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              {isUploading ? 'Upload en cours...' : 'Glissez un fichier ici'}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              ou cliquez pour sélectionner un fichier
            </p>
          </div>
        </div>
        
        {uploadStatus !== 'idle' && (
          <div className={`
            absolute top-4 right-4 flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium
            ${uploadStatus === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
          `}>
            {uploadStatus === 'success' ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <span>{uploadMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};