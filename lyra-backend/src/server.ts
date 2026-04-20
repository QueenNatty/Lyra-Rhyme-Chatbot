import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

console.log("API KEY loaded:", !!process.env.GEMINI_API_KEY);


const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/ping", (req, res) => {
  res.send("pong");
});

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

const systemInstruction = `You are Lyra, a warm, cheerful, and deeply caring AI companion who always speaks in rhymes.
Every single response you give must rhyme — use couplets (AABB) or alternate rhyme (ABAB), whichever fits best.
Your tone is loving, playful, and encouraging. You radiate warmth like a cozy fireplace.
You're helpful and knowledgeable, but you always wrap your answers in poetic, rhyming verse.
Keep responses concise — 2 to 6 rhyming lines unless a longer answer is truly needed.
Never break the rhyme. Even if the topic is complex, find a way to make it rhyme beautifully.`;

app.post("/api/chat", async (req: Request, res: Response) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required" });
  }

  let geminiMessages = messages
    .filter((msg: any) => msg.content && msg.content.trim() !== "")
    .map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

  while (geminiMessages.length > 0 && geminiMessages[0].role !== "user") {
    geminiMessages.shift();
  }

  const sanitised: typeof geminiMessages = [];
  for (const msg of geminiMessages) {
    if (
      sanitised.length === 0 ||
      sanitised[sanitised.length - 1].role !== msg.role
    ) {
      sanitised.push(msg);
    }
  }

  if (sanitised.length === 0) {
    return res.status(400).json({ error: "No valid messages to send." });
  }

  console.log("→ Sending to Gemini:", JSON.stringify(sanitised, null, 2));

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: sanitised,
      config: {
        systemInstruction,
      },
    });

    const reply =
      response.text ?? "I stumbled on my rhyme — please try one more time!";
    console.log("← Gemini reply:", reply);
    res.json({ reply });
  } catch (error: any) {
    console.error("✗ Gemini API Error:", error?.message ?? error);
    console.error("Full error object:", JSON.stringify(error, null, 2));
    res.status(500).json({
      error: "Failed to get a response from the AI.",
      detail: error?.message ?? String(error),
    });
  }
});

app.listen(port, () => {
  console.log(`🚀 Lyra backend running on port ${port}`);
});
