import { Request, Response } from "express";
import axios from "axios";
const ENGINE_1 = process.env.ENGINE_1_URL as string;

export default async function Analylzer(req: Request, res: Response) {
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

  try {
    const response = await axios.post(ENGINE_1, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {}
}
