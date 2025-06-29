import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secrets } from "./envUtils.ts";

const hashPassword = async (password: String) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const verifyHash = async (password: String, hashedPassword: String) => {
  const isAuthSuccess = await bcrypt.compare(password, hashedPassword);
  return isAuthSuccess;
};

const filterUserObject = (user: any, filters = ["password"]) => {
  const filteredObj = user.toObject();
  filters.forEach((e) => {
    delete filteredObj[e];
  });

  return filteredObj;
};

const generateAccessToken = (payload: object) =>
  jwt.sign(payload, secrets.ACCESS_TOKEN_SECRET);

const verifyAccessToken = (token: String) =>
  jwt.verify(token, secrets.ACCESS_TOKEN_SECRET);

export {
  hashPassword,
  verifyHash,
  filterUserObject,
  generateAccessToken,
  verifyAccessToken,
};
