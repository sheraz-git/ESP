const vendor= require("../Model/Vendor");
const jwt = require("jsonwebtoken");
exports.create =async (req,res)=>{
try{  
  const{Username,Email,Password,Phone_Number,Account_no,State,City,Post_code}=req.body;
  const finduser = await vendor.findOne({Email:Email}); 
  if(finduser){
  return res.status(201).json({
    message: " already created"
  });
  }
  else{
const created=await vendor.create({
    Username:Username,
    Email:Email,
    Password:Password,
    Phone_Number:Phone_Number,
    Account_no:Account_no,
    State:State,
    City:City,
    Post_code:Post_code
})
return res.status(201).json({
  message: "created",created
});
}}
catch (error) {
  return res.status(500).json({
    message: "Server error",
  });
}}

exports.getvendor=async (req,res)=>{
  try{
  const finduser = await vendor.find({});
  console.log(finduser);
  return res.status(200).json({
    message: "All users",finduser
  });
  }

  catch(error){
    return res.status(500).json({
      message: "server error"
    });      
  }
}


exports.loginvendor = async (req, res) => {
  try {
    const Username = req.body.Username;
    const Password = req.body.Password;
    console.log(Username,Password);

    const findvendor = await vendor.findOne({ Username: Username, Password: Password });
console.log(findvendor);

    if (!findvendor) {
      return res.status(404).json({
        message: "vendor doesn't exist",
      });
    } 
    else {
      const token = jwt.sign({ _id: findvendor._id, Username: `${Username}`}, "harry");
      return res.status(200).json({
         message: "login successful",
        token
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

exports.getloginvendor = async (req, res) => {
  try {
     const Username=req.params.Username;
     console.log(Username);
     const findvendor = await vendor.findOne({ Username: Username });
console.log(findvendor);
    if (!findvendor) {
       return res.status(200).json({
        message: "vendore doesn't exist",
      });
    } else {
      return res.status(200).json({
        message: "login successful",
        findvendor
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};



