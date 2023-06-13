const mongoose=require("mongoose");
const {Schema}=mongoose;
const signup= new Schema({

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
});
const signupuser = mongoose.model("user", signup);
module.exports = signupuser;