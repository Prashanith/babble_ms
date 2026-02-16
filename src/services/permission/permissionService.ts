import * as repo from '../../repositories/permissionRepository';
import { ResponseCodes } from '../../constants/codes';
import { HttpError } from '../../models/http/error';

// 1. Create
export const registerPermission = async (data: any) => {
  const name = data.name.toLowerCase().trim();
  const existing = await repo.listPermissions({ name }, 0, 1);
  if (existing.length > 0) throw new HttpError(ResponseCodes.BB409, "Permission already exists");
  return await repo.createPermission({ ...data, name });
};

// 2. Get All
export const getAllPermissions = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const [permissions, total] = await Promise.all([
    repo.listPermissions({ isActive: true }, skip, limit),
    repo.countPermissions({ isActive: true })
  ]);
  return { permissions, pagination: { total, page, pages: Math.ceil(total / limit) } };
};

// 3. Get By ID
export const getPermissionById = async (id: string) => {
  const permission = await repo.findPermissionById(id);
  if (!permission) throw new HttpError(ResponseCodes.BB404, "Permission not found");
  return permission;
};

// 4. Update
export const updatePermission = async (id: string, data: any) => {
  if (data.name) data.name = data.name.toLowerCase().trim();
  const updated = await repo.updatePermission(id, data);
  if (!updated) throw new HttpError(ResponseCodes.BB404, "Permission not found");
  return updated;
};

// 5. Delete (Soft)
export const deletePermission = async (id: string) => {
  const deleted = await repo.updatePermission(id, { isActive: false });
  if (!deleted) throw new HttpError(ResponseCodes.BB404, "Permission not found");
  return { success: true };
};
