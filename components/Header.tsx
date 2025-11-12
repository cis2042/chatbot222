
import React from 'react';
import { AppMode } from '../types';
import ChatIcon from './icons/ChatIcon';
import PlantIcon from './icons/PlantIcon';

interface HeaderProps {
  activeMode: AppMode;
  onSetMode: (mode: AppMode) => void;
}

const Header: React.FC<HeaderProps> = ({ activeMode, onSetMode }) => {
  const getButtonClasses = (mode: AppMode) => {
    const baseClasses = "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-green-400";
    if (activeMode === mode) {
      return `${baseClasses} bg-green-600 text-white shadow-md`;
    }
    return `${baseClasses} bg-gray-700 hover:bg-gray-600`;
  };

  return (
    <header className="bg-gray-800 shadow-lg sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-green-400">
          Gemini Assistant
        </h1>
        <nav className="flex items-center gap-2 md:gap-4 p-1 bg-gray-900 rounded-xl">
          <button
            onClick={() => onSetMode(AppMode.Chat)}
            className={getButtonClasses(AppMode.Chat)}
            aria-pressed={activeMode === AppMode.Chat}
          >
            <ChatIcon className="w-5 h-5" />
            <span className="hidden sm:inline">Chat</span>
          </button>
          <button
            onClick={() => onSetMode(AppMode.Garden)}
            className={getButtonClasses(AppMode.Garden)}
            aria-pressed={activeMode === AppMode.Garden}
          >
            <PlantIcon className="w-5 h-5" />
            <span className="hidden sm:inline">Gardening</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
