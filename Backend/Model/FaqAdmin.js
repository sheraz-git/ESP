const mongoose = require("mongoose");
const { Schema } = mongoose;
const AdminFaqSchema = new Schema({
  faqQuestion: {
    type: String,
    require: false,
    unique: true,
    default: null,
  },
  faqsolution: {
    type: String,
    require: false,
    default: null,
  },
  AdminId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Admin_data",
    require:true
  }
});

const AdminFaq_data = mongoose.model("AdminFaq_data", AdminFaqSchema);
module.exports = AdminFaq_data;
