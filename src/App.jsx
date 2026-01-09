import { useState, useEffect } from "react";
import { Header, SearchBar, ActionCards, BottomNav } from "./components";
import { Hero } from "./sections";
import { sendMessageToGemini } from "./utils/gemini";
import Reports from "./pages/Reports";
import DoctorConnect from "./pages/DoctorConnect";
import HealthOverview from "./pages/HealthOverview";
import Profile from "./pages/Profile";

function App() {
  // Verify API key on mount
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    console.log("App.jsx - API Key Status:", apiKey ? "✓ Loaded" : "✗ Missing");
    if (!apiKey) {
      console.warn("⚠️ VITE_GEMINI_API_KEY is not set in .env file!");
      console.warn("Please create a .env file in the root directory with:");
      console.warn("VITE_GEMINI_API_KEY=your_api_key_here");
      console.warn("Then restart the development server.");
    }
  }, []);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("ai");
  const [showChat, setShowChat] = useState(false);

  const handleSendMessage = async (message) => {
    // Add user message
    const userMessage = { role: "user", content: message };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setShowChat(true);

    try {
      // Get response from Gemini
      const response = await sendMessageToGemini(message);
      const aiMessage = { role: "assistant", content: response };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error in handleSendMessage:", error);
      let errorMessage = "";

      if (
        error.message?.includes("quota") ||
        error.message?.includes("Quota exceeded") ||
        error.message?.includes("429")
      ) {
        errorMessage =
          "⚠️ API quota exceeded. The free tier has usage limits. Please:\n\n" +
          "1. Wait a few minutes and try again\n" +
          "2. Check your quota at: https://aistudio.google.com/app/apikey\n" +
          "3. Consider upgrading your plan if you need more requests\n\n" +
          "The chatbot will work once your quota resets.";
      } else if (
        error.message?.includes("API_KEY") ||
        error.message?.includes("API key") ||
        error.message?.includes("401") ||
        error.message?.includes("403")
      ) {
        errorMessage =
          "Invalid API key. Please check your VITE_GEMINI_API_KEY in .env file and ensure it's correct.";
      } else {
        errorMessage =
          error.message ||
          "Sorry, I encountered an error. Please check your API key configuration and try again.";
      }

      const errorMsg = {
        role: "assistant",
        content: errorMessage,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = (action) => {
    // Handle action card clicks - placeholder for future functionality
    if (action.id === 1) {
      // Focus on search bar
      document.querySelector('input[type="text"]')?.focus();
    } else {
      console.log("Action clicked:", action);
      // Placeholder: Will be implemented later
    }
  };

  const handleBackToHome = () => {
    setShowChat(false);
    setMessages([]);
  };

  const handleFloatingIconClick = (iconId) => {
    // Placeholder handler for floating icons
    console.log("Floating icon clicked:", iconId);
    // Placeholder: Will be implemented later
  };

  const handleBottomNavChange = (tabId) => {
    setActiveTab(tabId);
    // Placeholder: Will be implemented later
    console.log("Tab changed to:", tabId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Main container - full width on desktop, centered mobile */}
      <div className="min-h-screen w-full lg:max-w-full mx-auto bg-white lg:bg-transparent flex flex-col">
        {/* Desktop: Header at top, Mobile: in container */}
        <div className="lg:hidden">
          <Header />
        </div>

        <div className="lg:flex lg:min-h-screen">
          {/* Desktop Sidebar/Header */}
          <div className="hidden lg:flex lg:flex-col lg:w-80 xl:w-96 lg:bg-white lg:shadow-xl lg:border-r lg:border-gray-200">
            <div className="lg:pt-8 lg:px-6">
              <Header />
            </div>
            <div className="lg:mt-8 lg:px-6">
              <BottomNav
                activeTab={activeTab}
                onTabChange={handleBottomNavChange}
              />
            </div>
          </div>

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col lg:overflow-hidden">
            {/* Desktop Header (hidden on mobile) */}
            <div className="hidden lg:block lg:bg-white lg:border-b lg:border-gray-200 lg:px-8 lg:py-4">
              <button
                onClick={handleBackToHome}
                className={`flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors group ${
                  !showChat || messages.length === 0
                    ? "opacity-0 pointer-events-none"
                    : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span className="text-base font-medium">Back to Home</span>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto pb-20 lg:pb-0">
              {activeTab === "reports" ? (
                <Reports />
              ) : activeTab === "overview" ? (
                <HealthOverview />
              ) : activeTab === "profile" ? (
                <Profile />
              ) : activeTab === "doctor" ? (
                <DoctorConnect onBack={() => setActiveTab("ai")} />
              ) : !showChat || messages.length === 0 ? (
                <div className="max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8 xl:px-12 py-6 md:py-8 lg:py-10">
                  {/* Hero Section with Title and Robot */}
                  <Hero onFloatingIconClick={handleFloatingIconClick} />

                  {/* Action Cards Section - Horizontal Layout */}
                  <ActionCards onCardClick={handleCardClick} />

                  {/* Search Bar - Always visible at bottom */}
                  <div className="mt-6 md:mt-8 lg:mt-10 pb-4 md:pb-6 lg:pb-8">
                    <div className="max-w-3xl xl:max-w-4xl mx-auto">
                      <SearchBar
                        onSendMessage={handleSendMessage}
                        isLoading={isLoading}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col">
                  {/* Mobile Back Button */}
                  <div className="lg:hidden px-4 pt-6">
                    <button
                      onClick={handleBackToHome}
                      className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors mb-4 group"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 group-hover:-translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                      </svg>
                      <span className="text-sm font-medium">Back to Home</span>
                    </button>
                  </div>

                  {/* Chat messages container */}
                  <div className="flex-1 overflow-y-auto px-4 lg:px-12 xl:px-16 py-6 lg:py-8">
                    <div className="max-w-4xl xl:max-w-5xl mx-auto space-y-6">
                      {messages.map((msg, index) => (
                        <div
                          key={index}
                          className={`flex ${
                            msg.role === "user"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[85%] md:max-w-[75%] lg:max-w-[60%] xl:max-w-[55%] rounded-2xl px-5 py-4 lg:px-6 lg:py-5 shadow-sm ${
                              msg.role === "user"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            <p className="text-sm md:text-base lg:text-lg whitespace-pre-wrap break-words leading-relaxed">
                              {msg.content}
                            </p>
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="bg-gray-100 rounded-2xl px-5 py-4">
                            <div className="flex gap-1.5">
                              <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                              <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Search bar at bottom - sticky on desktop */}
                  <div className="lg:sticky lg:bottom-0 lg:bg-white lg:border-t lg:border-gray-200 lg:px-8 lg:py-6">
                    <div className="max-w-4xl xl:max-w-5xl mx-auto">
                      <SearchBar
                        onSendMessage={handleSendMessage}
                        isLoading={isLoading}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>

        {/* Mobile Bottom Nav */}
        <div className="lg:hidden">
          <BottomNav
            activeTab={activeTab}
            onTabChange={handleBottomNavChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
