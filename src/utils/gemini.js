/**
 * Google Gemini API integration (FIXED)
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

// ✅ Using gemini-1.5-flash for better free tier support
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// Log API key status (safe)
console.log(
  "Gemini API Key Status:",
  GEMINI_API_KEY ? "✓ Loaded" : "✗ Missing"
);

export async function sendMessageToGemini(message) {
  if (!GEMINI_API_KEY.trim()) {
    throw new Error(
      "Gemini API key missing. Set VITE_GEMINI_API_KEY and restart the server."
    );
  }

  try {
    const systemInstruction = `You are Kenkoo AI, a knowledgeable and empathetic healthcare assistant.

Guidelines:
- Explain prescriptions and medical terms in simple language
- Be detailed but easy to understand
- Use bullet points when helpful
- Always add a medical disclaimer
- Encourage consulting a qualified doctor
- Be calm, empathetic, and clear

Important:
You are NOT a doctor. Information is educational only.`;

    // Gemini 1.5 does NOT have a separate system role → prepend context
    const finalPrompt = `${systemInstruction}

User question:
${message}`;

    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [{ text: finalPrompt }],
        },
      ],
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

      // Handle quota exceeded errors with helpful message
      if (
        errorMessage.includes("quota") ||
        errorMessage.includes("Quota exceeded") ||
        response.status === 429
      ) {
        throw new Error(
          "API quota exceeded. Please check your Google AI Studio quota limits. " +
            "You may need to wait a moment or upgrade your plan. " +
            "Visit: https://aistudio.google.com/app/apikey"
        );
      }

      // Handle authentication errors
      if (response.status === 401 || response.status === 403) {
        throw new Error(
          "Invalid API key. Please check your VITE_GEMINI_API_KEY in .env file and ensure it's correct."
        );
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("Empty response from Gemini API");
    }

    return text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
