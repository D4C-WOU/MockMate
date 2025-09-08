import React, { useState } from 'react';
import { X, Search, Calendar, MessageSquare, TrendingUp, Star, Award } from 'lucide-react';

function HistoryPanel({ history, onClose, stats }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSession, setSelectedSession] = useState(null);

  const filteredHistory = history.filter(session => 
    session.questions.some(q => 
      q.toLowerCase().includes(searchTerm.toLowerCase())
    ) ||
    session.answers.some(a => 
      a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="history-panel">
      <div className="history-header">
        <div className="history-title">
          <MessageSquare size={20} />
          <h3>Interview History</h3>
        </div>
        <button className="close-button" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      {/* Stats Overview */}
      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon">
            <Award className="icon" />
          </div>
          <div className="stat-content">
            <span className="stat-number">{stats.totalInterviews}</span>
            <span className="stat-label">Total Sessions</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <Star className="icon" />
          </div>
          <div className="stat-content">
            <span className="stat-number">{stats.averageScore}%</span>
            <span className="stat-label">Avg Score</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <TrendingUp className="icon" />
          </div>
          <div className="stat-content">
            <span className="stat-number">+{stats.improvementTrend}%</span>
            <span className="stat-label">Improvement</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          placeholder="Search your interview history..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* History List */}
      <div className="history-list">
        {filteredHistory.length === 0 ? (
          <div className="empty-state">
            <MessageSquare size={48} className="empty-icon" />
            <p>No interview sessions found</p>
            <span>Start practicing to build your history!</span>
          </div>
        ) : (
          filteredHistory.map((session, index) => (
            <div 
              key={session._id} 
              className={`history-item ${selectedSession === session._id ? 'selected' : ''}`}
              onClick={() => setSelectedSession(selectedSession === session._id ? null : session._id)}
            >
              <div className="history-item-header">
                <div className="session-info">
                  <span className="session-title">Session #{filteredHistory.length - index}</span>
                  <div className="session-meta">
                    <Calendar size={14} />
                    <span>{formatDate(session.createdAt)}</span>
                  </div>
                </div>
                <div className="session-stats">
                  <span className="question-count">{session.questions.length} Q&A</span>
                </div>
              </div>
              
              {selectedSession === session._id && (
                <div className="session-details">
                  {session.questions.map((question, qIndex) => (
                    <div key={qIndex} className="qa-pair">
                      <div className="question-detail">
                        <strong>Q:</strong> {question}
                      </div>
                      <div className="answer-detail">
                        <strong>A:</strong> {session.answers[qIndex]}
                      </div>
                      {session.evaluations[qIndex] && (
                        <div className="evaluation-detail">
                          <strong>Feedback:</strong> {session.evaluations[qIndex]}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HistoryPanel;