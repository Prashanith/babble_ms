import mongoose from "mongoose";
import { collectionMeta } from "../../utils/dbUtils";

const UserRoleEntity = new mongoose.Schema({
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: collectionMeta.User,
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: collectionMeta.UserRole,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, default: null },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: collectionMeta.User },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: collectionMeta.User },
});

const userRoles = mongoose.model(collectionMeta.UserRole, UserRoleEntity);

export { userRoles };
