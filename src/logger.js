// src/logger.js
const conversations = []; // in-memory

export function logMessage({ userId = "anon", user, bot, lang }) {
  conversations.push({
    userId,
    user,
    bot,
    lang,
    at: new Date().toISOString(),
  });
}

export function getConversations() {
  return conversations;
}