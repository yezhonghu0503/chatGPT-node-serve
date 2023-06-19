const expressjwtPkg = import(`express-jwt`);

/**
 * 配置说明请参考文档:
 * https://hongqiye.com/doc/mockm/config/option.html
 * @type {import('mockm/@types/config').Config}
 */
module.exports = async (util) => {
  const joi = await util.tool.generate.initPackge(`joi`)
  const { expressjwt } = (await expressjwtPkg).default
  return {
    osIp: `127.0.0.1`,
    plugin: [util.plugin.validate, util.plugin.apiDoc],
    port: 8999,
    testPort: 8995,
    replayPort: 8991,
    watch: [`./api/`],
    api: {
      "use /": [
        (req, res, next) => {
          ;![
            `/api/login`,
            `/doc`,
            `/doc/openApi.json`,
          ].includes(req.url) ? expressjwt({
            secret: "al2pxxxxtx",
            algorithms: ["HS256"], //重要:签名算法（6.0以上版本必须加，否则报错）
          })(req, res, next) : next()
        }
      ],
      ...require(`./api/admin.js`)({side: util.side, joi}),
      ...require(`./api/chat.js`),
      ...require(`./api/imageGenerator.js`),
      "get /stream"(req, res) {
        // 设置响应头，指定内容类型为 text/plain
        res.setHeader("Content-Type", "text/plain");

        // 获取要发送的字符串
        const message = "Hello, world!";

        // 设置计数器
        let index = 0;

        // 定时发送字符串中的两个字符
        const intervalId = setInterval(() => {
          if (index < message.length) {
            res.json(message.slice(index, index + 2));
            index += 2;
          } else {
            // 字符串发送完成后停止定时器
            clearInterval(intervalId);
            res.end();
          }
        }, 1000);
      },
    },
  };
};
