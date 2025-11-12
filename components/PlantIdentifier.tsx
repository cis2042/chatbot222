
import React, { useState, useCallback, useRef } from 'react';
import { analyzePlant } from '../services/geminiService';
import Spinner from './icons/Spinner';

const PlantIdentifier: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if(file.size > 4 * 1024 * 1024) { // 4MB limit
          setError("File is too large. Please select an image under 4MB.");
          return;
      }
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setAnalysis('');
      setError('');
    }
  };

  const handleAnalyzeClick = useCallback(async () => {
    if (!imageFile) {
      setError('Please select an image first.');
      return;
    }
    setIsLoading(true);
    setError('');
    setAnalysis('');
    
    try {
      const result = await analyzePlant(imageFile);
      setAnalysis(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Analysis failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [imageFile]);
  
  const handleUploadClick = () => {
      fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
      <div className="w-full lg:w-1/2 flex flex-col items-center p-6 bg-gray-800 rounded-xl shadow-2xl">
        <h2 className="text-2xl font-bold text-green-400 mb-4">Identify Your Plant</h2>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <div 
          onClick={handleUploadClick}
          className="w-full h-64 border-2 border-dashed border-gray-500 rounded-lg flex flex-col justify-center items-center text-gray-400 hover:border-green-400 hover:text-green-400 transition-colors duration-200 cursor-pointer mb-4 bg-gray-900"
        >
          {previewUrl ? (
            <img src={previewUrl} alt="Plant preview" className="w-full h-full object-cover rounded-lg" />
          ) : (
            <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Click to upload an image</span>
            </>
          )}
        </div>
        
        {error && <p className="text-red-400 mb-4">{error}</p>}
        
        <button
          onClick={handleAnalyzeClick}
          disabled={!imageFile || isLoading}
          className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500"
        >
          {isLoading ? (
            <>
              <Spinner className="w-5 h-5 mr-2" />
              Analyzing...
            </>
          ) : (
            'Analyze Plant'
          )}
        </button>
      </div>

      <div className="w-full lg:w-1/2 min-h-[300px] bg-gray-800 rounded-xl shadow-2xl p-6">
        <h3 className="text-2xl font-bold text-green-400 mb-4">Analysis & Care Guide</h3>
        <div className="prose prose-invert prose-p:text-gray-300 prose-headings:text-green-300 max-w-none h-[calc(100vh-300px)] overflow-y-auto">
          {isLoading && <p className="text-gray-400">Identifying your plant and generating care instructions...</p>}
          {!isLoading && !analysis && <p className="text-gray-400">Upload an image and click "Analyze Plant" to see results here.</p>}
          {analysis && <div className="whitespace-pre-wrap font-sans">{analysis}</div>}
        </div>
      </div>
    </div>
  );
};

export default PlantIdentifier;
