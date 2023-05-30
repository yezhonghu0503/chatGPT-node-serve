import { OpenAIApi } from "openai";
import express from "express";
const app = express();

// 创建 OpenAI API 客户端
const openai = new OpenAIApi(
  "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"
);

// 历史对话消息
const messages = [
  { role: "system", content: "You are a helpful assistant." },
  { role: "user", content: "Who won the world series in 2020?" },
  {
    role: "assistant",
    content: "The Los Angeles Dodgers won the World Series in 2020.",
  },
];

// 调用 API 来生成回复
const generateReply = async (messages) => {
  const response = await openai.ChatCompletion.create({
    model: "gpt-3.5-turbo",
    messages: messages,
  });

  // 提取回复的内容
  const reply = response.data.choices[0].message.content;

  return reply;
};

// 使用示例

app.get("/chat/test", (res, req) => {
  generateReply(messages)
    .then((reply) => {
      req.send(`Reply:${reply}`);
    })
    .catch((error) => {
      req.send(`Error:${error}`);
    });
});

app.use(3002, () => {
  console.log("serve start");
});
