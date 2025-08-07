const express = require('express');
const InterviewSession = require('../models/interviewSession');

const router = express.Router();

// Save a new interview session
router.post('/', async (req, res) => {
  try {
    const { userId, questions, answers, evaluations } = req.body;

    if (!userId || !questions || !answers) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const session = new InterviewSession({ userId, questions, answers, evaluations });
    await session.save();

    res.status(201).json(session);
  } catch (err) {
    console.error('❌ Error saving session:', err.message);
    res.status(500).json({ error: 'Failed to save interview session' });
  }
});

// Fetch all sessions for a user
router.get('/:userId', async (req, res) => {
  try {
    const sessions = await InterviewSession.find({ userId: req.params.userId });

    if (!sessions.length) {
      return res.status(404).json({ message: 'No sessions found for this user' });
    }

    res.json(sessions);
  } catch (err) {
    console.error('❌ Error fetching sessions:', err.message);
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

module.exports = router;
