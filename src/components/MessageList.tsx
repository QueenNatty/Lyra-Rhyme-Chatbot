import React, { useEffect, useRef } from "react";
import { Message } from "../types";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { WelcomeScreen } from "./WelcomeScreen";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  onSuggestion: (text: string) => void;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  isLoading,
  onSuggestion,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const lastMsg = messages[messages.length - 1];
  const isStreamingLast =
    isLoading && lastMsg?.role === "assistant" && lastMsg?.content.length > 0;
  const showTyping = isLoading && (!lastMsg || lastMsg.role === "user");

  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(180deg, #fdf6ee 0%, #fef9f4 100%)",
      }}
    >
      {messages.length === 0 ? (
        <WelcomeScreen onSuggestion={onSuggestion} />
      ) : (
        <div style={{ padding: "20px 20px 8px" }}>
          {messages.map((msg, i) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isStreaming={isStreamingLast && i === messages.length - 1}
            />
          ))}
          {showTyping && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
};
