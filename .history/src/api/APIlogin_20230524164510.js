import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import bodyParser from "body-parser";
import { expressjwt } from "express-jwt";
import { verifyToken } from "../tools/authentication.js";

const app = express();

const secretKey = "heyyyyfx";

// 允许跨域资源共享
app.use(cors());
// 解析 post 表单数据的中间件
app.use(bodyParser.urlencoded({ extended: false }));
// 使用鉴权中间件
// app.use(verifyToken);

app.use(
    expressjwt({
        secret: secretKey, //秘钥和生成token的保持一致
        algorithms: ["HS256"], //签名算法（6.0以上版本必须加，否则报错）
    }).unless({
        path: ["/api/login"], //登录接口不验证
    })
);

// 登录接口
app.post("/api/login", function (req, res) {
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
        expiresIn: "30s",
    });
    res.send({
        status: 200,
        message: "登录成功！",
        token: tokenStr, // 要发送给客户端的 token 字符串
    });
});

// 这是一个有权限的 API 接口
app.get("/admin/getinfo", function (req, res) {
    // 05：使用 req.user 获取用户信息，并使用 data 属性将用户信息发送给客户端
    console.log(req.user);
    res.send({
        status: 200,
        message: "获取用户信息成功！",
        data: req.user, // 要发送给客户端的用户信息
    });
});

// 06：使用全局错误处理中间件，捕获解析 JWT 失败后产生的错误
app.use((err, req, res, next) => {
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
});

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(8888, function () {
    console.log("Express server running at http://127.0.0.1:8888");
});
