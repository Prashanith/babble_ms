import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { collectionMeta } from "../../utils/dbUtils";

export interface IRole {
  name: string;
  description: string;
  isActive: boolean;
  createdBy: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const RoleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      required: [true, "Role name is required"],
      unique: true, 
      trim: true,  
      minlength: [3, "Role name must be at least 3 characters"],
      index: true,
    },
    description: {
      type: String,
      required: [true, "Role description is required"],
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true, 
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: collectionMeta.User,
      required: true,
      index: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: collectionMeta.User,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

RoleSchema.index({ name: 1, isActive: 1 });

const Role: Model<IRole> = mongoose.model<IRole>(collectionMeta.Role, RoleSchema);

export { Role };
