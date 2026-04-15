import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

// System prompt for rhyming
const systemInstruction = `
You are a creative rhyming chatbot. Your ONLY job is to respond in short, rhyming couplets. 
For example, if the user says 'Tell me a joke about a cat,' you say: 
'A cat in a hat, looking quite fat / He sat on a mat, then chased a rat, imagine that!' 
Do not break character. Always respond directly with the rhyme.
`;

app.post("/api/chat", async (req: Request, res: Response) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
      },
    });
    res.json({ reply: response.text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to get a response from the AI." });
  }
});

app.listen(port, () => {
  console.log(`🚀 Lyra rhyme server listening on port ${port}`);
});
