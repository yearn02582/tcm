const MONGO_SERVER_ADDRESS =
  "mongodb+srv://zyc020520:qtppmF9HdmdHRKjP@tcm.bf5ie4c.mongodb.net/?retryWrites=true&w=majority";
const PORT = 10000;
const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const Model = require("./model");
//const cors = require("cors");
const Caoyao = require("./caoyao_model");
const serverless = require("serverless-http");

mongoose.connect(MONGO_SERVER_ADDRESS).then(() => {
  console.log("Mongo服务器连接成功", MONGO_SERVER_ADDRESS);
});

const app = express();

//app.use(cors());
const suoyinData = JSON.parse(fs.readFileSync("./suoyin.json", "utf-8"));

// app.listen(PORT, () => {
//   console.log(`服务器监听于端口${PORT}`);
// });

//用于根据症候获取对应ID

app.get("/zhenghou/:name", (req, res, next) => {
  const theId = suoyinData.filter((e) => {
    return String(e.symptoms).includes(req.params.name);
  });

  if (theId) {
    res.status(200).json({
      status: "scuess",
      theId,
    });
    return;
  } else {
    res.status(200).json({
      status: "fail",
      reason: "不存在的症候名",
    });
  }
});

//告知症候ID 返回实际可治疗的草药编号列表

app.get(
  "/reality/:id",
  catchAsync(async (req, res, next) => {
    const result = await Model.find()
      .where("症候编号")
      .equals(Number(req.params.id))
      .where("实际该草药是否可治疗该疾病")
      .equals(1)
      .select("-预测该草药是否可治疗该疾病");

    let newData = [];

    for (let sing of result) {
      const tem = await Caoyao.findOne().where("ID").equals(sing.中草药编号);

      newData.push({ ...sing._doc, caoyao_name: tem.caoyao_name });
    }

    res.status(200).json({
      status: "scuess",
      newData,
    });
  })
);

//告知症候ID 返回预测可治疗的草药编号列表

app.get(
  "/prediction/:id",
  catchAsync(async (req, res, next) => {
    let result = await Model.find()
      .where("症候编号")
      .equals(Number(req.params.id))
      .where("预测该草药是否可治疗该疾病")
      .equals(1)
      .select("-实际该草药是否可治疗该疾病");

    let newData = [];

    for (let sing of result) {
      const tem = await Caoyao.findOne().where("ID").equals(sing.中草药编号);

      newData.push({ ...sing._doc, caoyao_name: tem.caoyao_name });
    }

    res.status(200).json({
      status: "scuess",
      newData,
    });
  })
);

//捕获错误

app.all("*", (req, res, next) => {
  res.status(404).send("404 not found");
});

function catchAsync(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch((e) => {
      console.log(e.message);
    });
  };
}

const handler = serverless(app);

module.exports = handler;
