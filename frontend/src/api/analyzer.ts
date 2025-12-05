import { generatePrompt } from '../utils/generatePrompt';

type AnalyzerProps = {
  code: string;
  language: string;
  mode: string;
};

type GeminiResponse = {
  candidates?: {
    content?: {
      parts?: {
        text?: string;
      }[];
    };
  }[];
};

type AnalyzerResult = {
  success: boolean;
  data?: string;
  error?: string;
  source?: string;
};

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('VITE_GEMINI_API_KEY is not defined.');
}

export async function Analyzer({
  code,
  language,
  mode,
}: AnalyzerProps): Promise<AnalyzerResult> {
  const prompt = generatePrompt({ code, language, mode });

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [{ parts: [{ text: prompt }] }],
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `Gemini API returned status ${response.status}`,
      };
    }

    const data = (await response.json()) as GeminiResponse;

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!text) {
      console.warn('Gemini returned no content.');
      return {
        success: false,
        error: 'No response content received from Gemini.',
      };
    }

    let parsed: any;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = text;
    }

    console.log('Gemini response:', parsed);

    return {
      success: true,
      data: text,
      source: 'gemini',
    };
  } catch (error: any) {
    console.error('Gemini call failed:', error.message || error);
    return {
      success: false,
      error: 'Gemini API call failed. Please try again.',
    };
  }
}
