import express from "express";
import openai from "../utils/openaiAuth.js";

const app = express();
const router = express.Router();
// 默认模型
let defaultModel = "gpt-3.5-turbo";
// 历史对话消息，当前区分历史对话消息的方式为前端传入本地缓存
const messages = [];

// chatgpt对话接口
router.post("/chat/talks", async (req, res) => {
  const modelName = defaultModel;
  if (!req.body.msg) {
    res.status(404).send("msg为空");
  }
  // req.body.msg示例：{ role: "roleName", content: msg }
  req.body.modelName ? (model = req.body.modelName) : "";
  const completion = await openai.createChatCompletion({
    model: modelName,
    messages: req.body.msg,
  });
  res.send(completion);
});

// chat模型列表接口
router.get("/chat/versionList", async (req, res) => {
  const completion = await openai.listModels();
  res.send(completion);
});

// 切换模型接口
router.post("/chat/switchModel", async (req, res) => {
  // modelName = req.body.modelName;
  // res.send('模型更换成功')
});

// 修改对话角色接口
router.post("/chat/switchRole", async (req, res) => {});
export default router;
