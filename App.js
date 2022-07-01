const path = require('path');

const express = require("express"),
  app = express();
  require('dotenv').config();

// const cors = require("cors");
// app.use(cors());
// const morgan = require("morgan")


const { setHeader } = require("./config/Headers");
const {connectDB} = require('./config/connectDB');
app.use(express.urlencoded({extended:false}))
app.use(express.json());
// app.use()
app.use(setHeader)
connectDB()

app.use("/public",express.static(path.join(__dirname, "public")))


app.use("/users", require("./routes/users"));
app.use("/tickets", require("./routes/ticket"));
app.use("/routins", require("./routes/routin"));

app.listen(5000, () => {
  console.log(`app run 5000`);
});