import SearchBar from "../components/SearchBar";
import ReactMarkdown from "react-markdown";
import { useState, useRef, useEffect } from "react";

function SearchWithGemini() {
  const { sendMessage, response, loading } = useGeminiChat();
  const [isListening, setIsListening] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState(null);
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const recognitionRef = useRef(null);

  // Speech APIs
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const [hasSpeechSupport, setHasSpeechSupport] = useState(false);

  const isImageFile = (file) => {
    if (!file) return false;
    if (typeof file.type === "string" && file.type.startsWith("image/"))
      return true;
    const name = typeof file.name === "string" ? file.name : "";
    return /\.(png|jpe?g|webp|gif|bmp|tiff?)$/i.test(name);
  };

  const isPdfFile = (file) => {
    if (!file) return false;
    if (file.type === "application/pdf") return true;
    const name = typeof file.name === "string" ? file.name : "";
    return /\.pdf$/i.test(name);
  };

  // Check speech support
  useEffect(() => {
    setHasSpeechSupport(!!SpeechRecognition);
  }, []);

  // 🎤 Voice Input Handler (Unified stop/start like GeminiChatbot)
  const handleVoiceInput = () => {
    console.log("🎤 Mic button clicked", {
      hasSpeechSupport,
      isListening,
      SpeechRecognition: !!SpeechRecognition,
    });

    // Check if SpeechRecognition is available (fallback check)
    if (!SpeechRecognition) {
      alert("Voice input not supported. Please use Chrome or Edge browser.");
      return;
    }

    if (!window.isSecureContext) {
      alert(
        "🎤 Voice input requires HTTPS or localhost.\n\n" +
          "Please open this app on:\n" +
          "• http://localhost\n" +
          "• or a HTTPS website"
      );
      return;
    }

    // Stop if already listening
    if (isListening && recognitionRef.current) {
      console.log("🛑 Stopping recognition");
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.error("Error stopping:", e);
      }
      setIsListening(false);
      return;
    }

    // Create new recognition instance (can't reuse after it ends)
    if (!isListening) {
      console.log("🎙️ Creating new recognition instance");
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = "en-US";

      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log("🎧 Voice input received:", transcript);
        // Set the transcript so it appears in the input field
        setVoiceTranscript(transcript);
        setIsListening(false);
        // Auto-submit the message (like GeminiChatbot does)
        setTimeout(() => {
          sendMessage(transcript);
        }, 100);
      };

      rec.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        if (event.error === "not-allowed") {
          alert(
            "Microphone permission denied. Please allow microphone access in your browser settings."
          );
        }
      };

      rec.onstart = () => {
        console.log("✅ Listening started successfully");
        setIsListening(true);
      };

      rec.onend = () => {
        console.log("🔚 Recognition ended");
        setIsListening(false);
      };

      recognitionRef.current = rec;

      try {
        console.log("🚀 Starting recognition...");
        rec.start();
      } catch (error) {
        console.error("❌ Error starting recognition:", error);
        setIsListening(false);
        alert(`Error starting voice recognition: ${error.message}`);
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore errors during cleanup
        }
        recognitionRef.current = null;
      }
    };
  }, []);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    // Clean up object URL to prevent memory leaks
    if (filePreviewUrl) {
      URL.revokeObjectURL(filePreviewUrl);
      setFilePreviewUrl(null);
    }
    setSelectedFile(null);
  };

  // Derive preview URL from selected file (robust across browsers)
  useEffect(() => {
    if (!selectedFile || !isImageFile(selectedFile)) {
      if (filePreviewUrl) {
        URL.revokeObjectURL(filePreviewUrl);
        setFilePreviewUrl(null);
      }
      return;
    }

    const url = URL.createObjectURL(selectedFile);
    setFilePreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile]);

  const handleSendMessage = (message, file = null) => {
    const fileToSend = file || selectedFile;
    sendMessage(message, fileToSend);
    // Clear file and preview URL after sending
    if (filePreviewUrl) {
      URL.revokeObjectURL(filePreviewUrl);
      setFilePreviewUrl(null);
    }
    setSelectedFile(null);
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 px-4">
      {/* Selected File Preview */}
      {selectedFile && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {isImageFile(selectedFile) ? (
              <div className="shrink-0">
                <img
                  src={filePreviewUrl || ""}
                  alt="Preview"
                  className="w-12 h-12 object-cover rounded"
                />
              </div>
            ) : (
              <div className="shrink-0 w-12 h-12 bg-red-100 rounded flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                {selectedFile.name}
              </p>
              <p className="text-xs text-gray-500">
                {typeof selectedFile.size === "number"
                  ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`
                  : isPdfFile(selectedFile)
                  ? "PDF"
                  : "File"}
              </p>
            </div>
          </div>
          <button
            onClick={handleRemoveFile}
            className="ml-3 shrink-0 text-red-500 hover:text-red-600 transition-colors"
            aria-label="Remove file"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      <SearchBar
        onSendMessage={handleSendMessage}
        isLoading={loading}
        onVoiceIconClick={handleVoiceInput}
        onFileSelect={handleFileSelect}
        isListening={isListening}
        selectedFile={selectedFile}
        voiceTranscript={voiceTranscript}
        onVoiceTranscriptSet={() => setVoiceTranscript("")}
      />

      {response && (
        <div className="mt-8 p-6 bg-white rounded-2xl shadow-md border">
          <h2 className="text-lg font-semibold text-blue-600 mb-3">
            AI Response
          </h2>
          <ReactMarkdown className="prose max-w-none">{response}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default SearchWithGemini;
