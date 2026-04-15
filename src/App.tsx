import React from "react";
import { ChatHeader } from "./components/ChatHeader";
import { MessageList } from "./components/MessageList";
import { ChatInput } from "./components/ChatInput";
import { useChat } from "./hooks/useChat";
import "./styles/globals.css";

const App: React.FC = () => {
  const { state, sendUserMessage, clearMessages } = useChat();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        maxWidth: "700px",
        margin: "0 auto",
        boxShadow: "0 0 60px rgba(180,100,60,0.1)",
      }}
    >
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40%            { transform: translateY(-6px); }
        }
        textarea::placeholder { color: #c8a898; }
      `}</style>

      <ChatHeader onClear={clearMessages} />

      <MessageList
        messages={state.messages}
        isLoading={state.isLoading}
        onSuggestion={sendUserMessage}
      />

      {state.error && (
        <div
          style={{
            padding: "10px 20px",
            background: "#fff0ec",
            borderTop: "1px solid #f5c9a0",
            color: "#c96b52",
            fontSize: "13px",
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          {state.error}
        </div>
      )}

      <ChatInput onSend={sendUserMessage} disabled={state.isLoading} />
    </div>
  );
};

export default App;
