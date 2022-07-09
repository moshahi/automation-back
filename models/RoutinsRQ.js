const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const routinsRQSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  routin: { type: Object },
  messages: {},
  filename: { type: String, required: true },
  confirm: {
    type: String,
    enum: ["confirm", "disapproval", "none"],
    default: "none",
  },
  userCreated: { type: mongoose.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now() },
});

const RoutinsRQ = mongoose.model("RoutinsRQ", routinsRQSchema);

module.exports = RoutinsRQ;
