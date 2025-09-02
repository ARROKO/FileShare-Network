import React from 'react';

export const Stats = ({ files }) => {
  const totalSize = files.reduce((acc, file) => acc + file.size, 0);
  
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="text-center">
          <p className="text-3xl font-bold text-blue-600">{files.length}</p>
          <p className="text-sm text-gray-600 mt-1">
            {files.length <= 1 ? 'Fichier' : 'Fichiers'}
          </p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="text-center">
          <p className="text-3xl font-bold text-green-600">{formatFileSize(totalSize)}</p>
          <p className="text-sm text-gray-600 mt-1">Espace utilisé</p>
        </div>
      </div>
    </div>
  );
};