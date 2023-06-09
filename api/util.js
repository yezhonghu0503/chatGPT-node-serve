
const HttpsProxyAgent = require('https-proxy-agent');
const userkey = require('userkey');
const axios = require('axios').default
const https = require(`https`);
https.globalAgent.options.rejectUnauthorized = false

const jwtPkg = import("jsonwebtoken");
const { Configuration, OpenAIApi } = require(`openai`);

const OPENAI_API_KEY = userkey().get(`OPENAI_API_KEY`)
const HTTP_PROXY = userkey().get(`HTTP_PROXY`)

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const http = axios.create(HTTP_PROXY ? {
  proxy: false,
  httpAgent: new HttpsProxyAgent(HTTP_PROXY, {rejectUnauthorized: false}),
  httpsAgent: new HttpsProxyAgent(HTTP_PROXY, {rejectUnauthorized: false})
} : undefined)
http.interceptors.response.use((res) => res.data, (err) => Promise.reject(err))
const openai = new OpenAIApi(configuration, undefined, http);

/**
 * 包裹 api 的返回值
 * @param {*} param0
 * @param {object} param0.data - 原始数据
 * @param {number|string} [param0.code=200] - http状态码
 * @returns
 */
function wrapApiData({ data, message, code = 200 }) {
  code = String(code);
  return {
    status: code,
    message,
    success: Boolean(code.match(/^[2]/)), // 如果状态码以2开头则为 true
    data,
  };
}

// 鉴权中间件，用于验证 token 是否有效
async function verifyToken(err, req, res, next) {
  const jwt = (await jwtPkg.then()).default;

  const secretKey = "al2pxxxxtx";
  const error = {
    invalid: {
      code: "400",
      msg: "无效的token",
    },
    notToken: {
      code: "401",
      msg: "Access denied. No token provided.",
    },
  };

  const token = req.headers.authorization;
  if (!token) {
    // 如果没有 token，返回 401 错误
    return res.status(401).send(error.notToken);
  }

  try {
    // 验证 token 是否有效
    const decoded = jwt.verify(token, secretKey);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (ex) {
    // 如果 token 无效，返回 400 错误
    res.status(400).send(error.invalid);
  }
  if (err.name === "UnauthorizedError") {
    return res.json({
      status: 401,
      message: "无效的token",
    });
  }
  res.json({
    status: 500,
    message: "未知的错误",
  });
}

module.exports = {
  verifyToken,
  openai,
  wrapApiData,
};
