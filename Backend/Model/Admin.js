const mongoose = require("mongoose");
const { Schema } = mongoose;
const Adminlogin= new Schema({
  Name:{
    type:String,
    require:true
},
Age:{
    type:Number,
    require:true
},
Phone_Number:{
    type:Number,
    require:true
},
Email:{
    type:String,
    require:true
},
Account_no:{
    type:Number,
    require:true
},
Username:{
    type:String,
    require:true        
},
Password:{
    type:String,
    require:true        
},
UserId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    require:true
    }
});
const admins = mongoose.model("admin", Adminlogin);

module.exports = admins;