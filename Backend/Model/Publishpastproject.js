const mongoose=require("mongoose");
const {Schema}=mongoose;
const Publishpastproject= new Schema({

    ProjectName:{
        type:String,
        require:true        
    },
    Description:{
        type:String,
        require:true
    },
    Image:{
        type:String,
        require:true,
         },
    Video:{
        type:String,
        require:true  
    },
    VendorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"vendor",
        require: true
    }
});
const pastprojects = mongoose.model("pastproject", Publishpastproject);
module.exports = pastprojects;