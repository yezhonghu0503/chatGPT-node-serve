import express from "express";
import openai from "../utils/openaiAuth.js";

const app = express();
const router = express.Router();
let defaultModel = "gpt-3.5-turbo";

// chatgpt对话接口
router.post("/chat/talks", async (req, res) => {
  const modelName = defaultModel;
  console.log(req.body.msg);
  console.log(req.body.modelName)
  if(!req.body.msg){
    res.status(404).send('msg为空');
  }
  req.body.modelName?model = req.body.modelName:'';
  console.log(modelName)
  const completion = await openai.createChatCompletion({
    model: modelName,
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
