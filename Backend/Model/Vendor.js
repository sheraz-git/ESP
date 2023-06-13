const mongoose=require("mongoose");
const {Schema}=mongoose;
const vendorsignup= new Schema({

    Username:{
        type:String,
        require:true        
    },
    Email:{
        type:String,
        require:true
    },
    Password:{
    type:String,
    require:true        
    },
    Phone_Number:{
        type:Number,
        require:true
    },
    Account_no:{
        type:Number,
        require:true
    },
    State:{
    type:String,
        require:true        
    },
    City:{
        type:String,
        require:true        
    },
    Post_code:{
        type:String,
        require:true        
    },
});
const signupvendor = mongoose.model("vendor", vendorsignup);
module.exports = signupvendor;