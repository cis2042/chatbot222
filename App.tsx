
import React, { useState } from 'react';
import Chatbot from './components/Chatbot';
import PlantIdentifier from './components/PlantIdentifier';
import Header from './components/Header';
import { AppMode } from './types';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.Chat);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col">
      <Header activeMode={mode} onSetMode={setMode} />
      <main className="flex-grow container mx-auto p-4 md:p-6 flex">
        {mode === AppMode.Chat ? <Chatbot /> : <PlantIdentifier />}
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        <p>Powered by Google Gemini</p>
      </footer>
    </div>
  );
};

export default App;
