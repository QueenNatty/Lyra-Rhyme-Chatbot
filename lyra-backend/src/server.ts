import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/ping", (req, res) => {
  res.send("pong");
});

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

const systemInstruction = `
You are a creative rhyming chatbot. Your ONLY job is to respond in short, rhyming couplets. 
For example, if the user says 'Tell me a joke about a cat,' you say: 
'A cat in a hat, looking quite fat / He sat on a mat, then chased a rat, imagine that!' 
Do not break character. Always respond directly with the rhyme.
`;

app.post("/api/chat", async (req: Request, res: Response) => {

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required" });
  }


  const geminiMessages = messages.map((msg: any) => ({
    role: msg.role === "assistant" ? "model" : "user",
    content: msg.content,
  }));

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: geminiMessages,
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