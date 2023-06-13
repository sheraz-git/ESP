const express=require("express");
const app=express();
const bodyparser=require("body-parser");
const connectToMongo=require("./Helper/database");
const cookieParser = require("cookie-parser");
const port=3000;
const cors=require('cors');
const mainRoute= require("./Routes/UserRoute-Signup");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
connectToMongo();
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:3001",
  optionsSuccessStatus:200
}))

app.listen(port,()=>{
console.log("working");
});
app.get('/',(req,res)=>{

return res.status(200).json({
message:"worked fine"
});
})
app.use("/api",mainRoute,(req, res) => {
      res.status(404).json({
        success: false,
        message: "Page not found",
        error: {
          statusCode: 404,
          message: "You reached a route that is not defined on this server",
        },
      });
    }
  );