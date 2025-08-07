const express = require('express');
const axios = require('axios');
const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

router.post('/', async (req, res) => {
  const { question, answer } = req.body;

  const requestBody = {
    contents: [
      {
        parts: [
          { text: `Question: ${question}\nAnswer: ${answer}\n\nEvaluate this answer like a strict technical interviewer and give direct feedback.` }
        ]
      }
    ]
  };

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      requestBody,
      { headers: { 'Content-Type': 'application/json' } }
    );

    const feedback = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No feedback generated.";
    res.json({ feedback });
  } catch (error) {
    console.error('❌ Gemini API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate feedback from Gemini' });
  }
});

module.exports = router;
