import express from "express";
import openai from "../utils/openaiAuth.js";

const app = express();
const router = express.Router();

router.post("/imageGenerator/generate", async (req, res) => {
  // 旧版图像生成接口
  // const completion = await openai.createImage({
  //   prompt: req.body.prompt,
  //   n: 2,
  //   size: "1024x1024",
  // });
  const image = await openai.images.generate({
    model: "dall-e-3",
    prompt: params.prompt,
  });
  res.send(image.data);
});

export default router;
