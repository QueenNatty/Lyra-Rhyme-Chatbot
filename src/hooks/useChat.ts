import { useState, useCallback } from "react";
import { Message, ChatState } from "../types";
import { sendMessage } from "../services/anthropic";

function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

export function useChat(): {
  state: ChatState;
  sendUserMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
} {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  });

  const sendUserMessage = useCallback(
    async (content: string) => {
      const userMessage: Message = {
        id: generateId(),
        role: "user",
        content,
        timestamp: new Date(),
      };

      const assistantId = generateId();
      const assistantMessage: Message = {
        id: assistantId,
        role: "assistant",
        content: "",
        timestamp: new Date(),
      };

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, userMessage, assistantMessage],
        isLoading: true,
        error: null,
      }));

      try {
        const updatedMessages = [...state.messages, userMessage];

        await sendMessage(updatedMessages, (chunk: string) => {
          setState((prev) => ({
            ...prev,
            messages: prev.messages.map((m) =>
              m.id === assistantId ? { ...m, content: m.content + chunk } : m,
            ),
          }));
        });

        setState((prev) => ({ ...prev, isLoading: false }));
      } catch (err) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: "Something went wrong. Please try again.",
          messages: prev.messages.filter((m) => m.id !== assistantId),
        }));
      }
    },
    [state.messages],
  );

  const clearMessages = useCallback(() => {
    setState({ messages: [], isLoading: false, error: null });
  }, []);

  return { state, sendUserMessage, clearMessages };
}
