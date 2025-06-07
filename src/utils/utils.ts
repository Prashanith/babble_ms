import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secrets } from "./envUtils";

const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const verifyHash = async (password, hashedPassword) => {
  const isAuthSuccess = await bcrypt.compare(password, hashedPassword);
  return isAuthSuccess;
};

const filterUserObject = (user, filters = ["password"]) => {
  const filteredObj = user.toObject();
  filters.forEach((e) => {
    delete filteredObj[e];
  });

  return filteredObj;
};

const generateAccessToken = (payload) =>
  jwt.sign(payload, secrets.ACCESS_TOKEN_SECRET);

const verifyAccessToken = (token: string) =>
  jwt.verify(token, secrets.ACCESS_TOKEN_SECRET);

export {
  hashPassword,
  verifyHash,
  filterUserObject,
  generateAccessToken,
  verifyAccessToken,
};
