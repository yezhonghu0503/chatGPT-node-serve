// const express = require("express");
import express from "express";
import strem from "stream";
const app = express();

app.get("/stream", (req, res) => {
  // 设置响应头，指定内容类型为 text/plain
  res.setHeader("Content-Type", "text/plain");

  // 获取要发送的字符串
  const message = "Hello, world!";

  // 创建可写流
  const writableStream = new strem.Writable();

  // 在可写流中实现逐字逐句发送信息
  writableStream._write = (chunk, encoding, callback) => {
    if (chunk) {
      res.write(chunk.toString());
    }
    callback();
  };

  // 当可写流完成时，停止发送
  writableStream.on("finish", () => {
    res.end();
  });

  // 将可写流连接到响应对象
  writableStream.pipe(res);

  // 逐字逐句地写入字符串到可写流
  for (let i = 0; i < message.length; i++) {
    writableStream.write(message[i]);
  }

  // 结束可写流
  writableStream.end();
});

app.listen(3003, () => {
  console.log("Server started on port 3000");
});
