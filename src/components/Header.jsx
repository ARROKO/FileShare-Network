import React from 'react';
import { Share, Server } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-blue-600">
            <Server className="h-8 w-8" />
            <Share className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">FileShare Network</h1>
            <p className="text-sm text-gray-600">Partagez vos fichiers en toute simplicité</p>
          </div>
        </div>
      </div>
    </header>
  );
};