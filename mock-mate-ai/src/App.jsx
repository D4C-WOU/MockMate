import React, { useState } from "react";
import Header from "./components/Header";
import InterviewBox from "./components/InterviewBox";
import InputArea from "./components/InputArea";
import FeedbackPanel from "./components/FeedbackPanel";
import './index.css';

function App() {
  const [question, setQuestion] = useState("Tell me something about yourself");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleAnswerSubmit = async (answer) => {
    setLoading(true);
    setFeedback(""); // Clear old feedback

    try {
      const response = await fetch("http://localhost:5000/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer }),
      });

      const data = await response.json();

      if (response.ok && data.feedback) {
        setFeedback(data.feedback);
      } else {
        setFeedback("Unexpected server response. Try again.");
        console.error("Invalid response:", data);
      }
    } catch (error) {
      setFeedback("Error getting feedback. Try again.");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <button className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? '☀️' : '🌙'}
      </button>
      <Header />
      <main className="main-content">
        <InterviewBox question={question} />
        <InputArea onSubmit={handleAnswerSubmit} />
        <FeedbackPanel feedback={loading ? "🔄 Generating feedback..." : feedback} />
      </main>
    </div>
  );
}

export default App;
