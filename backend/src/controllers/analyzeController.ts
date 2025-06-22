import { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
import { generatePrompt } from "../utils/generatePrompt";
const ENGINE_1 = process.env.ENGINE_1_URL as string;
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY as string;

export async function Analylzer(req: Request, res: Response) {
  console.log("Analyzer called...");
  const body = req.body;
  const prompt = generatePrompt(body);

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: `${prompt}`,
          },
        ],
      },
    ],
  };

  const requestBody_2 = {
    model: "deepseek-coder",
    messages: [{ role: "user", content: `${prompt}` }],
  };

  try {
    console.log(ENGINE_1);
    const response = await axios.post(ENGINE_1, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status >= 200 && response.status < 300) {
      console.log("Primary engine succeeded:", response.data);
      return res
        .status(200)
        .json({ success: true, data: response.data, source: "gemini" });
    } else {
      console.warn("Engine 1 responded, but not successful:", response.status);
      throw new Error("Non-successful response from Engine 1");
    }
  } catch (err) {
    console.error("Engine 1 failed:", err);
    // res.status(400).json({ success: false, err });

    try {
      const fallback = await axios.post(
        "https://api.deepseek.com/chat/completions",
        requestBody_2,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
          },
        }
      );

      console.log("Fallback engine succeeded:", fallback.data);
      return res.status(200).json({ data: fallback.data, source: "deepseek" });
    } catch (fallbackErr) {
      console.error("Fallback engine failed too:", fallbackErr);
      res.status(400).json({ success: false, fallbackErr });
    }
  }
}
