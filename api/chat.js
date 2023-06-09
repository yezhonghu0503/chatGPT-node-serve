const { openai } = require(`./util.js`)

let defaultModel = "gpt-3.5-turbo";

module.exports = {
  // chatgpt对话
  async "post /chat/test"(req, res) {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `hello`,
      temperature: 0,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["\n"],
    })
    res.json(response)
  },
  // chatgpt对话
  async "post /chat/talks"(req, res) {
    const modelName = defaultModel || req.body.modelName
    console.log({modelName, body: req.body})
    if (!req.body.msg) {
      res.status(404).send("msg为空");
    }
    if (!Array.isArray(req.body.msg)) {
      res.status(400).send("参数格式有误，请检查参数格式");
    }
    const completion = await openai.createChatCompletion({
      model: modelName,
      messages: req.body.msg,
    }).catch(err => {
      console.log(`err`, err.data)
    })
    res.json(completion);
  },
  
  // chat模型列表
  async 'get /chat/versionList'(req, res) {
    const completion = await openai.listModels();
    res.json(completion)
  },
  
  // 切换模型
  'post /chat/switchModel': `模型更换成功`,
  
  // 修改对话角色
  'post /chat/switchRole': `todo`,
  
  // 获取历史对话消息
  'get /chat/getMessages': `todo`,
  
  // 存储历史对话消息
  'post /chat/saveMessages'(req, res) {
    // 获取用户新增的对话消息
    // 数据库根据用户id检索历史对话消息列表=>或者调用历史对话列表接口
    // 组成新的历史对话消息列表，修改数据库存储值
  },
};
