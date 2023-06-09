const jwtPkg = import("jsonwebtoken");

const secretKey = "al2pxxxxtx";

module.exports = ({side, joi}) => {
  return {
    "post /api/login": side({
      tags: [`admin`],
      summary: `根据用户名获取 token`,
      schema: {
        body: joi.object({
          passphrase: joi.string()
            .default(`hugiegie`)
            .required()
            .description(`用户名`),
        }).description(`用户信息`),
      },
      async action (req, res) {
        const jwt = (await jwtPkg).default
        const userinfo = req.body;
        if (userinfo.passphrase !== "hugiegie") {
          return res.json({
            status: 400,
            message: "鉴权失败！",
          });
        }
        const tokenStr = jwt.sign({ username: userinfo.passphrase }, secretKey, {
          expiresIn: "1h",
        });
        res.json({
          status: 200,
          message: "湖giegie提示你：鉴权成功啦！",
          token: tokenStr,
        });
      }
    }),
  }
};
