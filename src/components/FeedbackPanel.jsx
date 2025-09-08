import React from 'react';
import { Brain, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';


function FeedbackPanel({ feedback }) {
  if (!feedback) return null;

  const isLoading = feedback.includes('🔄');
  
  return (
    <div className={`feedback-card ${isLoading ? 'loading' : ''}`}>
      <div className="feedback-header">
        <div className="feedback-icon">
          {isLoading ? (
            <div className="loading-spinner-small"></div>
          ) : (
            <Brain size={20} />
          )}
        </div>
        <div className="feedback-title">
          <h3 className="feedback-heading">AI Analysis</h3>
          <span className="feedback-badge">
            {isLoading ? 'Processing...' : 'Complete'}
          </span>
        </div>
      </div>
      <div className="feedback-content">
        <p className="feedback-message">{feedback}</p>
      </div>
    </div>
  );
}