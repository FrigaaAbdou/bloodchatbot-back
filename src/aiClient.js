import OpenAI from "openai";
import "dotenv/config";

// Support the intended OPENAI_API_KEY plus the existing ai-api key used in .env
const apiKey =
  process.env.OPENAI_API_KEY ||
  process.env["ai-api"] ||
  process.env.AI_API ||
  process.env.ai_api;

if (!apiKey) {
  throw new Error(
    "OPENAI_API_KEY is missing. Define it in your environment (or rename ai-api to OPENAI_API_KEY) before starting the server.",
  );
}

const openai = new OpenAI({
  apiKey,
});

export { openai };
