import jwt from "jsonwebtoken";

const secretKey = "al2pxxxxtx";
const error = {
    invalid: {
        code: "400",
        msg: "无效的token",
    },
    notToken: {
        code: "401",
        msg: "Access denied. No token provided.",
    }
};
// 鉴权中间件，用于验证 token 是否有效
export function verifyToken(err,req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        // 如果没有 token，返回 401 错误
        return res.status(401).send(error.notToken);
    }

    try {
        // 验证 token 是否有效
        const decoded = jwt.verify(token, secretKey);
        console.log(decoded)
        req.user = decoded;
        next();
    } catch (ex) {
        // 如果 token 无效，返回 400 错误
        res.status(400).send(error.invalid);
    }
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
}