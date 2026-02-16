import { FilterQuery, UpdateQuery, Types } from 'mongoose';
import { IPermission, Permission } from '../models/authentication/permission';

export const createPermission = async (data: Partial<IPermission>) => Permission.create(data);

export const findPermissionById = async (id: string | Types.ObjectId) => Permission.findById(id).exec();

export const listPermissions = async (f: FilterQuery<IPermission>, s: number, l: number) => 
  Permission.find(f).skip(s).limit(l).sort({ name: 1 }).lean().exec();

export const countPermissions = async (f: FilterQuery<IPermission>) => Permission.countDocuments(f);

export const updatePermission = async (id: string, d: UpdateQuery<IPermission>) => 
  Permission.findByIdAndUpdate(id, d, { new: true, runValidators: true }).exec();
