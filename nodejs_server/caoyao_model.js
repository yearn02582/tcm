const mongoose = require("mongoose");

const caoyaoSchema = new mongoose.Schema({
  caoyao_name: String,
  ID: Number,
});

const Caoyao = mongoose.model("caoyao", caoyaoSchema);

module.exports = Caoyao;
