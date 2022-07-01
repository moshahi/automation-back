const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const Yup = require("yup");

const routinsSchema = mongoose.Schema({
  routinName: { type: String, unique: true, trim: true },
  requestUsers: {},
  confirmationUsers: {},
  createdAt: { type: Date, default: Date.now() },
  userCreated: { type: mongoose.Types.ObjectId, required: true },
});
const schema = Yup.object().shape({
  routinName: Yup.string()
    .required("نام روال الزامی میباشد")
    .min(5, "نام روال نباید کمتر از 5 کاراکتر باشد")
    .trim(),
});
routinsSchema.statics.routinsValidation = function (body) {
  return schema.validate(body, { abortEarly: false });
};
const Routins = mongoose.model("Routins", routinsSchema);

module.exports = Routins;
