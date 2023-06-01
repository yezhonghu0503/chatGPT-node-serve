import express from "express";
import openai from "../utils/openaiAuth.js";

const app = express();
const router = express.Router();

router.post("/imageGenerator/generate", async (req, res) => {
  const completion = await openai.createImage({
    prompt: "A cute baby sea otter",
    n: 2,
    size: "1024x1024",
  });
});

export default router;
