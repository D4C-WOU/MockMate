const mongoose = require('mongoose');

const interviewSessionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  questions: [String],
  answers: [String],
  evaluations: [String], // or you could make this an array of objects if evaluations are complex
}, {
  timestamps: true
});

module.exports = mongoose.model('InterviewSession', interviewSessionSchema);
