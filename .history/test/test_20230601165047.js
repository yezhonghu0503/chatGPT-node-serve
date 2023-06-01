// const express = require("express");
import express from "express";
const app = express();

app.get("/stream", (req, res) => {
  // 设置响应头，指定内容类型为 text/plain
  res.setHeader("Content-Type", "text/plain");

  // 获取要发送的字符串
  const message = "Hello, world!";

  // 逐字逐句地发送信息给客户端
  for (let i = 0; i < message.length; i++) {
    res.write(message[i]);
  }

  // 发送完成后停止
  res.end();
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
