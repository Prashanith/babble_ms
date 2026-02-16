import { FilterQuery, UpdateQuery, Types } from 'mongoose';
import { IRole, Role } from '../models/authentication/role';
import { IRolePermission, RolePermission } from '../models/authentication/rolePermission';

// --- Role Operations (5) ---
export const createRole = async (data: Partial<IRole>) => Role.create(data);

export const findRoleById = async (id: string | Types.ObjectId) => Role.findById(id).exec();

export const listRoles = async (f: FilterQuery<IRole>, s: number, l: number) => 
  Role.find(f).skip(s).limit(l).sort({ name: 1 }).lean().exec();

export const countRoles = async (f: FilterQuery<IRole>) => Role.countDocuments(f);

export const updateRole = async (id: string, d: UpdateQuery<IRole>) => 
  Role.findByIdAndUpdate(id, d, { new: true, runValidators: true }).exec();

// --- Role-Permission Operations (5) ---
export const createRolePermission = async (data: Partial<IRolePermission>) => RolePermission.create(data);

export const findRolePermissions = async (roleId: string) => 
  RolePermission.find({ role: roleId }).populate('permission').lean().exec();

export const findRolePermissionById = async (id: string) => 
  RolePermission.findById(id).populate('permission').exec();

export const updateRolePermission = async (id: string, d: UpdateQuery<IRolePermission>) => 
  RolePermission.findByIdAndUpdate(id, d, { new: true }).exec();

export const deleteRolePermission = async (id: string) => RolePermission.findByIdAndDelete(id).exec();
