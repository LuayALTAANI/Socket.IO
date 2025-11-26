const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const connectDB = require("./mongo");
const Message = require("./model/message");


const app = express();
app.use(cors());
app.use(express.json());
connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  socket.on("join", (username) => {
    socket.data.username = username;
    console.log(`${username} joined the chat`);
    io.emit("chat_message", {
      username: "System",
      text: `${username} joined the chat`,
      time: new Date().toISOString(),
    });
  });

  socket.on("chat_message", (msg) => {
    const username = socket.data.username || "Anonymous";
     try {
      console.log(`Saving message from ${username}: ${msg}`);
      Message.create({ 
          username,
          text: msg
        });
      io.emit("chat_message", {
        username,
        text: msg,
      });
    } catch (err) {
      console.error("Failed to save message:", err);
    }
  });

  socket.on("disconnect", () => {
    const username = socket.data.username || "Someone";
    console.log("user disconnected:", socket.id);
    io.emit("chat_message", {
      username: "System",
      text: `${username} left the chat`,
      time: new Date().toISOString(),
    });
  });
});


//database server
app.get("/messages", async (req, res) => {
  try {
    const messages = await Message
    .find({})
    .sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json(
      { error: "Failed to fetch messages" }
    );}
});


const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
