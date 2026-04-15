import React, { useState, useRef, useEffect } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!disabled && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [disabled]);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = Math.min(ta.scrollHeight, 120) + "px";
    }
  };

  return (
    <div
      style={{
        padding: "16px 20px 20px",
        background: "#fffaf4",
        borderTop: "1px solid #f5dece",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "12px",
          background: "#fff",
          border: "2px solid #f5c9a0",
          borderRadius: "16px",
          padding: "10px 14px",
          boxShadow: "0 2px 16px rgba(180,100,60,0.08)",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
        onFocusCapture={(e) => {
          e.currentTarget.style.borderColor = "#e8957a";
          e.currentTarget.style.boxShadow = "0 2px 20px rgba(180,100,60,0.15)";
        }}
        onBlurCapture={(e) => {
          e.currentTarget.style.borderColor = "#f5c9a0";
          e.currentTarget.style.boxShadow = "0 2px 16px rgba(180,100,60,0.08)";
        }}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          disabled={disabled}
          placeholder="Say something to Lyra…"
          rows={1}
          style={{
            flex: 1,
            resize: "none",
            border: "none",
            outline: "none",
            background: "transparent",
            fontFamily: "'Nunito', sans-serif",
            fontSize: "15px",
            color: "#3d2b1f",
            lineHeight: "1.5",
            overflowY: "auto",
            maxHeight: "120px",
          }}
        />
        <button
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "10px",
            border: "none",
            background:
              disabled || !value.trim()
                ? "#f5dece"
                : "linear-gradient(135deg, #e8957a, #c96b52)",
            color: disabled || !value.trim() ? "#c8a898" : "#fff",
            fontSize: "18px",
            cursor: disabled || !value.trim() ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.2s",
            boxShadow:
              disabled || !value.trim()
                ? "none"
                : "0 3px 10px rgba(180,80,50,0.3)",
          }}
        >
          ↑
        </button>
      </div>
      <div
        style={{
          textAlign: "center",
          fontSize: "11px",
          color: "#c8a898",
          marginTop: "8px",
          fontStyle: "italic",
        }}
      >
        Press Enter to send · Shift+Enter for new line
      </div>
    </div>
  );
};
