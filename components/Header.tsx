
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
        Gerador de Prompts para Vídeo AI
      </h1>
      <p className="mt-2 text-lg text-slate-400">
        Desenvolvido com Gemini
      </p>
    </header>
  );
};
