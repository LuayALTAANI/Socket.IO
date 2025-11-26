import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// Connect to the Socket.IO server
const socket = io("http://localhost:4000");

function App() {
  // UseState variables
  const [username, setUsername] = useState(""); //store username
  const [isJoined, setIsJoined] = useState(false); //track if user has joined
  const [message, setMessage] = useState(""); //store current message input
  const [messages, setMessages] = useState([]); //store all chat messages since joining

  //useEffect to handle incoming chat messages
  useEffect(() => {
    // Listen for chat messages from server
    socket.on("chat_message", (data) => {
      // Append new message to messages array
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      // Cleanup listener on component unmount
      socket.off("chat_message");
    };
  }, []);

  // Function to handle user joining the chat
  const handleJoin = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    // Emit join event to server with username
    socket.emit("join", username.trim());

    // Fetch existing messages from server
    fetch("http://localhost:4000/messages")
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((err) => {
        console.error("Failed to fetch messages:", err);
      });

    setIsJoined(true);
  };

  // Function to handle sending a chat message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit("chat_message", message.trim());
    setMessage("");
  };

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#e5ddd5",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          background: "#ffffff",
          borderRadius: "16px",
          padding: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          height: "80vh",
        }}
      >
        {!isJoined ? (
          <form
            onSubmit={handleJoin}
            style={{
              margin: "auto",
              width: "100%",
              maxWidth: "400px",
              textAlign: "center",
            }}
          >
            <h2 style={{ marginBottom: "16px" }}>Welcome to Public Chat</h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "1rem",
              }}
            />
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                background: "#128c7e",
                color: "white",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Join Chat
            </button>
          </form>
        ) : (
          <>
            <header
              style={{
                paddingBottom: "8px",
                borderBottom: "1px solid #ddd",
                marginBottom: "8px",
              }}
            >
              <h2 style={{ margin: 0 }}>Public Chat</h2>
              <small style={{ color: "#555" }}>Logged in as: {username}</small>
            </header>

            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "12px",
                marginBottom: "8px",
                background: "#f0f0f0",
                borderRadius: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {messages.map((m, idx) => {
                const isMe = m.username === username;
                const isSystem = m.username === "System";

                if (isSystem) {
                  return (
                    <div
                      key={idx}
                      style={{
                        textAlign: "center",
                        fontSize: "0.85rem",
                        color: "#666",
                      }}
                    >
                      {m.text}
                    </div>
                  );
                }

                return (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent: isMe ? "flex-end" : "flex-start",
                    }}
                  >
                    <div
                      style={{
                        maxWidth: "75%",
                        padding: "10px 14px",
                        borderRadius: "18px",
                        background: isMe ? "#dcf8c6" : "#ffffff",
                        border: isMe ? "1px solid #b2e59c" : "1px solid #ddd",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                        wordBreak: "break-word",
                      }}
                    >
                      {!isMe && (
                        <div
                          style={{
                            fontWeight: "bold",
                            marginBottom: "4px",
                            fontSize: "0.85rem",
                            color: "#075e54",
                          }}
                        >
                          {m.username}
                        </div>
                      )}
                      <div style={{ fontSize: "0.95rem" }}>{m.text}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <form
              onSubmit={handleSendMessage}
              style={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
                marginTop: "4px",
              }}
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "20px",
                  border: "1px solid #ccc",
                  fontSize: "1rem",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "10px 16px",
                  borderRadius: "20px",
                  border: "none",
                  background: "#25d366",
                  color: "white",
                  fontSize: "1rem",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Send
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
