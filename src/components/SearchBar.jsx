import { useState } from "react";

function SearchBar({
  onSendMessage,
  isLoading = false,
  onChatIconClick,
  onVoiceIconClick,
}) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSendMessage(query.trim());
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

  const handleVoiceInput = () => {
    if (onVoiceIconClick) {
      onVoiceIconClick();
    } else {
      // Placeholder: Voice input functionality
      console.log("Voice input clicked");
      // Will be implemented later
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center">
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
          disabled={isLoading}
          className="w-full pl-12 lg:pl-14 pr-20 lg:pr-24 py-4 lg:py-5 xl:py-6 rounded-full border border-blue-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base lg:text-lg xl:text-xl"
        />

        {/* Send button */}
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="absolute right-12 lg:right-14 text-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors z-10"
          aria-label="Send message"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 lg:h-6 lg:w-6 rotate-[90deg]"
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

        {/* Microphone button on right */}
        <button
          type="button"
          onClick={handleVoiceInput}
          disabled={isLoading}
          className="absolute right-4 lg:right-5 text-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors z-10"
          aria-label="Voice input"
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
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
