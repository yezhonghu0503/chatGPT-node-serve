import { Configuration, OpenAIApi } from "openai";
export default function openaiAuth() {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
}
