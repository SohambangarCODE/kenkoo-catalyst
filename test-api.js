// Quick test script to verify Gemini API key
// Run with: node test-api.js

const API_KEY =
  process.env.VITE_GEMINI_API_KEY || "AIzaSyCjmPsmp5PNik3dGFbSdunOyU5pUPKzgVc";
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

async function testAPI() {
  console.log("Testing Gemini API...");
  console.log(
    "API Key:",
    API_KEY ? `${API_KEY.substring(0, 10)}...` : "MISSING"
  );

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: "Hello, say hi back in one word",
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("✓ API Test Successful!");
      console.log("Response:", data.candidates?.[0]?.content?.parts?.[0]?.text);
    } else {
      console.error("✗ API Test Failed!");
      console.error("Status:", response.status);
      console.error("Error:", data);
    }
  } catch (error) {
    console.error("✗ API Test Error:", error.message);
  }
}

testAPI();
