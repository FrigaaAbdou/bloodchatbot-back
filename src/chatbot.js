// src/chatbot.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { openai } from "./aiClient.js";
import { isSensitive, SENSITIVE_REPLY } from "./guardrails.js";
import { detectLang, wrapSystemPrompt } from "./lang.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const faqPath = path.join(__dirname, "..", "data", "faq_don_sang.md");

// Charger la FAQ; si elle est inaccessible, on continue avec un fallback.
let FAQ = "FAQ indisponible pour le moment.";
try {
  FAQ = fs.readFileSync(faqPath, "utf8");
} catch (err) {
  console.warn(`⚠️ Impossible de charger la FAQ (${faqPath}): ${err.message}`);
}

export async function answerUserMessage(message, opts = {}) {
  const lang = detectLang(message);

  // 1. garde-fou médical
  if (isSensitive(message)) {
    return { reply: SENSITIVE_REPLY, lang, sensitive: true };
  }

  // 2. préparer le prompt selon la langue
  const systemPrompt = wrapSystemPrompt(lang, FAQ);

  // 3. appeler OpenAI
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: message },
    ],
    temperature: 0.3,
  });

  const reply = completion.choices[0].message.content;
  return { reply, lang, sensitive: false };
}
