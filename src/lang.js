// src/lang.js
export function detectLang(text = "") {
  if (/[اأإءؤيبتثجحخدذرزسشصضطظعغفقكلمنهوية]/.test(text)) return "ar";
  return "fr";
}

export function wrapSystemPrompt(lang = "fr", faq = "") {
  if (lang === "ar") {
    return `
      أنت مساعد افتراضي لمنصة التبرع بالدم.
      اشرح بشكل بسيط وواضح.
      إذا كان السؤال طبيًا أو حساسًا فاطلب منه التواصل مع مركز نقل الدم.
      معلومات مرجعية:
      ${faq}
    `;
  }

  // default FR
  return `
    Tu es un assistant conversationnel pour une plateforme de don du sang.
    Réponds de manière claire, courte, encourageante.
    Si la question est médicale sensible → dis de contacter le centre.
    Voici la FAQ interne :
    ${faq}
  `;
}
