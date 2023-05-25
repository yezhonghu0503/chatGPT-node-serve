import express from "express";
import cors from "cors";
import admin from "./router/admin.js";
import chat from "./router/chat.js"
import { verifyToken } from "./middlewares/index.js";
import { expressjwt } from "express-jwt";
const app = express();

app.use(cors()); // 跨域
app.use(express.json()); // 解析JSON
app.use(express.urlencoded({ extended: false })); // 解析x-www-form-urlencodedd
app.use(expressjwt({
  secret: "al2pxxxxtx",
  algorithms: ["HS256"], //重要:签名算法（6.0以上版本必须加，否则报错）
}).unless({
  path: ["/api/login"], // 接口白名单
}))

app.use(verifyToken);

app.use("/", admin);
app.use("/", chat)
app.listen(8999, () => {
  console.log("服务启动成功!");
});
