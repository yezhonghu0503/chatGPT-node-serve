// const express = require("express");
import express from "express";
const app = express();

app.get("/stream", (req, res) => {
  // 设置响应头，指定内容类型为 text/plain
  res.setHeader("Content-Type", "text/plain");

  // 获取要发送的字符串
  const message = "Hello, world!";

  // 设置计数器
  let index = 0;

  // 定时发送字符串中的两个字符
  const intervalId = setInterval(() => {
    if (index < message.length) {
      res.write(message.slice(index, index + 2));
      index += 2;
    } else {
      // 字符串发送完成后停止定时器
      clearInterval(intervalId);
      res.end();
    }
  }, 1000);
});

app.listen(3003, () => {
  console.log("Server started on port 3000");
});
