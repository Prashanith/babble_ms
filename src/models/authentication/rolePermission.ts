import mongoose from "mongoose";
import { collectionMeta } from "../../utils/dbUtils";

const RolePermissionsEntity = new mongoose.Schema({
  description: String,
  permission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: collectionMeta.Permission,
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: collectionMeta.Role,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, default: null },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: collectionMeta.User },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: collectionMeta.User },
});

const rolePermissions = mongoose.model(
  collectionMeta.RolePermission,
  RolePermissionsEntity
);

export { rolePermissions };
