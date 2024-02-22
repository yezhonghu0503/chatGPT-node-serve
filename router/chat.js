import express from "express";
import openai from "../utils/openaiAuth.js";

const app = express();
const router = express.Router();
// 默认模型
// let defaultModel = "gpt-3.5-turbo";
let defaultModel = "gpt-4-1106-preview";
// 历史对话消息，当前区分历史对话消息的方式为前端传入本地缓存
const messages = [];

// chatgpt对话
router.post("/chat/talks", async (req, res) => {
  const modelName = defaultModel;
  if (!req.body.msg) {
    res.status(404).send("msg为空");
  }
  if (Array.isArray(req.body.msg)) {
    res.status(400).send("参数格式有误，请检查参数格式");
  }
  // req.body.msg示例：{ role: "roleName", content: msg }
  req.body.modelName ? (model = req.body.modelName) : "";
  const completion = await openai.chat.completions.create({
    model: modelName,
    messages: [{ role: "user", content: req.body.msg }],
  });
  res.send(completion);
});

// chat模型列表
router.get("/chat/versionList", async (req, res) => {
  const completion = await openai.listModels();
  res.send(completion);
});

// 切换模型
router.post("/chat/switchModel", async (req, res) => {
  // modelName = req.body.modelName;
  // res.send('模型更换成功')
});

// 修改对话角色
router.post("/chat/switchRole", async (req, res) => {});

// 获取历史对话消息
router.get("/chat/getMessages", (req, res) => {});

// 存储历史对话消息
router.post("/chat/saveMessages", (req, res) => {
  // 获取用户新增的对话消息
  // 数据库根据用户id检索历史对话消息列表=>或者调用历史对话列表接口
  // 组成新的历史对话消息列表，修改数据库存储值
});
export default router;
