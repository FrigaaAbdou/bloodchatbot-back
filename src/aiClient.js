import OpenAI from "openai";
import "dotenv/config";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error(
    "OPENAI_API_KEY is missing. Define it in your environment before starting the server.",
  );
}

const openai = new OpenAI({
  apiKey,
});

export { openai };
