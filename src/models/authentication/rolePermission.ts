import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { collectionMeta } from "../../utils/dbUtils";

export interface IRolePermission extends Document {
  description?: string;
  permission: Types.ObjectId;
  role: Types.ObjectId;
  expiresAt?: Date | null;
  createdBy: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  isExpired: boolean;
}

const RolePermissionSchema = new Schema<IRolePermission>(
  {
    description: {
      type: String,
      trim: true,
    },
    permission: {
      type: Schema.Types.ObjectId,
      ref: collectionMeta.Permission,
      required: [true, "Permission reference is required"],
      index: true,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: collectionMeta.Role,
      required: [true, "Role reference is required"],
      index: true,
    },
    expiresAt: {
      type: Date,
      default: null,
      index: true, 
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: collectionMeta.User,
      required: true,
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

RolePermissionSchema.index({ role: 1, permission: 1 }, { unique: true });

RolePermissionSchema.virtual("isExpired").get(function (this: IRolePermission) {
  if (!this.expiresAt) return false;
  return new Date() > this.expiresAt;
});

RolePermissionSchema.statics.findActivePermissions = function (roleId: Types.ObjectId) {
  return this.find({
    role: roleId,
    $or: [
      { expiresAt: null },
      { expiresAt: { $gt: new Date() } }
    ]
  }).populate("permission");
};

const RolePermission: Model<IRolePermission> = mongoose.model<IRolePermission>(
  collectionMeta.RolePermission,
  RolePermissionSchema
);

export { RolePermission };
