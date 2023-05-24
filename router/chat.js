const dotenv = require("dotenv");
const express = require("express");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const router = express.Router()
dotenv.config();
const modelName = "gpt-3.5-turbo"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// chatgpt聊天接口
router.post("/chat", async (req, res) => {
  const completion = await openai.createChatCompletion({
    model: modelName,
    messages: [{ role: "user", content: req.query.msg }],
  });
  res.send(completion.data.choices[0].message);
});

// chat模型列表接口
router.get("/versionList", async (req, res) => {
  const completion = await openai.listModels();
  res.send(completion);
});

// 