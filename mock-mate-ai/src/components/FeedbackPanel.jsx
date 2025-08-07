import React from 'react';


function FeedbackPanel({ feedback }) {
  if (!feedback) return null;

  return (
    <div className="feedback-card animate-pop">
      <div className="feedback-header">
        <span className="feedback-badge">💡 Insight</span>
        <h3 className="feedback-heading">AI Feedback</h3>
      </div>
      <p className="feedback-message">{feedback}</p>
    </div>
  );
}

export default FeedbackPanel;
