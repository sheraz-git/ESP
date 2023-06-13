const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
  Name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  contact: {
    type: Number,
    require: false,
    default: null,
  },
  email: {
    type: String,
    require: false,
    unique: true,
    default: null,
  },
  accountNo: {
    type: String,
    require: true,
    unique: true
  },
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: false,
    default: null,
  },
});

const User_data = mongoose.model("User_data", UserSchema);
module.exports = User_data;
