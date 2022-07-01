const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    title:{type:String,required:true,trim:true},
    description:{type:String,required:true,trim:true},
    tabaOK:{type:String,default:"انتظار"},
    tabaText:{type:String,trim:true,default:" "},
    mohammadOK:{type:String,default:"انتظار"},
    mohammadText:{type:String,trim:true,default:" "},
    pardakhtOK:{type:String,default:"انتظار"},
    pardakhtText:{type:String,trim:true,default:" "},
    filename:{type:String,required:true},
    user:{type:mongoose.Types.ObjectId},
    createdAt:{type:Date,default:Date.now()},
})

const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;