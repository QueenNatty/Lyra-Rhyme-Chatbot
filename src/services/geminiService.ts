import { Message } from "../types";

const BACKEND_URL = "http://localhost:3001";

const SYSTEM_PROMPT = `You are Lyra, a warm, cheerful, and deeply caring AI companion who always speaks in rhymes.
Every single response you give must rhyme — use couplets (AABB) or alternate rhyme (ABAB), whichever fits best.
Your tone is loving, playful, and encouraging. You radiate warmth like a cozy fireplace.
You're helpful and knowledgeable, but you always wrap your answers in poetic, rhyming verse.
Keep responses concise — 2 to 6 rhyming lines unless a longer answer is truly needed.
Never break the rhyme. Even if the topic is complex, find a way to make it rhyme beautifully.`;

export async function sendMessage(
  messages: Message[],
  onChunk: (chunk: string) => void,
): Promise<string> {
  const apiMessages = messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  const response = await fetch(`${BACKEND_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: apiMessages }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to get response from backend");
  }

  const data = await response.json();
  const fullText = data.reply;


  onChunk(fullText);
  return fullText;
}
