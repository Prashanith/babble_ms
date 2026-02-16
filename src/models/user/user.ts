import mongoose from "mongoose";
import validator from "../../constants/validator";
import globals from "./../globals/globals";
import { collectionMeta } from "../../utils/dbUtils";

const UserEntity = new mongoose.Schema({
  name: {
    type: globals.NameEntity,
    required: false,
  },
  email: {
    type: String,
    validate: {
      validator: (v: string) => validator.isEmail(v),
      message: "Invalid Email",
    },
  },
  mobile: {
    type: String,
    validate: {
      validator: (v: string) => validator.isMobile(v),
      message: "Invalid Mobile Number",
    },
  },
  password: {
    type: String,
    validate: {
      validator: (v: string) => validator.isValidPassword(v),
      message: "The password doesn't meet the security requirements",
    },
  },
});

const users = mongoose.model(collectionMeta.User, UserEntity);

export { users };
