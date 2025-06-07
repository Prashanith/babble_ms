import mongoose from "mongoose";
import validator from "../../constants/validator";
import globals from "./../globals/globals";

const UserEntity = mongoose.Schema({
  name: {
    type: globals.NameEntity,
    required: false,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: "Invalid Email",
    },
  },
  mobile: {
    type: String,
    require: false,
    validate: {
      validator: (v) => validator.isMobile(v),
      message: "Invalid Mobile Number",
    },
  },
  role: globals.RoleEntity,
  password: {
    type: String,
    required: true,
    // validate: {
    //   validator: (v) => validator.isValidPassword(v),
    //   message: "The password doesn't meet the security requirements",
    // },
  },
});

const users = mongoose.model("users", UserEntity);

export { users };
