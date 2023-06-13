const mongoose = require("mongoose");
const { Schema } = mongoose;
const VendorCatalogSchema = new Schema({
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
  VendorId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Vendor_data",
    require:true
  }
});

const VendorCatalog_data = mongoose.model("VendorCatalog_data", VendorCatalogSchema);
module.exports = VendorCatalog_data;
