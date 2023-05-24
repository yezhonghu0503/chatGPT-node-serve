import express from "express";
import cors from "cors";

const app = express();

app.use(cors()); // 跨域
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(3000, () => {
  console.log("服务启动成功!");
});
