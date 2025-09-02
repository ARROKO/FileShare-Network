const getApiBase = () => {
  if (typeof window !== 'undefined') {
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    return `${protocol}//${hostname}:4001/api`; // toujours forcer le port 4001
  }
  return 'http://localhost:4001/api';
};



export const fileAPI = {
  // Obtenir tous les fichiers
  async getFiles() {
    const response = await fetch(`${getApiBase()}/files`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erreur lors de la récupération des fichiers');
    }
    return response.json();
  },

  // Upload un fichier
  async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${getApiBase()}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erreur lors de l\'upload');
    }
    
    return response.json();
  },

  // Supprimer un fichier
  async deleteFile(filename) {
    const response = await fetch(`${getApiBase()}/files/${filename}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erreur lors de la suppression');
    }
  },

  // Obtenir l'URL de téléchargement
  getDownloadUrl(filename) {
    return `${getApiBase()}/download/${filename}`;
  }
};