
import React, { useState, type FC } from 'react';
import { GoogleGenAI } from '@google/genai';

interface AIGenerateButtonProps {
  prompt: string;
  onComplete: (text: string) => void;
  className?: string;
}

const AIGenerateButton: FC<AIGenerateButtonProps> = ({ prompt, onComplete, className }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    if (!prompt) return;
    setIsLoading(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      onComplete(response.text);
    } catch (err) {
      console.error("AI Generation Error:", err);
      setError("Failed to generate text. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={className}>
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 text-sm py-2 px-4 bg-purple-600/50 text-white rounded-lg hover:bg-purple-600/80 transition-all border border-purple-500 disabled:opacity-50 disabled:cursor-wait"
      >
        {isLoading ? (
          <>
            <svg className="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            Generate with AI
          </>
        )}
      </button>
      {error && <p className="text-xs text-red-400 mt-1 text-center">{error}</p>}
    </div>
  );
};

export default AIGenerateButton;
