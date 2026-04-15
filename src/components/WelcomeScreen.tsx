import React from "react";

const SUGGESTIONS = [
  "Tell me a fun fact 🌟",
  "How do I learn to code? 💻",
  "Give me a motivational quote 💛",
  "What's the meaning of life? 🌸",
];

interface WelcomeScreenProps {
  onSuggestion: (text: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onSuggestion,
}) => {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        gap: "24px",
      }}
    >
      <div
        style={{
          width: "88px",
          height: "88px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #fde8d0, #f5c9a0, #e8957a)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "44px",
          boxShadow: "0 8px 32px rgba(180,80,50,0.2)",
          border: "3px solid rgba(255,255,255,0.8)",
        }}
      >
        🌸
      </div>

      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            fontFamily: "'Lora', serif",
            fontSize: "28px",
            fontWeight: "600",
            color: "#3d2b1f",
            marginBottom: "8px",
          }}
        >
          Hello, I'm Lyra!
        </h1>
        <p
          style={{
            fontFamily: "'Lora', serif",
            fontSize: "16px",
            fontStyle: "italic",
            color: "#8b6355",
            lineHeight: "1.7",
            maxWidth: "300px",
          }}
        >
          I speak only in rhyme, every time,
          <br />
          Ask me anything — it'll be sublime! ✨
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
          maxWidth: "400px",
        }}
      >
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onSuggestion(s)}
            style={{
              padding: "9px 16px",
              borderRadius: "20px",
              border: "1.5px solid #f5c9a0",
              background: "#fffaf4",
              color: "#8b6355",
              fontSize: "13px",
              fontFamily: "'Nunito', sans-serif",
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: "0 2px 8px rgba(180,100,60,0.07)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#fde8d0";
              e.currentTarget.style.borderColor = "#e8957a";
              e.currentTarget.style.color = "#c96b52";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#fffaf4";
              e.currentTarget.style.borderColor = "#f5c9a0";
              e.currentTarget.style.color = "#8b6355";
            }}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};
