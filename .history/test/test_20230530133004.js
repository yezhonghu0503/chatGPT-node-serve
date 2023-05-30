import express from "express";
const app = express();

app.get("/test/chat", (res, req) => {
  const timer = null;
  const testString = "abcdefg";
  let i = 0;
  timer = setInterval(() => {
    req.send(testString.charAt(i));
    i++;
  }, 500);
  req.send();
});

app.listen(3001, () => {
  console.log("server start");
});
