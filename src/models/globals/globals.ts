import mongoose, { Schema } from 'mongoose';

export interface IName {
  firstName: string;
  lastName: string;
  middleName?: string;
  displayName?: string;
  fullName: string; // Virtual
}

const NameSchema = new Schema<IName>(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      default: '',
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      default: '',
    },
    middleName: {
      type: String,
      required: false,
      trim: true,
      default: '',
    },
    displayName: {
      type: String,
      required: false,
      trim: true,
      default: '',
    },
  },
  {
    _id: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

NameSchema.virtual('fullName').get(function (this: IName) {
  return `${this.firstName} ${this.middleName ? this.middleName + ' ' : ''}${this.lastName}`.trim();
});

export default {
  NameEntity: NameSchema,
};
