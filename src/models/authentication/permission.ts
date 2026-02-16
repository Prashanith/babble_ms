import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { collectionMeta } from "../../utils/dbUtils";

export interface IPermission extends Document {
  name: string;
  description: string;
  isActive: boolean;
  createdBy: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const PermissionSchema = new Schema<IPermission>(
  {
    name: {
      type: String,
      required: [true, "Permission name is required"],
      unique: true,
      trim: true,
      lowercase: true, 
      minlength: [3, "Permission name must be at least 3 characters"],
      index: true,
    },
    description: {
      type: String,
      required: [true, "Permission description is required"],
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

PermissionSchema.index({ name: 1, isActive: 1 });

const Permission: Model<IPermission> = mongoose.model<IPermission>(
  collectionMeta.Permission,
  PermissionSchema
);

export { Permission };