const mongoose = require("mongoose");
const { Schema } = mongoose;
const VendorAddressSchema = new Schema({
  addressState: {
    type: String,
    require: true,
  },
  addressCity: {
    type: String,
    require: true,
  },
  addressPostcode: {
    type: Number,
    require: false,
    default: null,
  },
});

const VendorAddress_data = mongoose.model("VendorAddress_data", VendorAddressSchema);
module.exports = VendorAddress_data;
