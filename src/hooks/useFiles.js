import { useState, useEffect, useCallback } from 'react';
import { fileAPI } from '../services/api';

export const useFiles = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFiles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedFiles = await fileAPI.getFiles();
      setFiles(fetchedFiles);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des fichiers');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleFileUploaded = useCallback((newFile) => {
    setFiles(prevFiles => [newFile, ...prevFiles]);
  }, []);

  const handleFileDeleted = useCallback((filename) => {
    setFiles(prevFiles => prevFiles.filter(file => file.originalName !== filename));
  }, []);

  return {
    files,
    loading,
    error,
    refetch: fetchFiles,
    handleFileUploaded,
    handleFileDeleted
  };
};