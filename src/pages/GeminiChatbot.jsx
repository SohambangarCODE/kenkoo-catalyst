// Features:
// - STT (voice input): Click 🎤 to start listening, auto-fills & sends to Gemini.
// - TTS (voice output): Auto-speaks AI responses.
// - Unified 🛑 Button: Stops listening (STT) & reading (TTS) in one click.
// - Auto-stop on close: Stops all voice when clicking ✕.
// - Browser support check (works best in Chrome).
// - Error handling & loading states.
// - Keeps your existing UI/styles/history.

import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { GoogleGenerativeAI } from "@google/generative-ai";

console.log(
  "API Key from import.meta.env:",
  import.meta.env.VITE_GEMINI_API_KEY ? "Loaded" : "Missing"
);

const GeminiChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false); // STT active
  const [isSpeaking, setIsSpeaking] = useState(false); // TTS active
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null); // Ref for STT instance

  // Speech APIs
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const SpeechSynthesis = window.speechSynthesis;
  const [hasSpeechSupport, setHasSpeechSupport] = useState(false);

  // Initialize Gemini AI with proper error handling
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === "") {
    console.error(
      "Gemini API key is missing. Please set VITE_GEMINI_API_KEY in your .env file."
    );
  }

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
      })
    : null;

  // Check speech support
  useEffect(() => {
    setHasSpeechSupport(!!SpeechRecognition && !!SpeechSynthesis);
  }, []);

  // Initialize STT
  useEffect(() => {
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = "en-US";
      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setPrompt(transcript);
        handleSubmit({ preventDefault: () => {} }); // Auto-submit
        setIsListening(false);
      };
      rec.onerror = (event) => {
        console.error("Speech error:", event.error);
        setIsListening(false);
      };
      recognitionRef.current = rec;
    }
  }, [chatHistory]); // Re-init if history changes (for context)

  // NEW: Unified stop function for STT & TTS
  const stopAllVoice = () => {
    if (SpeechSynthesis) {
      SpeechSynthesis.cancel();
    }
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    setIsSpeaking(false);
  };

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    // Check if API key and model are available
    if (!model || !genAI) {
      const errorMsg =
        "API key is missing. Please set VITE_GEMINI_API_KEY in your .env file and restart the server.";
      setChatHistory((prev) => [...prev, { role: "ai", text: errorMsg }]);
      return;
    }

    const userMessage = prompt.trim();
    setChatHistory((prev) => [...prev, { role: "user", text: userMessage }]);
    setPrompt("");
    setLoading(true);

    try {
      // Enhanced system instruction for detailed health-related responses
      const systemInstruction = `You are Kenkoo AI, a knowledgeable and empathetic healthcare assistant. Your role is to provide detailed, accurate, and helpful information about health and wellness topics.

Guidelines for your responses:
1. Provide comprehensive, detailed answers that cover all aspects of the question
2. Break down complex medical information into easy-to-understand language
3. Include relevant context, causes, symptoms, prevention, and general guidance
4. Always emphasize that your information is for educational purposes only
5. Strongly recommend consulting with qualified healthcare professionals for medical advice, diagnosis, or treatment
6. Be empathetic, supportive, and clear in your communication
7. Use bullet points or numbered lists when appropriate for better readability
8. Include practical tips and actionable advice when relevant

Remember: You are not a replacement for professional medical care. Always encourage users to seek professional medical advice for serious health concerns.`;

      const chat = model.startChat({
        history: chatHistory.map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        })),
        systemInstruction: systemInstruction,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
          topP: 0.95,
          topK: 40,
        },
      });

      const result = await chat.sendMessage(userMessage);
      const text = result.response.text();

      // TTS: Speak response
      if (SpeechSynthesis && hasSpeechSupport) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 0.8;
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        SpeechSynthesis.speak(utterance);
      }

      setChatHistory((prev) => [...prev, { role: "ai", text }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      let errorMsg = "";

      if (
        error.message?.includes("quota") ||
        error.message?.includes("Quota exceeded") ||
        error.message?.includes("429")
      ) {
        errorMsg =
          "⚠️ API quota exceeded. The free tier has usage limits. Please:\n\n" +
          "1. Wait a few minutes and try again\n" +
          "2. Check your quota at: https://aistudio.google.com/app/apikey\n" +
          "3. Consider upgrading your plan if you need more requests\n\n" +
          "The chatbot will work once your quota resets.";
      } else if (
        error.message?.includes("400") &&
        error.message?.includes("safety_settings")
      ) {
        errorMsg =
          "Safety config issue—try a different prompt or check API docs.";
      } else if (error.message?.includes("404")) {
        errorMsg = "Model unavailable—check API key and try regenerating it.";
      } else if (
        error.message?.includes("API_KEY") ||
        error.message?.includes("API key") ||
        error.message?.includes("401") ||
        error.message?.includes("403")
      ) {
        errorMsg =
          "Invalid API key. Please check your VITE_GEMINI_API_KEY in .env file and ensure it's correct.";
      } else {
        errorMsg = `Oops! ${
          error.message ||
          "An error occurred. Please check your API key and try again."
        }`;
      }

      setChatHistory((prev) => [...prev, { role: "ai", text: errorMsg }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px", // ✅ allow responsiveness
        zIndex: 1000,
      }}
    >
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            padding: "10px 20px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "50px",
            cursor: "pointer",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            width: "fit-content",
          }}
        >
          Chat with AI
        </button>
      )}

      {isOpen && (
        <div
          style={{
            width: "100%", // ✅ full width
            maxWidth: "350px", // ✅ but limit on large screens
            height: "65vh", // ✅ flexible height for phones
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "15px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            margin: "0 auto", // ✅ center horizontally
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "10px",
              background: "#f0f0f0",
              borderRadius: "15px 15px 0 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "25px",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Kenkoo Assistant
            </h3>
            <button
              onClick={() => {
                stopAllVoice();
                setIsOpen(false);
              }}
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              ✕
            </button>
          </div>

          {/* Chat Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "10px",
              backgroundColor: "#fafafa",
            }}
          >
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "10px",
                  textAlign: msg.role === "user" ? "right" : "left",
                  padding: "8px",
                  backgroundColor: msg.role === "user" ? "#e3f2fd" : "#f5f5f5",
                  borderRadius: "8px",
                  maxWidth: "85%",
                  marginLeft: msg.role === "user" ? "auto" : "0",
                  marginRight: msg.role === "user" ? "0" : "auto",
                  wordBreak: "break-word", // ✅ prevents overflow
                }}
              >
                <strong
                  style={{
                    color: msg.role === "user" ? "#1976d2" : "#388e3c",
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  {msg.role === "user" ? "You:" : "Kenkoo AI:"}
                </strong>
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            ))}
            {loading && (
              <div
                style={{
                  textAlign: "left",
                  padding: "8px",
                  color: "#666",
                  fontStyle: "italic",
                }}
              >
                Thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSubmit}
            style={{
              padding: "8px",
              borderTop: "1px solid #ccc",
              display: "flex",
              gap: "6px",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask anything..."
              style={{
                flex: 1,
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                fontSize: "14px",
              }}
              disabled={loading || isListening}
            />
            <button
              type="button"
              onClick={() => {
                if (isListening || isSpeaking) {
                  stopAllVoice();
                } else {
                  setIsListening(true);
                  recognitionRef.current.start();
                }
              }}
              disabled={!hasSpeechSupport || loading}
              style={{
                padding: "8px 10px",
                background: isListening || isSpeaking ? "#ff6b6b" : "#007bff",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
              }}
              title={
                isListening || isSpeaking ? "Stop Voice" : "Start Voice Input"
              }
            >
              {isListening || isSpeaking ? "🛑" : "🤖"}
            </button>
            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              style={{
                padding: "8px 12px",
                background: loading ? "#ccc" : "#007bff",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "14px",
                flexShrink: 0,
              }}
            >
              Send
            </button>
          </form>

          {!hasSpeechSupport && (
            <div
              style={{
                padding: "5px 10px",
                fontSize: "12px",
                color: "#666",
                textAlign: "center",
              }}
            >
              Voice not supported (try Chrome).
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GeminiChatbot;
