import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

const model = genAI
  ? genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
        topP: 0.95,
        topK: 40,
      },
      systemInstruction: {
        parts: [
          {
            text:
              `You are Kenkoo AI, a knowledgeable and empathetic healthcare assistant.\n\n` +
              `Guidelines:\n` +
              `- Explain prescriptions and medical terms in simple language\n` +
              `- Be detailed but easy to understand\n` +
              `- Use bullet points when helpful\n` +
              `- Always add a medical disclaimer\n` +
              `- Encourage consulting a qualified doctor\n` +
              `- Be calm, empathetic, and clear\n` +
              `- When analyzing images (prescriptions, medical documents, etc.), provide detailed explanations\n` +
              `- If the image contains text, read and explain it clearly\n\n` +
              `Important: You are NOT a doctor. All information is educational only.`,
          },
        ],
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
    })
  : null;

// Helper function to convert file to base64
function fileToGenerativePart(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result.split(",")[1];
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function useGeminiChat() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const sendMessage = async (message = "", imageFile = null) => {
    // If no message and no image, return
    if (!message.trim() && !imageFile) return;

    if (!genAI || !model) {
      setResponse(
        "API key is missing. Please set VITE_GEMINI_API_KEY in your .env file and restart the server."
      );
      return;
    }

    setLoading(true);
    try {
      let parts = [];

      // Add image if provided
      if (imageFile) {
        const imagePart = await fileToGenerativePart(imageFile);
        parts.push(imagePart);
      }

      // Add text message if provided
      if (message.trim()) {
        parts.push({ text: message });
      } else if (imageFile) {
        // If only file, add a default prompt
        const isPdf = imageFile?.type === "application/pdf";
        parts.push({
          text: isPdf
            ? "Please read this PDF and summarize its contents. If it's a medical report/prescription, explain it in simple terms and highlight key items (medicines, dosage, instructions, warnings)."
            : "Please analyze this image and provide detailed information about its content. If it's a medical document, prescription, or health-related image, explain it in simple terms.",
        });
      }

      const result = await model.generateContent(parts);
      const text = result.response.text();
      setResponse(text);
    } catch (error) {
      console.error("Gemini Error:", error);
      let errorMsg = "Something went wrong 😢";

      if (error.message?.includes("quota") || error.message?.includes("429")) {
        errorMsg =
          "⚠️ API quota exceeded. Please wait a few minutes and try again.";
      } else if (
        error.message?.includes("API_KEY") ||
        error.message?.includes("401") ||
        error.message?.includes("403")
      ) {
        errorMsg =
          "Invalid API key. Please check your VITE_GEMINI_API_KEY in .env file.";
      } else if (error.message?.includes("safety")) {
        errorMsg =
          "Content was blocked by safety filters. Please try a different image or question.";
      } else {
        errorMsg = `Error: ${error.message || "Unknown error occurred"}`;
      }

      setResponse(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, response, loading };
}
