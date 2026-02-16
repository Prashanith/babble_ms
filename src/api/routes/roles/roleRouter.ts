import { Router } from 'express';
import tokenAuth from '../../../middleware/tokenAuth';
import { HttpResponse } from '../../../models/http/response';
import * as service from '../../../services/roles/roleService';

const router = Router();
router.use(tokenAuth);

// Role CRUD (5)
router.post('/', async (req, res, next) => {
  try { return HttpResponse.Accepted(res, await service.registerRole(req.body)); } catch (e) { next(e); }
});
router.get('/', async (req, res, next) => {
  try { return HttpResponse.Ok(res, await service.getAllRoles(Number(req.query.page), Number(req.query.limit))); } catch (e) { next(e); }
});
router.get('/:id', async (req, res, next) => {
  try { return HttpResponse.Ok(res, await service.getRoleById(req.params.id)); } catch (e) { next(e); }
});
router.patch('/:id', async (req, res, next) => {
  try { return HttpResponse.Ok(res, await service.updateRole(req.params.id, req.body)); } catch (e) { next(e); }
});
router.delete('/:id', async (req, res, next) => {
  try { return HttpResponse.Ok(res, await service.deleteRole(req.params.id)); } catch (e) { next(e); }
});

// Role-Permission CRUD (5)
router.post('/:id/permissions', async (req, res, next) => {
  try { return HttpResponse.Ok(res, await service.addPermissionToRole(req.params.id, req.body.permissionId, (req as any).user.id)); } catch (e) { next(e); }
});
router.get('/:id/permissions', async (req, res, next) => {
  try { return HttpResponse.Ok(res, await service.getRolePermissions(req.params.id)); } catch (e) { next(e); }
});
router.get('/:id/permissions/:rolePermId', async (req, res, next) => {
  try { return HttpResponse.Ok(res, await service.getRolePermissionDetail(req.params.rolePermId)); } catch (e) { next(e); }
});
router.patch('/:id/permissions/:rolePermId', async (req, res, next) => {
  try { return HttpResponse.Ok(res, await service.updatePermissionAssignment(req.params.rolePermId, req.body)); } catch (e) { next(e); }
});
router.delete('/:id/permissions/:rolePermId', async (req, res, next) => {
  try { return HttpResponse.Ok(res, await service.removePermissionFromRole(req.params.rolePermId)); } catch (e) { next(e); }
});

export default router;
