import React from "react";

export const TypingIndicator: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "10px",
        marginBottom: "16px",
      }}
    >
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
        }}
      >
        🌸
      </div>
      <div
        style={{
          padding: "14px 18px",
          borderRadius: "20px 20px 20px 4px",
          background: "#fffaf4",
          border: "1px solid #f5dece",
          boxShadow: "0 2px 12px rgba(180,100,60,0.1)",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#e8957a",
              animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
