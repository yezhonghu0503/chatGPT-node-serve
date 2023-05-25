import express from "express";
import cors from "cors";
import admin from "./router/admin.js";
const app = express();
const secretKey = "heyyyyfx";
app.use(cors()); // 跨域
app.use(express.json()); // 解析JSON
app.use(express.urlencoded({ extended: false })); // 解析x-www-form-urlencoded

app.use(
  "/",
  expressjwt({
    secret: secretKey,
    algorithms: ["HS256"], //重要:签名算法（6.0以上版本必须加，否则报错）
  }).unless({
    path: [/^\/api\//], // 接口白名单
  }),
  admin
);
app.listen(8999, () => {
  console.log("服务启动成功!");
});
