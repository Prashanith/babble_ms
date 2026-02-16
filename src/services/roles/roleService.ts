import * as repo from '../../repositories/roleRepository';
import { ResponseCodes } from '../../constants/codes';
import { HttpError } from '../../models/http/error';

// --- Role Service (5 APIs) ---
export const registerRole = async (data: any) => {
  const name = data.name.toLowerCase().trim();
  const existing = await repo.listRoles({ name }, 0, 1);
  if (existing.length > 0) throw new HttpError(ResponseCodes.BB409, "Role already exists");
  return await repo.createRole({ ...data, name });
};

export const getAllRoles = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const [roles, total] = await Promise.all([
    repo.listRoles({ isActive: true }, skip, limit),
    repo.countRoles({ isActive: true })
  ]);
  return { roles, pagination: { total, page, pages: Math.ceil(total / limit) } };
};

export const getRoleById = async (id: string) => {
  const role = await repo.findRoleById(id);
  if (!role) throw new HttpError(ResponseCodes.BB404, "Role not found");
  return role;
};

export const updateRole = async (id: string, data: any) => {
  if (data.name) data.name = data.name.toLowerCase().trim();

  const updated = await repo.updateRole(id, data);

  if (!updated) {
    throw new HttpError(ResponseCodes.BB404, "Role not found or update failed");
  }

  return updated; 
};

export const deleteRole = async (id: string) => {
  await repo.updateRole(id, { isActive: false });
  return { success: true };
};

// --- Role-Permission Service (5 APIs) ---
export const addPermissionToRole = async (roleId: string, permId: string, adminId: string) => 
  repo.createRolePermission({ role: roleId as any, permission: permId as any, createdBy: adminId as any });

export const getRolePermissions = async (roleId: string) => repo.findRolePermissions(roleId);

export const getRolePermissionDetail = async (id: string) => {
  const res = await repo.findRolePermissionById(id);
  if (!res) throw new Error("Permission assignment not found");
  return res;
};

export const updatePermissionAssignment = async (id: string, data: any) => {
  const updated = await repo.updateRolePermission(id, data);

  if (!updated) {
    throw new HttpError(ResponseCodes.BB404, "Permission assignment not found");
  }

  return updated; 
};

export const removePermissionFromRole = async (id: string) => {
  await repo.deleteRolePermission(id);
  return { success: true };
};
