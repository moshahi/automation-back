const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName:{type:String,required:true,trim:true, unique:true},
    fullName:{type:String,required:true,trim:true},
    password:{type:String,required:true,select:true},
    phoneNumber:{type:String,required:true, unique:true},
    role:{type:String,required:true},
    createdAt:{type:Date,default:Date.now()},
})

const User = mongoose.model('User', UserSchema);

module.exports = User;