import React, { useState } from 'react';

interface ThemeInputProps {
  onGenerate: (theme: string) => void;
  isLoading: boolean;
}

const exampleThemes = [
  "Um astronauta descobrindo um oásis alienígena brilhante",
  "Um detetive neon-noir em uma cidade chuvosa do futuro",
  "Uma floresta mágica com animais feitos de luz estelar",
  "Corrida de carros voadores por cânions de Marte"
];

export const ThemeInput: React.FC<ThemeInputProps> = ({ onGenerate, isLoading }) => {
  const [theme, setTheme] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(theme);
  };

  const handleExampleClick = (example: string) => {
    setTheme(example);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <div className="relative">
        <textarea
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="Ex: Uma cidade futurista em Marte ao entardecer"
          className="w-full h-28 p-4 bg-slate-800 border-2 border-slate-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-colors resize-none disabled:opacity-50"
          disabled={isLoading}
          aria-label="Tema para o vídeo"
        />
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-slate-400 mb-2">Sem ideias? Tente um destes temas:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {exampleThemes.map((example, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleExampleClick(example)}
              className="px-3 py-1 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-full text-xs text-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || !theme.trim()}
        className="mt-6 w-full bg-sky-600 hover:bg-sky-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center"
        aria-live="polite"
      >
        {isLoading ? 'Gerando...' : 'Gerar Prompts'}
      </button>
    </form>
  );
};