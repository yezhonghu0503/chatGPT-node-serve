import express from "express";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import { expressjwt } from "express-jwt";
import { captureGlobalError } from "../middlewares/index.js";
// import { verifyToken } from "../tools/authentication.js";

const app = express();
const secretKey = "heyyyyfx";
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(captureGlobalError);
app.use(
  expressjwt({
    secret: secretKey,
    algorithms: ["HS256"], //重要:签名算法（6.0以上版本必须加，否则报错）
  }).unless({
    path: ["/^/api//"], // 接口白名单
  })
);

// 登录接口
router.post("/api/login", function (req, res) {
  // 将 req.body 请求体中的数据，转存为 userinfo 常量
  const userinfo = req.body;
  // 登录失败
  if (userinfo.username !== "admin" || userinfo.password !== "000000") {
    return res.send({
      status: 400,
      message: "登录失败！",
    });
  }
  // 登录成功
  // 03：在登录成功之后，调用 jwt.sign() 方法生成 JWT 字符串。并通过 token 属性发送给客户端
  // 参数1：用户的信息对象
  // 参数2：加密的秘钥
  // 参数3：配置对象，可以配置当前 token 的有效期，本处设置的是30S
  // 记住：千万不要把密码加密到 token 字符中
  const tokenStr = jwt.sign({ username: userinfo.username }, secretKey, {
    expiresIn: "1h",
  });
  res.send({
    status: 200,
    message: "登录成功！",
    token: tokenStr, // 要发送给客户端的 token 字符串
  });
});

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(8888, function () {
  console.log("Express server running at http://127.0.0.1:8888");
});
