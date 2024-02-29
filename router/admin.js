import express from "express";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import { expressjwt } from "express-jwt";

const app = express();
const secretKey = "al2pxxxxtx";
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: false }));

// 获取登录状态
router.get("/api/getUserStatus", async (req, res) => {
  // const verifyStatus = jwt.verify(req.body.to)
  res.send({
    status: 1,
  });
});

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
export default router;
