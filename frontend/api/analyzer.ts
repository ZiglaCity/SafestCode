import { generatePrompt } from "../src/utils/generatePrompt";

type AnalyzerProps = {
  code: string;
  language: string;
  mode: string;
};

type GeminiResponse = {
  candidates?: {
    content?: {
      parts?: { text?: string }[];
    };
  }[];
};

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
console.log("API: ", apiKey);

if (!apiKey) {
  throw new Error("VITE_GEMINI_API_KEY is not defined.");
}

export async function Analyzer({ code, language, mode }: AnalyzerProps) {
  console.log("Analyzer triggered...");
  console.log({ code, language, mode });

  const prompt = generatePrompt({ code, language, mode });
  console.log("Prompt generated:", prompt);

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [{ parts: [{ text: prompt }] }],
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = (await response.json()) as GeminiResponse;
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.warn("No text returned from Gemini.");
      return {
        success: false,
        error: "No response content received from Gemini.",
      };
    }

    console.log("Gemini response received:", text);

    return {
      success: true,
      data: text,
      source: "gemini",
    };
  } catch (error: any) {
    console.error(" Gemini call failed:", error.message || error);
    return {
      success: false,
      error: "Gemini API call failed. Please try again.",
    };
  }
}
