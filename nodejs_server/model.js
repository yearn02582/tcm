const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  中草药编号: Number,
  中草药名称: String,
  症候编号: Number,
  实际该草药是否可治疗该疾病: Number,
  预测该草药是否可治疗该疾病: Number,
});

const Model = mongoose.model("test", schema);

module.exports = Model;
