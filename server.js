import express from "express";
import "dotenv/config";
import cors from "cors";
import { answerUserMessage } from "./src/chatbot.js";
import { logMessage, getConversations } from "./src/logger.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { message, userId = "anon" } = req.body;

  if (!message) {
    return res.status(400).json({ error: "message is required" });
  }

  try {
    const { reply, lang, sensitive } = await answerUserMessage(message);

    // log
    logMessage({ userId, user: message, bot: reply, lang });

    return res.json({ reply, lang, sensitive });
  } catch (err) {
    console.error("chat error:", err);
    return res.status(500).json({ error: "AI error" });
  }
});

// endpoint admin (juste pour toi)
app.get("/admin/conversations", (req, res) => {
  const convos = getConversations();
  return res.json(convos);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("✅ server running on http://localhost:" + PORT);
});