import React from "react";

interface ChatHeaderProps {
  onClear: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onClear }) => {
  return (
    <header
      style={{
        background:
          "linear-gradient(135deg, #e8957a 0%, #d4845a 50%, #c96b52 100%)",
        padding: "18px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 4px 20px rgba(180,80,50,0.25)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-20px",
          right: "80px",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-30px",
          right: "20px",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.06)",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.25)",
            border: "2px solid rgba(255,255,255,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          🌸
        </div>
        <div>
          <div
            style={{
              fontFamily: "'Lora', serif",
              fontSize: "20px",
              fontWeight: "600",
              color: "#fff",
              letterSpacing: "0.3px",
            }}
          >
            Lyra
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.8)",
              fontStyle: "italic",
              fontFamily: "'Lora', serif",
            }}
          >
            your rhyming companion ✨
          </div>
        </div>
      </div>

      <button
        onClick={onClear}
        title="Clear chat"
        style={{
          zIndex: 1,
          background: "rgba(255,255,255,0.2)",
          border: "1px solid rgba(255,255,255,0.3)",
          borderRadius: "8px",
          color: "#fff",
          padding: "6px 14px",
          fontSize: "12px",
          cursor: "pointer",
          fontFamily: "'Nunito', sans-serif",
          letterSpacing: "0.5px",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(255,255,255,0.3)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "rgba(255,255,255,0.2)")
        }
      >
        New Chat
      </button>
    </header>
  );
};
