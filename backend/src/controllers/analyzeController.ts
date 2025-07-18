import { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

import { generatePrompt } from "../utils/generatePrompt";

const ENGINE_1 = process.env.ENGINE_1_URL!;
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY!;

export async function Analyzer(req: Request, res: Response) {
  console.log("Analyzer triggered...");

  const { code, language, mode } = req.body;
  console.log(code, language, mode, ".... ");
  if (!code || !language || !mode) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: code, language, mode",
    });
  }

  const prompt = generatePrompt({ code, language, mode });
  console.log(prompt);
  const requestBodyGemini = {
    contents: [{ parts: [{ text: prompt }] }],
  };

  const requestBodyDeepseek = {
    model: "deepseek-coder",
    messages: [{ role: "user", content: prompt }],
  };

  try {
    const response = await axios.post(ENGINE_1, requestBodyGemini, {
      headers: { "Content-Type": "application/json" },
    });

    type GeminiResponse = {
      candidates?: {
        content?: {
          parts?: { text?: string }[];
        };
      }[];
    };

    if (response.status >= 200 && response.status < 300) {
      const data = response.data as GeminiResponse;
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        console.error("No text found in Gemini response.");
        return res.status(500).json({ error: "No response content received." });
      }

      console.log(" Gemini response received", response.data);
      return res.status(200).json({
        success: true,
        data: response.data,
        code: text,
        source: "gemini",
      });
    }

    throw new Error("Gemini failed with non-success status");
  } catch (error) {
    console.warn(" Gemini failed. Attempting DeepSeek...");

    // try {
    //   const fallback = await axios.post(
    //     "https://api.deepseek.com/chat/completions",
    //     requestBodyDeepseek,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
    //       },
    //     }
    //   );

    //   console.log(" DeepSeek fallback succeeded");
    //   return res.status(200).json({
    //     success: true,
    //     data: fallback.data,
    //     source: "deepseek",
    //   });
    // } catch (fallbackErr) {
    //   console.error(" Both engines failed:", fallbackErr);
    //   return res.status(500).json({
    //     success: false,
    //     message: "Both AI engines failed to process the request.",
    //     fallbackErr,
    //   });
    // }
  }
}
