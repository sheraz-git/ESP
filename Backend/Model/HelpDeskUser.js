const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserDeskSchema = new Schema({
  ticketQuestion: {
    type: String,
    require: false,
    unique: true,
    default: null,
  },
  ticketTimestamps: {
    type: String,
    require: false,
    default: null,
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User_data",
    require:true
  }
});

const UserDesk_data = mongoose.model("UserDesk_data", UserDeskSchema);
module.exports = UserDesk_data;
