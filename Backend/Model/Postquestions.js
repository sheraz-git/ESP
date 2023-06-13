const mongoose = require("mongoose");
const { Schema } = mongoose;
const Postquestion= new Schema({
  Questions: {
    type: String,
    require: true,
    unique: true
  },
  UserId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"user",
  require:true
  }
});
const questions = mongoose.model("PostQuestions", Postquestion);

module.exports = questions;