const {Schema}  = require('mongoose');
const mongoose = require("mongoose");

const routinsPmSchema = new Schema({
    routinRQ:{type:mongoose.Types.ObjectId,ref:'RoutinsRQ'},
    message:{type:String,required:true},
    user:{type:mongoose.Types.ObjectId,ref:"User"}
})
const RoutinsPM = mongoose.model("RoutinsPM",routinsPmSchema)

module.exports = RoutinsPM;