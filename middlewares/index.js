import { expressjwt } from "express-jwt";

const error = {
  invalid: {
      code: "400",
      msg: "Invalid token.",
  },
  notToken: {
      code: "401",
      msg: "Access denied. No token provided.",
  }
};

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
  const token = req.headers.authorization;
  if (!token) {
    // 如果没有 token，返回 401 错误
    return res.status(401).send(error.notToken);
  }

  try {
    // 验证 token 是否有效
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (ex) {
    // 如果 token 无效，返回 400 错误
    res.status(400).send(error.invalid);
    return;
  }

  expressjwt({
    secret: "al2pxxxxtx",
    algorithms: ["HS256"], //重要:签名算法（6.0以上版本必须加，否则报错）
  }).unless({
    path: [/^\/api\//], // 接口白名单
  });
};
