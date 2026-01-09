import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 1024,
  },
});

export default function useGeminiChat() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    setLoading(true);
    try {
      const result = await model.generateContent(message);
      const text = result.response.text();
      setResponse(text);
    } catch (error) {
      console.error("Gemini Error:", error);
      setResponse("Something went wrong 😢");
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, response, loading };
}
