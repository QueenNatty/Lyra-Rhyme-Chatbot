import React from "react";
import { Message } from "../types";

interface MessageBubbleProps {
  message: Message;
  isStreaming?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isStreaming,
}) => {
  const isUser = message.role === "user";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isUser ? "row-reverse" : "row",
        alignItems: "flex-end",
        gap: "10px",
        marginBottom: "16px",
        animation: "fadeSlideIn 0.3s ease-out",
      }}
    >
      {!isUser && (
        <div
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #f5c9a0, #e8957a)",
            border: "2px solid #fde8d0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            flexShrink: 0,
            boxShadow: "0 2px 8px rgba(180,80,50,0.15)",
          }}
        >
          🌸
        </div>
      )}

      <div
        style={{
          maxWidth: "72%",
          display: "flex",
          flexDirection: "column",
          alignItems: isUser ? "flex-end" : "flex-start",
          gap: "4px",
        }}
      >
        <div
          style={{
            padding: "12px 18px",
            borderRadius: isUser ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
            background: isUser
              ? "linear-gradient(135deg, #e8957a, #c96b52)"
              : "#fffaf4",
            color: isUser ? "#fff" : "#3d2b1f",
            fontSize: "15px",
            lineHeight: "1.65",
            fontFamily: isUser ? "'Nunito', sans-serif" : "'Lora', serif",
            fontStyle: isUser ? "normal" : "italic",
            boxShadow: isUser
              ? "0 4px 16px rgba(180,80,50,0.3)"
              : "0 2px 12px rgba(180,100,60,0.1)",
            border: isUser ? "none" : "1px solid #f5dece",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            position: "relative",
          }}
        >
          {message.content}
          {isStreaming && (
            <span
              style={{
                display: "inline-block",
                width: "8px",
                height: "16px",
                background: "#e8957a",
                borderRadius: "2px",
                marginLeft: "3px",
                verticalAlign: "text-bottom",
                animation: "blink 0.8s steps(1) infinite",
              }}
            />
          )}
        </div>

        <div
          style={{
            fontSize: "11px",
            color: "#b89080",
            paddingLeft: isUser ? "0" : "4px",
            paddingRight: isUser ? "4px" : "0",
          }}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
};
