import { expressjwt } from "express-jwt";
export const captureGlobalError = (err, req, res, next) => {
  // 这次错误是由 token 解析失败导致的
  if (err.name === "UnauthorizedError") {
    return res.send({
      status: 401,
      message: "无效的token",
    });
  }
  res.send({
    status: 500,
    message: "未知的错误",
  });
};

export const verifyToken = (req, res, next) => {
  //获取header中的token，并验证
  if (req.headers.authorization) {
    const flag = verifyToken(req.headers.authorization);
    //验证失败
    if (!flag) {
      res.send({ status: "fail" });
    }
  }
  //验证成功继续
  next();

  expressjwt({
    secret: "al2pxxxxtx",
    algorithms: ["HS256"], //重要:签名算法（6.0以上版本必须加，否则报错）
  }).unless({
    path: [/^\/api\//], // 接口白名单
  });
};
