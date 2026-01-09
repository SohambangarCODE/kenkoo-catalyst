import SearchBar from "./SearchBar";
import useGeminiChat from "../hooks/useGeminiChat";
import ReactMarkdown from "react-markdown";

function SearchWithGemini() {
  const { sendMessage, response, loading } = useGeminiChat();

  // 🎤 Voice Input Handler
  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input not supported. Use Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      sendMessage(voiceText);
    };

    recognition.start();
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 px-4">
      {/* Search Bar */}
      <SearchBar
        onSendMessage={sendMessage}
        isLoading={loading}
        onVoiceIconClick={handleVoiceInput}
      />

      {/* AI Response */}
      {response && (
        <div className="mt-8 p-6 bg-white rounded-2xl shadow-md border">
          <h2 className="text-lg font-semibold text-blue-600 mb-3">
            AI Response
          </h2>

          <ReactMarkdown className="prose max-w-none">
            {response}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default SearchWithGemini;
