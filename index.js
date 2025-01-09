const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { OpenAI } = require("openai");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_AI_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: `${prompt}`,
        },
      ],
      response_format: {
        type: "text",
      },
      max_completion_tokens: 500,
      top_p: 1,
      temperature: 0.5,
      frequency_penalty: 0.75,
      presence_penalty: 0,
    });
    return res.status(200).json({
      success: true,
      data: response.choices,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.response
        ? error.reposnse.data
        : "There was a problem on the server",
    });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
