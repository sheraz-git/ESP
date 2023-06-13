const Usersignup = require("../Model/UserModel-Signup");
const jwt = require("jsonwebtoken");

exports.loginuser = async (req, res) => {
  try {
    const Username = req.body.Username;
    const Password = req.body.Password;

    const finduser = await Usersignup.findOne({ Username: Username, Password: Password });

    if (!finduser) {
      return res.status(404).json({
        message: "User doesn't exist",
      });
    } else {
      const token = jwt.sign({ _id: finduser._id,Username: `${Username}` }, "harry");
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

exports.getloginuser = async (req, res) => {
  try {

     const Username=req.params.Username;
     console.log(Username);
     const finduser = await Usersignup.findOne({ Username: Username });
console.log(finduser);
    if (!finduser) {
       return res.status(200).json({
        message: "User doesn't exist",
      });
    } else {
      return res.status(200).json({
        message: "login successful",
        finduser
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

exports.updateloginuser = async (req, res) => {
  try {

     const Username=req.params.Username;
     console.log(Username);
     const {Name,Age,Phone_Number,Email,Account_no,Password  }= req.body;
    //  const finduser = await Usersignup.findOne({ Username: Username });
    //  console.log(finduser);
const finduser = await Usersignup.findOneAndUpdate(
  { Username: Username },
  { Name: Name, Age: Age, Phone_Number: Phone_Number, Email: Email, Account_no: Account_no, Password: Password },
  { new: true }
);
     console.log(finduser);

    if (!finduser) {
       return res.status(200).json({
        message: "User doesn't exist",
      });
    } else {
      return res.status(200).json({
        message: "update succefully",
        finduser
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

