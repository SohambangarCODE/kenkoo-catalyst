import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("VITE_GEMINI_API_KEY is missing");
}

const genAI = new GoogleGenerativeAI(API_KEY);

// ✅ Stable + supported model (SDK-only)
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash", // Latest & most intelligent Flash model
});

export async function sendMessageToGemini(message, history = [], systemPrompt) {
  const chat = model.startChat({
    history: [
      ...(systemPrompt ? [systemPrompt] : []),
      ...history.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      })),
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2048,
      topP: 0.95,
      topK: 40,
    },
  });

  const result = await chat.sendMessage(message);
  return result.response.text();
}
