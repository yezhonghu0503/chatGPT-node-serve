import express from "express";
import cors from "cors";
import { expressjwt } from "express-jwt";
import { captureGlobalError } from "./middlewares/index.js";
import admin from "./router/admin.js";
import chat from "./router/chat.js";
const app = express();

app.use(cors()); // 跨域
app.use(express.json()); // 解析JSON
app.use(express.urlencoded({ extended: false })); // 解析x-www-form-urlencoded
app.use(captureGlobalError);
app.use(
  expressjwt({
    secret: secretKey,
    algorithms: ["HS256"], //重要:签名算法（6.0以上版本必须加，否则报错）
  }).unless({
    path: ["/^/api//"], // 接口白名单
  })
);

app.use("/", admin);
app.use("/", chat);
app.listen(8999, () => {
  console.log("服务启动成功!");
});
