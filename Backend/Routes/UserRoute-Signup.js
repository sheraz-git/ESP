const multer = require('multer');
const path = require('path');
const express=require("express");
const admin=require("../Controller/Admin");
const signup=require("../Controller/User-Signup");
const login=require("../Controller/User-loign");
const vendor=require("../Controller/Vendor");
const postquestions=require("../Controller/Postquestions");
const project=require("../Controller/PublishPastprojects");

const auth=require("../Middleware/Authentication");
const router = express.Router();
///// admin/////
router.post("/admin",admin.create);
router.post("/adminlogin",admin.login);
router.post("/adminchangepassword",admin.changepassword);
router.get("/getloginAdmin/:Username",admin.getloginAdmin);


///// user/////
router.post('/signup',signup.create);
router.get("/getsignup",signup.getuser);
router.post('/checkuser',login.loginuser);
router.get('/getloginuser/:Username',login.getloginuser);
router.put('/updateloginuser/:Username',login.updateloginuser);

///////////////vendor////
router.post('/vendorsignup',vendor.create);
router.post('/loginvendor',vendor.loginvendor);
router.get("/getloginvendor/:Username",vendor.getloginvendor);


//// mullter////
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Multer');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });



// ////////pastprojects//////////////
router.post("/uploadprojects", upload.fields([{ name: 'Image' }, { name: 'Video' }]), project.pastprojects);
router.get("/getuploadprojects",project.getproject);
router.get("/getallprojects",project.getallprojects);



//////postquestions///
router.post('/uploadquestions',postquestions.uploadquestions);
router.get("/getquestions",postquestions.getquestions);
router.get('/sendEmailToUser',postquestions.sendEmailToUser);
router.post('/sendEmailToUser',postquestions.sendEmailToUser);
module.exports = router;