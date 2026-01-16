import { useState, useRef, useEffect } from "react";

function SearchBar({
  onSendMessage,
  isLoading = false,
  onChatIconClick,
  onVoiceIconClick,
  onFileSelect,
  isListening = false,
  selectedFile = null,
  voiceTranscript = "",
  onVoiceTranscriptSet = null,
}) {
  const [query, setQuery] = useState("");
  const fileInputRef = useRef(null);

  // Update query when voice transcript is received
  useEffect(() => {
    if (voiceTranscript) {
      setQuery(voiceTranscript);
      // Clear the transcript after setting it
      if (onVoiceTranscriptSet) {
        onVoiceTranscriptSet();
      }
    }
  }, [voiceTranscript, onVoiceTranscriptSet]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send if there's text OR a selected file
    if ((query.trim() || selectedFile) && !isLoading) {
      onSendMessage(query.trim(), selectedFile);
      setQuery("");
    }
  };

  const handleChatIconClick = () => {
    if (onChatIconClick) {
      onChatIconClick();
    } else {
      // Default: focus on input
      document.querySelector('input[type="text"]')?.focus();
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const ok = isImageFile(file) || isPdfFile(file);
    if (!ok) {
      alert("Please upload an image or a PDF file.");
      e.target.value = "";
      return;
    }

    // Size limit: 20MB
    if (file.size > 20 * 1024 * 1024) {
      alert("File size should be less than 20MB.");
      e.target.value = "";
      return;
    }

    // Store the file instead of sending immediately
    if (onFileSelect) {
      onFileSelect(file);
    }

    e.target.value = "";
  };

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center">
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*,application/pdf"
          className="hidden"
        />

        {/* Chat icon on left */}
        <button
          type="button"
          onClick={handleChatIconClick}
          className="absolute left-4 lg:left-5 text-blue-500 hover:text-blue-600 transition-colors cursor-pointer z-10"
          aria-label="Chat"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 lg:h-6 lg:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>

        {/* Input field */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a health question..."
          disabled={isLoading || isListening}
          className="w-full pl-12 lg:pl-14 pr-28 lg:pr-32 py-4 lg:py-5 xl:py-6 rounded-full border border-blue-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base lg:text-lg xl:text-xl"
        />

        {/* Image upload button */}
        <button
          type="button"
          onClick={handleImageButtonClick}
          disabled={isLoading || isListening}
          className="absolute right-20 lg:right-24 text-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors z-10"
          aria-label="Upload image"
          title="Upload image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 lg:h-6 lg:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </button>

        {/* Microphone button on right */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("🔘 Mic button clicked in SearchBar");
            if (onVoiceIconClick) {
              onVoiceIconClick();
            }
          }}
          disabled={isLoading || isListening}
          className={`absolute right-12 lg:right-14 transition-all duration-200 z-10 ${
            isListening
              ? "text-red-500 opacity-60 cursor-not-allowed"
              : "text-blue-500 hover:text-blue-600 opacity-100"
          } ${
            isListening ? "animate-pulse" : ""
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          aria-label={isListening ? "Stop listening" : "Start voice input"}
          title={
            isListening ? "Listening... Click to stop" : "Start voice input"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 lg:h-6 lg:w-6 ${
              isListening ? "animate-pulse" : ""
            }`}
            fill={isListening ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        </button>

        {/* Send button */}
        <button
          type="submit"
          disabled={
            isLoading || (!query.trim() && !selectedFile) || isListening
          }
          className="absolute right-5 lg:right-5 text-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors z-10"
          aria-label="Send message"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 lg:h-6 lg:w-6 rotate-90"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
