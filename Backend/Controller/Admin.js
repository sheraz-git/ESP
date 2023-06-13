const admin = require("../Model/Admin");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
exports.create = async (req, res) => {
  try {
    const{Name,Age,Phone_Number,Email,Account_no,Password,Username}=req.body;
    const saltRounds = 10;
    let hash = await bcrypt.hash(Password, saltRounds);
    const data = new admin({
      Name:Name,
      Age:Age,
      Phone_Number:Phone_Number,
      Email: Email,
      Password: hash,
      Account_no:Account_no,
      Username:Username
    });
    await data.save();
    return res.status(201).json({
      message: "User created successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
exports.login = async function (req, res) {
  try {
    const { Username, Password } = req.body;
    const admindata = await admin.findOne({ Username });
    if (!admindata) {
      return res.status(404).json({
        message: "Admin doesn't exist",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(Password, admindata.Password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    } else {
      const token = jwt.sign({ Username: `${Username}` }, "harry");
      return res.status(200).json({
         message: "login successful",
        token
      });
    }
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "server error" });
  }
};
exports.changepassword = async (req, res) => {
  try {
    const{Email,Password,changepassword}=req.body;
    // console.log(password);
    // console.log(changepassword);

    const admindata = await admin.findOne({ Email: Email });
    // console.log(admindata);
    const secpassword = admindata.Password;
    // console.log(secpassword);
    const checkpassword = await bcrypt.compare(Password, admindata.Password);
    //  console.log(checkpassword);
    if (checkpassword == true) {
      const saltRounds = 10;
      bcrypt.hash(changepassword, saltRounds, async function (err, hash) {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ message: "failed to hash new password" });
        }

        const updatedAdmin = await admin.findOneAndUpdate(
          { Email: Email },
          { Password: hash },
          { new: true }
        );

        return res.status(200).json({
          message: "Password changed successfully",
          updatedAdmin,
        });
      });
    } else {
      return res.status(200).json({
        message: "Incorrect current password",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};



exports.getloginAdmin = async (req, res) => {
  try {

     const Username=req.params.Username;
     console.log(Username);
     const findAdmin = await admin.findOne({ Username: Username });
console.log(findAdmin);
    if (!findAdmin) {
       return res.status(200).json({
        message: "Admin doesn't exist",
      });
    } else {
      return res.status(200).json({
        message: " Admin login successful",
        findAdmin
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};