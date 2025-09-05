
import { GoogleGenAI, Type } from "@google/genai";
import type { GeneratedPrompts } from '../types';

if (!process.env.API_KEY) {
    throw new Error("A variável de ambiente API_KEY não está definida.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const promptSchema = {
  type: Type.OBJECT,
  properties: {
    prompt_pt: {
      type: Type.STRING,
      description: "Um prompt de vídeo extremamente detalhado em português do Brasil. Deve incluir estilo visual, atmosfera, descrições de cena, ângulos de câmera e movimentos, e detalhes de iluminação. Deve ser narrativo e evocativo."
    },
    prompt_en: {
      type: Type.STRING,
      description: "A tradução exata e fiel do 'prompt_pt' para o inglês."
    },
    prompt_json: {
      type: Type.OBJECT,
      description: "Uma estrutura JSON detalhada para automação da geração de vídeo (ex: VEO).",
      properties: {
        title: { 
          type: Type.STRING,
          description: "Um título curto e impactante para o vídeo." 
        },
        style: {
          type: Type.STRING,
          description: "O estilo visual geral do vídeo (ex: cinematográfico, 8-bit, aquarela, fotorrealista)."
        },
        scenes: {
          type: Type.ARRAY,
          description: "Uma lista de cenas que compõem o vídeo.",
          items: {
            type: Type.OBJECT,
            properties: {
              description: {
                type: Type.STRING,
                description: "Descrição detalhada do que acontece na cena."
              },
              camera_angle: {
                type: Type.STRING,
                description: "O ângulo da câmera (ex: close-up, plano geral, câmera baixa)."
              },
              lighting: {
                type: Type.STRING,
                description: "A iluminação da cena (ex: luz do entardecer, neon, sombrio)."
              },
              duration_seconds: {
                type: Type.NUMBER,
                description: "Duração aproximada da cena em segundos."
              }
            }
          }
        }
      }
    }
  }
};


export const generatePrompts = async (theme: string): Promise<GeneratedPrompts> => {
  const userPrompt = `
    Com base no seguinte tema, gere os prompts de vídeo conforme o schema JSON solicitado.
    O tema é: "${theme}"
    
    Instruções:
    1. Crie um prompt em português (prompt_pt) que seja rico, detalhado e inspirador.
    2. Traduza-o fielmente para o inglês (prompt_en).
    3. Estruture os detalhes do vídeo em um formato JSON (prompt_json) claro e útil para um sistema automatizado.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: promptSchema,
      },
    });

    const responseText = response.text.trim();
    if (!responseText) {
      throw new Error("A API retornou uma resposta vazia.");
    }
    
    // The response is already a JSON string conforming to the schema
    const parsedJson = JSON.parse(responseText);
    
    return parsedJson as GeneratedPrompts;

  } catch (error) {
    console.error("Erro na chamada da API Gemini:", error);
    throw new Error("Não foi possível comunicar com a API Gemini. Verifique o console para mais detalhes.");
  }
};
