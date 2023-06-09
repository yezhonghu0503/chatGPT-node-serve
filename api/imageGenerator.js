const { openai } = require(`./util.js`)

module.exports = {
  async "post /imageGenerator/generate"(req, res) {
    const completion = await openai.createImage({
      prompt: req.body.prompt,
      n: 2,
      size: "1024x1024",
    });
    res.json(completion.data);
  },
};
