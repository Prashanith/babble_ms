import mongoose, { Schema, Document, Model } from 'mongoose';
import validator from '../../constants/validator';
import globals from './../globals/globals';
import { collectionMeta } from '../../utils/dbUtils';

export interface IUser extends Document {
  name?: any;
  email: string;
  mobile: string;
  password?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: globals.NameEntity,
      required: false,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (v: string): boolean => !!validator.isEmail(v),
        message: 'Invalid Email',
      },
      index: true,
    },
    mobile: {
      type: String,
      required: [true, 'Mobile number is required'],
      unique: true,
      trim: true,
      validate: {
        validator: (v: string): boolean => !!validator.isMobile(v),
        message: 'Invalid Mobile Number',
      },
      index: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
      validate: {
        validator: (v: string): boolean => !!validator.isValidPassword(v),
        message: "The password doesn't meet the security requirements",
      },
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

UserSchema.index({ email: 1, isActive: 1 });

const User: Model<IUser> = mongoose.model<IUser>(collectionMeta.User, UserSchema);

export { User };
