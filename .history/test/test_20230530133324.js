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
  //   setTimeout(() => {
  //     clearInterval(timer);
  //   }, 10 * 1000);
  req.send(testString);
});

app.listen(3001, () => {
  console.log("server start");
});
