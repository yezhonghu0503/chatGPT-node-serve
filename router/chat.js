import express from "express";
import openai from "../utils/openaiAuth.js";

const app = express();
const router = express.Router();
let defaultModel = "gpt-3.5-turbo";

// chatgpt对话接口
router.post("/chat/talks", async (req, res) => {
  const modeName = defaultModel;
  if(!res.boay.msg){
    res.status(404).send('msg为空')
  }
  res.boay.modelName?model = res.boay.modelName:''
  const completion = await openai.createChatCompletion({
    model: modeName,
    messages: [{ role: "user", content: req.body.msg }],
  });
  res.send(completion);
});

// chat模型列表接口
router.get("/chat/versionList", async (req, res) => {
    const completion = await openai.listModels();
    res.send(completion);
});

// 切换模型接口
router.post("/chat/switchModel",async (req,res)=>{
  // modelName = req.body.modelName;
  // res.send('模型更换成功')
})

// 修改对话角色接口
router.post("/chat/switchRole", async (req,res)=>{

})
export default router;
