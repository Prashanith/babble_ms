import mongoose from "mongoose";
import { collectionMeta } from "../../utils/dbUtils";

const PermissionEntity = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: collectionMeta.User },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: collectionMeta.User },
});

const permissions = mongoose.model(collectionMeta.Permission, PermissionEntity);

export { permissions };
