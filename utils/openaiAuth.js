import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config(); 
console.log(process.env.OPENAI_API_KEY)
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default openai;
