import * as repo from '../../repositories/userRepository';
import { hashPassword, filterUserObject } from '../../utils/utils';
import { UserNotFound } from '../../constants/errorCodes/ids/userNotFound';

// --- User Service (5 APIs) ---
export const registerUser = async (data: any) => {
  if (data.password) data.password = await hashPassword(data.password);
  const user = await repo.createUser(data);
  return filterUserObject(user);
};

export const getAllUsers = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const [users, total] = await Promise.all([
    repo.listUsers({ isActive: true }, skip, limit),
    repo.countUsers({ isActive: true })
  ]);
  return { users, pagination: { total, page, pages: Math.ceil(total / limit) } };
};

export const getUserById = async (id: string) => {
  const user = await repo.findUserById(id);
  if (!user) throw new UserNotFound();
  return filterUserObject(user);
};

export const updateUser = async (id: string, data: any) => {
  if (data.password) data.password = await hashPassword(data.password);
  const updated = await repo.updateUser(id, data);
  return filterUserObject(updated!);
};

export const deleteUser = async (id: string) => {
  await repo.updateUser(id, { isActive: false });
  return { success: true };
};

// --- User-Role Service (5 APIs) ---
export const addUserRole = async (userId: string, roleId: string, adminId: string) => 
  repo.createUserRole({ user: userId as any, role: roleId as any, createdBy: adminId as any });

export const getUserRoles = async (userId: string) => repo.findUserRoles(userId);

export const getUserRoleDetail = async (userRoleId: string) => {
  const res = await repo.findUserRoleById(userRoleId);
  if (!res) throw new Error("Assignment not found");
  return res;
};

export const updateRoleAssignment = async (id: string, data: any) => repo.updateUserRole(id, data);

export const removeUserRole = async (id: string) => {
  await repo.deleteUserRole(id);
  return { success: true };
};
