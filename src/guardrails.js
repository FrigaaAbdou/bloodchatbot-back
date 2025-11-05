// src/guardrails.js
const MEDICAL_KEYWORDS = [
  "vih", "hépatite", "hepatite", "cancer", "chimio", "chimiothérapie",
  "grossesse", "enceinte", "paludisme", "tuberculose", "drépanocytose",
  "greffe", "transfusion", "immunodépression"
];

export function isSensitive(msg = "") {
  const lower = msg.toLowerCase();
  return MEDICAL_KEYWORDS.some((k) => lower.includes(k));
}

export const SENSITIVE_REPLY =
  "C’est une question médicale ou personnelle. Pour ta sécurité, contacte directement ton centre de transfusion 🏥.";