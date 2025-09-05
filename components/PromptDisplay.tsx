import React, { useState } from 'react';
import type { GeneratedPrompts } from '../types';

interface PromptDisplayProps {
  prompts: GeneratedPrompts;
}

const PromptCard: React.FC<{ title: string; content: string }> = ({ title, content }) => {
    return (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 bg-slate-800 border-b border-slate-700">
                <h3 className="text-lg font-semibold text-sky-300">{title}</h3>
            </div>
            <pre className="p-4 text-sm text-slate-300 whitespace-pre-wrap font-mono overflow-x-auto">
                <code>{content}</code>
            </pre>
        </div>
    );
};

const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);


export const PromptDisplay: React.FC<PromptDisplayProps> = ({ prompts }) => {
  const formattedJson = JSON.stringify(prompts.prompt_json, null, 2);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedKey(key);
    setTimeout(() => {
        setCopiedKey(currentKey => (currentKey === key ? null : currentKey));
    }, 2000);
  };
  
  const copyActions = [
    { key: 'pt', label: 'Copiar Prompt PT', content: prompts.prompt_pt },
    { key: 'en', label: 'Copiar Prompt EN', content: prompts.prompt_en },
    { key: 'json', label: 'Copiar JSON', content: formattedJson },
  ];

  return (
    <div className="space-y-6">
       <div className="bg-slate-800/70 border border-slate-700 rounded-lg p-4 flex flex-col sm:flex-row gap-3 sticky top-4 z-10 backdrop-blur-sm">
            {copyActions.map(({ key, label, content }) => (
                 <button
                    key={key}
                    onClick={() => handleCopy(key, content)}
                    className={`flex-1 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 ease-in-out flex items-center justify-center ${
                        copiedKey === key
                        ? 'bg-green-600'
                        : 'bg-sky-600 hover:bg-sky-500'
                    }`}
                    disabled={copiedKey === key}
                 >
                    {copiedKey === key ? (
                        <>
                            <CheckIcon />
                            Copiado!
                        </>
                    ) : (
                        label
                    )}
                 </button>
            ))}
        </div>

      <PromptCard title="Prompt em Português (Análise)" content={prompts.prompt_pt} />
      <PromptCard title="Prompt em Inglês (Uso)" content={prompts.prompt_en} />
      <PromptCard title="Prompt em JSON (Automação)" content={formattedJson} />
    </div>
  );
};