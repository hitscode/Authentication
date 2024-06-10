const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const passwordComplexxity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7days",
  });
  return token;
};

const user = mongoose.model("User", userSchema);

const validate = (data) => {
  const schema = joi.object({
    firstname: Joi.String().require().label("First Name"),
    lastname: Joi.String().require().label("Last Name"),
    email: Joi.String().email().require().label("Email"),
    password: passwordComplexxity.require().label("Password"),
  });
  return schema.validate(data);
};

module.exports = { user, validate };
