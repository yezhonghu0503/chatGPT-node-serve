import express from "express";
import openai from "../utils/openaiAuth.js";

const app = express();
const router = express.Router();
const modelName = "gpt-3.5-turbo";

// chatgpt聊天接口
router.post("/chat/talks", async (req, res) => {
  console.log(req.body);
  //   const completion = await openai.createChatCompletion({
  //     model: modelName,
  //     messages: [{ role: "user", content: req.query.msg }],
  //   });
  //   res.send(completion.data.choices[0].message);
  res.send(req.body);
});

// chat模型列表接口
router.get("/chat/versionList", async (req, res) => {
  //   const completion = await openai.listModels();
  //   res.send(completion);
});

export default router;
// 切换模型接口
