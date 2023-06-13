const questions=require("../Model/Postquestions");
const nodemailer = require('nodemailer');
exports.uploadquestions = async (req,res)=>{
    try{  
      const UserId = req.headers._id;
        const{Questions}=req.body;
        console.log(UserId);
        const post = await questions.findOne({Questions:Questions,UserId:UserId}); 
        if(post){
        return res.status(201).json({
          message: " this question already exist"
        });
        }
        else{
      const created=await questions.create({
        Questions:Questions,
        UserId:UserId
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

   exports.getquestions = async (req,res)=>{
        try{  
          const get = await questions.find({})
            .populate('UserId', ['Username']);
          return res.status(200).json({
            message: "get",
            questions: get
          });
        }
        catch (error) {
          return res.status(500).json({
            message: "Server error",
          });
        }
      }

      exports.sendEmailToUser = async (req,res) => {
        try {
          const { answer } = req.body;
          const mail = await questions.find({}).populate('UserId');
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
          for (const question of mail) {
            const user = question.UserId;
            console.log(user);
            const mailOptions = {
              from: 'sherazabbas669@gmail.com',
              to: user.Email,
              subject: 'TODAY IS LIVE MATCH',
              html: `<p>${answer}</p>`
            };
            const info = await transporter.sendMail(mailOptions);
            console.log(`Email sent to ${user.Email}: ${info.response}`);
          }
          return res.status(200).json({

            message:"Email sent to user"
          }); 
               } catch (error) {
          console.error(`Error sending email: ${error}`);
          return { success: false, error };
        }
      };