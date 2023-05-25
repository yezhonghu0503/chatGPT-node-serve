import express from "express";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import { expressjwt } from "express-jwt";
import { captureGlobalError } from "../middlewares/index.js";

const app = express();
const secretKey = "al2pxxxxtx";
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(captureGlobalError);
app.use(
  expressjwt({
    secret: secretKey,
    algorithms: ["HS256"], //重要:签名算法（6.0以上版本必须加，否则报错）
  }).unless({
    path: [/^\/api\//], // 接口白名单
  })
);

// 登录接口:当前版本不进行复杂的鉴权,仅仅进行简单口令鉴权
router.post("/api/login", async (req, res) => {
  const userinfo = req.body;
  if (userinfo.passphrase !== "hugiegie") {
    return res.send({
      status: 400,
      message: "鉴权失败！",
    });
  }
  const tokenStr = jwt.sign({ username: userinfo.passphrase }, secretKey, {
    expiresIn: "1h",
  });
  res.send({
    status: 200,
    message: "湖giegie提示你：鉴权成功啦！",
    token: tokenStr,
  });
});

router.get("/admin/getinfo", function (req, res) {
  // 05：使用 req.user 获取用户信息，并使用 data 属性将用户信息发送给客户端
  console.log(req.user);
  res.send({
    status: 200,
    message: "获取用户信息成功！",
    data: req.user, // 要发送给客户端的用户信息
  });
});

router.post("/chat/talks", async (req, res) => {
  console.log(req.body);
  //   const completion = await openai.createChatCompletion({
  //     model: modelName,
  //     messages: [{ role: "user", content: req.query.msg }],
  //   });
  //   res.send(completion.data.choices[0].message);
  res.send(req.body);
});
export default router;
