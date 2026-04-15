import Anthropic from "@anthropic-ai/sdk";
import { Message } from "../types";

const client = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true,
});

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

  const stream = await client.messages.stream({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: apiMessages,
  });

  let fullText = "";
  for await (const chunk of stream) {
    if (
      chunk.type === "content_block_delta" &&
      chunk.delta.type === "text_delta"
    ) {
      fullText += chunk.delta.text;
      onChunk(chunk.delta.text);
    }
  }

  return fullText;
}
