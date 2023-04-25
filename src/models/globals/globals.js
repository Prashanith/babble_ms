import mongoose from "mongoose";

const RoleEntity = mongoose.Schema({
  type: String,
  enum: ["USER", "SUPPORT", "ADMIN"],
});

const NameEntity = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    default: "",
  },
  lastName: {
    type: String,
    required: true,
    default: "",
  },
  middleName: {
    type: String,
    required: false,
    default: "",
  },
  displayName: {
    type: String,
    required: false,
    default: "",
  },
});


export default {
  RoleEntity,
  NameEntity
};
