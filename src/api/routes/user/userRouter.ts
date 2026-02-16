import { Router, Request, Response, NextFunction } from 'express';
import tokenAuth from '../../../middleware/tokenAuth';
import { HttpResponse } from '../../../models/http/response';
import * as service from '../../../services/user/userService';

const router = Router();
router.use(tokenAuth);

// User CRUD (5)
router.post('/', async (req, res, next) => {
  try { return HttpResponse.Accepted(res, await service.registerUser(req.body)); } catch (e) { next(e); }
});
router.get('/', async (req, res, next) => {
  try { return HttpResponse.Ok(res, await service.getAllUsers(Number(req.query.page), Number(req.query.limit))); } catch (e) { next(e); }
});
router.get('/:id', async (req, res, next) => {
  try { return HttpResponse.Ok(res, await service.getUserById(req.params.id)); } catch (e) { next(e); }
});
router.patch('/:id', async (req, res, next) => {
  try { return HttpResponse.Ok(res, await service.updateUser(req.params.id, req.body)); } catch (e) { next(e); }
});
router.delete('/:id', async (req, res, next) => {
  try { return HttpResponse.Ok(res, await service.deleteUser(req.params.id)); } catch (e) { next(e); }
});

// User-Role CRUD (5)
router.post('/:id/roles', async (req, res, next) => {
  try { return HttpResponse.Ok(res, await service.addUserRole(req.params.id, req.body.roleId, (req as any).user.id)); } catch (e) { next(e); }
});
router.get('/:id/roles', async (req, res, next) => {
  try { return HttpResponse.Ok(res, await service.getUserRoles(req.params.id)); } catch (e) { next(e); }
});
router.get('/:id/roles/:userRoleId', async (req, res, next) => {
  try { return HttpResponse.Ok(res, await service.getUserRoleDetail(req.params.userRoleId)); } catch (e) { next(e); }
});
router.patch('/:id/roles/:userRoleId', async (req, res, next) => {
  try { return HttpResponse.Ok(res, await service.updateRoleAssignment(req.params.userRoleId, req.body)); } catch (e) { next(e); }
});
router.delete('/:id/roles/:userRoleId', async (req, res, next) => {
  try { return HttpResponse.Ok(res, await service.removeUserRole(req.params.userRoleId)); } catch (e) { next(e); }
});

export default router;
