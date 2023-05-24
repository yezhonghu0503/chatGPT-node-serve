/**
const openai = require('openai');
const API_KEY = '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';

openai.api_key = API_KEY;

const prompt = "Hello, how are you?";
const model = 'text-davinci-002';
const chat_log = ["Hello, how are you?","I'm fine, thank you. How about you?"];

console.log(openai.OpenAIApi)
openai.Completion.create({
  engine: model,
  prompt: prompt,
  max_tokens: 150,
  temperature: 0.5,
  n: 1,
  stop: '\n',
  presence_penalty: 0.6,
  frequency_penalty: 0.6,
  context: chat_log,
}).then((response) => {
  console.log(response.choices[0].text);
}).catch((error) => {
  console.log(error);
});
*/
const dotenv = require("dotenv")
const express = require('express')
const { Configuration, OpenAIApi } = require("openai");

const app = express()
const port = 3000;
dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/chat', async (req, res) => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: req.query.msg }],
  });
  res.send(completion.data.choices[0].message)
})

app.get('/versionList', async (req, res) => {
  const completion = await openai.listModels();
  res.send(completion)
})

app.listen(port, () => {
  console.log('服务已启动')
})