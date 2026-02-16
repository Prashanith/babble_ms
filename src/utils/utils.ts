import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { secrets } from './envUtils';

const hashPassword = async (password: String) => {
  const hashedPassword = await bcrypt.hash(password as string, 10);
  return hashedPassword;
};

const verifyHash = async (password: String, hashedPassword: String) => {
  const isAuthSuccess = await bcrypt.compare(password as string, hashedPassword as string);
  return isAuthSuccess;
};

const filterUserObject = (user: any, filters = ['password']) => {
  const filteredObj = user.toObject();
  filters.forEach((e) => {
    delete filteredObj[e];
  });

  return filteredObj;
};

const generateAccessToken = (payload: object) => jwt.sign(payload, secrets.ACCESS_TOKEN_SECRET);

const verifyAccessToken = (token: String) =>
  jwt.verify(token as string, secrets.ACCESS_TOKEN_SECRET);

export { hashPassword, verifyHash, filterUserObject, generateAccessToken, verifyAccessToken };
