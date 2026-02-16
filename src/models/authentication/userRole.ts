import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { collectionMeta } from "../../utils/dbUtils";

export interface IUserRole extends Document {
  description?: string;
  user: Types.ObjectId;
  role: Types.ObjectId;
  expiresAt?: Date | null;
  createdBy: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  isExpired: boolean;
}

const UserRoleSchema = new Schema<IUserRole>(
  {
    description: {
      type: String,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: collectionMeta.User,
      required: [true, "User reference is required"],
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

UserRoleSchema.index({ user: 1, role: 1 }, { unique: true });

UserRoleSchema.virtual("isExpired").get(function (this: IUserRole) {
  if (!this.expiresAt) return false;
  return new Date() > this.expiresAt;
});

UserRoleSchema.statics.findValidRoles = function (userId: string | Types.ObjectId) {
  return this.find({
    user: userId,
    $or: [
      { expiresAt: null },
      { expiresAt: { $gt: new Date() } }
    ]
  }).populate("role");
};

const UserRole: Model<IUserRole> = mongoose.model<IUserRole>(
  collectionMeta.UserRole,
  UserRoleSchema
);

export { UserRole };
