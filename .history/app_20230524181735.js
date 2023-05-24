import express from "express";
import cors from "cors";
import admin from "./router/admin";
const app = express();

app.use(cors()); // 跨域
app.use(express.json()); // 解析JSON
app.use(express.urlencoded({ extended: false })); // 解析x-www-form-urlencoded

app.use("/", admin);
app.listen(3000, () => {
  console.log("服务启动成功!");
});
