import express from "express";
import cors from "cors";
import admin from "./router/admin.js";

const app = express();
const secretKey = "al2pxxxxtx";
app.use(cors()); // 跨域
app.use(express.json()); // 解析JSON
app.use(express.urlencoded({ extended: false })); // 解析x-www-form-urlencoded
app.use();

app.use("/", admin);
app.listen(8999, () => {
  console.log("服务启动成功!");
});
