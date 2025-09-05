
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ThemeInput } from './components/ThemeInput';
import { PromptDisplay } from './components/PromptDisplay';
import { Loader } from './components/Loader';
import { generatePrompts } from './services/geminiService';
import type { GeneratedPrompts } from './types';

function App() {
  const [prompts, setPrompts] = useState<GeneratedPrompts | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (theme: string) => {
    if (!theme.trim()) {
      setError("Por favor, insira um tema para gerar os prompts.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setPrompts(null);

    try {
      const result = await generatePrompts(theme);
      setPrompts(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? `Erro ao gerar prompts: ${err.message}` : "Ocorreu um erro desconhecido.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <Header />
        <main className="mt-8">
          <p className="text-center text-slate-400 mb-6">
            Insira um tema abaixo e a IA irá gerar um prompt detalhado em português para sua análise, uma versão em inglês para usar em geradores de vídeo e uma estrutura JSON para automações.
          </p>
          <ThemeInput onGenerate={handleGenerate} isLoading={isLoading} />
          
          {error && (
            <div className="mt-6 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">
              <p>{error}</p>
            </div>
          )}

          {isLoading && <Loader />}
          
          {prompts && !isLoading && (
            <div className="mt-8 animate-fade-in">
              <PromptDisplay prompts={prompts} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
