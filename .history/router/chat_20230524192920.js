const dotenv = require("dotenv");
const express = require("express");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/chat", async (req, res) => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: req.query.msg }],
  });
  res.send(completion.data.choices[0].message);
});

app.get("/versionList", async (req, res) => {
  const completion = await openai.listModels();
  res.send(completion);
});
