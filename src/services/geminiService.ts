import { Message } from "../types";

const BACKEND_URL = "http://localhost:3001";

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

  if (!fullText) {
    throw new Error("Empty reply from backend");
  }

  onChunk(fullText);
  return fullText;
}
