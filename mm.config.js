const expressjwtPkg = import(`express-jwt`);

/**
 * 配置说明请参考文档:
 * https://hongqiye.com/doc/mockm/config/option.html
 * @type {import('mockm/@types/config').Config}
 */
module.exports = async (util) => {
  const { expressjwt } = (await expressjwtPkg).default
  return {
    plugin: [util.plugin.validate, util.plugin.apiDoc],
    port: 8999,
    testPort: 8995,
    replayPort: 8991,
    watch: [`./api/`],
    api: {
      "use /": [
        expressjwt({
          secret: "al2pxxxxtx",
          algorithms: ["HS256"], //重要:签名算法（6.0以上版本必须加，否则报错）
        }).unless({
          path: [
            `/api/login`,
            `/doc`,
            `/doc/openApi.json`,
          ], // 接口白名单
        }),
      ],
      ...require(`./api/admin.js`)({side: util.side}),
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
