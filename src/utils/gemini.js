/**
 * Google Gemini API integration (Updated & Improved - January 2026)
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

// Current stable fast model with good free tier support
const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`; // ← Changed to v1beta

// Log API key status (safe - only shows presence, not the key itself)
console.log(
  "Gemini API Key Status:",
  GEMINI_API_KEY ? "✓ Loaded" : "✗ Missing",
);

// In-memory chat history (simple approach for single-user apps)
// For production/multi-user, store per session or user
let chatHistory = [];

/**
 * Send a message to Gemini and get response
 * @param {string} message - User input message
 * @returns {Promise<string>} - Gemini's response text
 */
export async function sendMessageToGemini(message) {
  if (!GEMINI_API_KEY.trim()) {
    throw new Error(
      "Gemini API key missing. Set VITE_GEMINI_API_KEY in .env and restart the server.",
    );
  }

  try {
    // Add user message to history
    chatHistory.push({
      role: "user",
      parts: [{ text: message }],
    });

    const requestBody = {
      contents: chatHistory,
      system_instruction: {
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
              `- Be calm, empathetic, and clear\n\n` +
              `Important: You are NOT a doctor. All information is educational only.`,
          },
        ],
      },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
        topP: 0.95,
        topK: 40,
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
    };

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage =
        errorData?.error?.message ||
        `HTTP ${response.status}: ${response.statusText}`;

      // Specific quota error handling
      if (
        errorMessage.includes("quota") ||
        errorMessage.includes("Quota exceeded") ||
        response.status === 429
      ) {
        throw new Error(
          "⚠️ API quota exceeded. Free tier has strict daily limits (~20–50 requests).\n\n" +
            "• Wait until tomorrow (resets at midnight Pacific Time)\n" +
            "• Or enable billing for much higher limits\n" +
            "Check usage: https://aistudio.google.com/app/usage",
        );
      }

      // Authentication errors
      if (response.status === 401 || response.status === 403) {
        throw new Error(
          "Invalid or unauthorized API key. Double-check VITE_GEMINI_API_KEY in your .env file.",
        );
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!text) {
      throw new Error("Empty or blocked response from Gemini API");
    }

    // Add assistant response to history for context in next turns
    chatHistory.push({
      role: "model",
      parts: [{ text }],
    });

    return text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error; // Let App.jsx handle displaying the error message
  }
}

/**
 * Clear chat history (call this when user goes back to home)
 */
export function clearChatHistory() {
  chatHistory = [];
}
