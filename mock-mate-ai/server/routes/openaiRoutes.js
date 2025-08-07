const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// POST /api/openai/evaluate
router.post('/evaluate', async (req, res) => {
  const { question, answer } = req.body;

  try {
    const prompt = `Evaluate the following answer to an interview question:\n\nQuestion: ${question}\nAnswer: ${answer}\n\nProvide constructive feedback and a score out of 10.`;

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const evaluation = completion.data.choices[0].message.content;
    res.json({ evaluation });

  } catch (err) {
    console.error('OpenAI error:', err.message);
    res.status(500).json({ error: 'Failed to evaluate answer' });
  }
});

module.exports = router;
