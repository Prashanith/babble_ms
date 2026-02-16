import { User, IUser } from '../models/user/user';
import { UserRole, IUserRole } from '../models/userRole/userRole';
import { FilterQuery, UpdateQuery, Types } from 'mongoose';

// --- User Operations ---
export const createUser = async (data: Partial<IUser>) => User.create(data);

export const findUserById = async (id: string | Types.ObjectId) => User.findById(id).exec();

export const listUsers = async (f: FilterQuery<IUser>, s: number, l: number) => 
  User.find(f).skip(s).limit(l).sort({ createdAt: -1 }).lean().exec();

export const countUsers = async (f: FilterQuery<IUser>) => User.countDocuments(f);

export const updateUser = async (id: string, d: UpdateQuery<IUser>) => 
  User.findByIdAndUpdate(id, d, { new: true, runValidators: true }).exec();

// --- User-Role Operations ---
export const createUserRole = async (data: Partial<IUserRole>) => UserRole.create(data);

export const findUserRoles = async (userId: string) => 
  UserRole.find({ user: userId }).populate('role').lean().exec();

export const findUserRoleById = async (id: string) => 
  UserRole.findById(id).populate('role').exec();

export const updateUserRole = async (id: string, d: UpdateQuery<IUserRole>) => 
  UserRole.findByIdAndUpdate(id, d, { new: true }).exec();

export const deleteUserRole = async (id: string) => UserRole.findByIdAndDelete(id).exec();
