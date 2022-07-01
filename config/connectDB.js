const mongoose = require('mongoose');
exports.connectDB = ()=>{mongoose.connect('mongodb://localhost:27017/noortarazan2')
    .then(resualt=>console.log(`DB connected`))
    .catch(err=>console.log(err))}