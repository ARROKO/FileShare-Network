import React, { useState } from 'react';
import { Download, Trash2, File, Image, FileText, Music, Video, Archive } from 'lucide-react';
import { fileAPI } from '../services/api';

export const FileList = ({ files, onFileDeleted }) => {
  const [deletingFiles, setDeletingFiles] = useState(new Set());

  const getFileIcon = (type) => {
    const iconClass = "h-6 w-6";
    
    switch (type.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'webp':
        return <Image className={`${iconClass} text-green-500`} />;
      case 'pdf':
      case 'doc':
      case 'docx':
      case 'txt':
        return <FileText className={`${iconClass} text-blue-500`} />;
      case 'mp3':
      case 'wav':
      case 'ogg':
        return <Music className={`${iconClass} text-purple-500`} />;
      case 'mp4':
      case 'avi':
      case 'mkv':
        return <Video className={`${iconClass} text-red-500`} />;
      case 'zip':
      case 'rar':
      case '7z':
        return <Archive className={`${iconClass} text-yellow-500`} />;
      default:
        return <File className={`${iconClass} text-gray-500`} />;
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDownload = (file) => {
    const downloadUrl = fileAPI.getDownloadUrl(file.originalName);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async (file) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer "${file.name}" ?`)) {
      return;
    }

    setDeletingFiles(prev => new Set(prev).add(file.originalName));
    
    try {
      await fileAPI.deleteFile(file.originalName);
      onFileDeleted(file.originalName);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Erreur lors de la suppression');
    } finally {
      setDeletingFiles(prev => {
        const newSet = new Set(prev);
        newSet.delete(file.originalName);
        return newSet;
      });
    }
  };

  if (files.length === 0) {
    return (
      <div className="text-center py-12">
        <File className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-500">Aucun fichier</h3>
        <p className="text-sm text-gray-400">Uploadez votre premier fichier pour commencer</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {files.map((file) => (
        <div
          key={file.id}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300"
        >
          <div className="p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                {getFileIcon(file.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate" title={file.name}>
                  {file.name}
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  {formatFileSize(file.size)} • {formatDate(file.uploadDate)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-2 mt-4 pt-4 border-t border-gray-100">
              <button
                onClick={() => handleDownload(file)}
                className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
                title="Télécharger"
              >
                <Download className="h-4 w-4" />
              </button>
              
              <button
                onClick={() => handleDelete(file)}
                disabled={deletingFiles.has(file.originalName)}
                className={`
                  inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-colors
                  ${deletingFiles.has(file.originalName)
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-red-600 hover:text-red-700 hover:bg-red-50'
                  }
                `}
                title="Supprimer"
              >
                {deletingFiles.has(file.originalName) ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-500 border-t-transparent"></div>
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};