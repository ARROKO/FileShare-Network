import React from 'react';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { FileList } from './components/FileList';
import { Stats } from './components/Stats';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { useFiles } from './hooks/useFiles';

function App() {
  const { files, loading, error, refetch, handleFileUploaded, handleFileDeleted } = useFiles();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Section Upload */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Ajouter un fichier</h2>
            <FileUpload onFileUploaded={handleFileUploaded} />
          </section>

          {/* Section Statistiques */}
          {!loading && !error && <Stats files={files} />}

          {/* Section Liste des fichiers */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Fichiers partagés</h2>
              {!loading && !error && files.length > 0 && (
                <button
                  onClick={refetch}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Actualiser
                </button>
              )}
            </div>
            
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <ErrorMessage message={error} onRetry={refetch} />
            ) : (
              <FileList files={files} onFileDeleted={handleFileDeleted} />
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;