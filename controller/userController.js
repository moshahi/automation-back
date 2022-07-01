const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { default: axios } = require("axios");
// require('mongoose').Promise = require("bluebird");

exports.getUsers = (req,res)=>{
  User.find({})
      .then(resualt=>{res.status(200).json({success:true,data:resualt})})
      .catch(err=>{
        console.log(err)
        res.status(500).json({success:false,data:"اروری رخ داده است"})})
}

exports.newUser = async (req, res) => {
  const { fullName, phoneNumber, userName, password, role } = req.body;
  // console.log(req.body)
  const hashPassword = await bcrypt.hash(password, 10);
  await User.create({
    fullName,
    phoneNumber,
    userName,
    password: hashPassword,
    role,
  })
    .then((response) => {
      res.status(201).json({
        success: true,
        message: "کاربر با موفقیت ثبت شد",
        response,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "مشکلی از سمت سرور رخ داده است ",
        errMessage: err,
      });
    });
};

exports.handleLogin = async (req, res) => {
  try {
    
    const { phoneNumber, password } = req.body;
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "کاربری با این شماره وجود ندارد",
      });
    }
   const isMatch = await bcrypt.compare(password.toString(), user.password);
    console.log(isMatch)
    /*---- SMS Authenticat ---*/
//     let randomCode = Math.floor(Math.random() *100000)
//     let smsData = {
//       "op":"send",
//       "uname":process.env.SMS_USERNAME,
//       "pass":process.env.SMS_PASSWORD,
//       "message":`ورود به پرتال نورترازان کد:${randomCode}`,
//       "from":process.env.SMS_LINE,
//       "to":[phoneNumber]
//     }
//     console.log(smsData)
// let smsURL=`http://ippanel.com/api/select`;
//     await axios.post(smsURL,smsData,{'content-type': 'text/html; charset=UTF-8','Content-Type': 'application/json'}).then(response=>{console.log(response)}).catch(err=>console.log(err))
    if (isMatch) {
      const token = await jwt.sign(
        {
          user: {
            id: user._id,
            userName: user.userName,
            role: user.role,
            createdAt: user.createdAt,
            phoneNumber: user.phoneNumber,
            fullName: user.fullName,
          },
        },
        process.env.JWT_SECRET
      );
      res
        .status(200)
        .json({ success: true, token, userId: user._id, fullName:user.fullName });
   }
    res.status(422).json({
      success: false,
      message: "نام کاربری یا کلمه عبور اشتباه میباشد",
    });
  } catch (error){
    console.log(error);
  }
};
