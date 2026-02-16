import { Router } from 'express';
import tokenAuth from '../../../middleware/tokenAuth';
import { HttpResponse } from '../../../models/http/response';
import * as service from '../../../services/permission/permissionService';

const router = Router();
router.use(tokenAuth);

// 1. Create [POST /]
router.post('/', async (req, res, next) => {
  try { return HttpResponse.Accepted(res, await service.registerPermission(req.body)); } catch (e) { next(e); }
});

// 2. Read All [GET /]
router.get('/', async (req, res, next) => {
  try { return HttpResponse.Ok(res, await service.getAllPermissions(Number(req.query.page), Number(req.query.limit))); } catch (e) { next(e); }
});

// 3. Read One [GET /:id]
router.get('/:id', async (req, res, next) => {
  try { return HttpResponse.Ok(res, await service.getPermissionById(req.params.id)); } catch (e) { next(e); }
});

// 4. Update [PATCH /:id]
router.patch('/:id', async (req, res, next) => {
  try { return HttpResponse.Ok(res, await service.updatePermission(req.params.id, req.body)); } catch (e) { next(e); }
});

// 5. Delete [DELETE /:id]
router.delete('/:id', async (req, res, next) => {
  try { return HttpResponse.Ok(res, await service.deletePermission(req.params.id)); } catch (e) { next(e); }
});

export default router;
