import React, { useState, useEffect } from "react";
import { LogOut, History, MessageSquare, Search, Calendar, Star, TrendingUp } from "lucide-react";
import InterviewBox from "./InterviewBox";
import InputArea from "./InputArea";
import FeedbackPanel from "./FeedbackPanel";
import HistoryPanel from "./HistoryPanel";
import axios from "axios";

const interviewQuestions = [
  "Tell me about yourself and your background.",
  "What are your greatest strengths and weaknesses?",
  "Why do you want to work for our company?",
  "Describe a challenging project you worked on.",
  "Where do you see yourself in 5 years?",
  "How do you handle stress and pressure?",
  "What motivates you in your work?",
  "Describe a time you had to work in a team.",
  "What is your biggest professional achievement?",
  "Why are you leaving your current job?"
];

function Dashboard({ user, onLogout }) {
  const [question, setQuestion] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [interviewHistory, setInterviewHistory] = useState([]);
  const [currentSession, setCurrentSession] = useState({
    questions: [],
    answers: [],
    evaluations: []
  });
  const [stats, setStats] = useState({
    totalInterviews: 0,
    averageScore: 0,
    improvementTrend: 0
  });

  useEffect(() => {
    generateNewQuestion();
    fetchInterviewHistory();
  }, []);

  const generateNewQuestion = () => {
    const randomQuestion = interviewQuestions[Math.floor(Math.random() * interviewQuestions.length)];
    setQuestion(randomQuestion);
  };

  const fetchInterviewHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/interview/${user.userId}`);
      setInterviewHistory(response.data);
      calculateStats(response.data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const calculateStats = (history) => {
    if (history.length === 0) return;
    
    setStats({
      totalInterviews: history.length,
      averageScore: Math.floor(Math.random() * 20) + 75, // Mock score calculation
      improvementTrend: Math.floor(Math.random() * 10) + 5
    });
  };

  const handleAnswerSubmit = async (answer) => {
    setLoading(true);
    setFeedback("");

    try {
      const response = await axios.post("http://localhost:5000/api/evaluate", {
        question,
        answer,
      });

      if (response.data.feedback) {
        setFeedback(response.data.feedback);
        
        // Add to current session
        const newSession = {
          questions: [...currentSession.questions, question],
          answers: [...currentSession.answers, answer],
          evaluations: [...currentSession.evaluations, response.data.feedback]
        };
        setCurrentSession(newSession);

        // Save session to database
        await saveSession(newSession);
        
        // Generate new question for next round
        setTimeout(() => {
          generateNewQuestion();
        }, 2000);
      }
    } catch (error) {
      setFeedback("Error getting feedback. Please try again.");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveSession = async (session) => {
    try {
      await axios.post("http://localhost:5000/api/interview", {
        userId: user.userId,
        questions: session.questions,
        answers: session.answers,
        evaluations: session.evaluations
      });
      fetchInterviewHistory(); // Refresh history
    } catch (error) {
      console.error("Error saving session:", error);
    }
  };

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <div className={`dashboard-container ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo-container">
            <div className="logo-icon">🤖</div>
            <h1 className="logo-text">MockMate</h1>
          </div>
          <div className="user-welcome">
            <span>Welcome back, {user.username || user.email}!</span>
          </div>
        </div>
        
        <div className="header-right">
          <div className="stats-mini">
            <div className="stat-item">
              <TrendingUp size={16} />
              <span>{stats.totalInterviews} Sessions</span>
            </div>
            <div className="stat-item">
              <Star size={16} />
              <span>{stats.averageScore}% Avg</span>
            </div>
          </div>
          
          <button className="icon-button" onClick={() => setShowHistory(!showHistory)}>
            <History size={20} />
          </button>
          
          <button className="icon-button" onClick={toggleTheme}>
            {darkMode ? '☀️' : '🌙'}
          </button>
          
          <button className="logout-button" onClick={onLogout}>
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        {/* Main Interview Area */}
        <div className={`main-interview ${showHistory ? 'with-sidebar' : ''}`}>
          <div className="interview-header">
            <MessageSquare className="interview-icon" />
            <h2>Practice Interview Session</h2>
            <button className="new-question-btn" onClick={generateNewQuestion}>
              New Question
            </button>
          </div>
          
          <InterviewBox question={question} />
          <InputArea onSubmit={handleAnswerSubmit} />
          <FeedbackPanel feedback={loading ? "🔄 Analyzing your response..." : feedback} />
        </div>

        {/* History Sidebar */}
        {showHistory && (
          <HistoryPanel 
            history={interviewHistory}
            onClose={() => setShowHistory(false)}
            stats={stats}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;