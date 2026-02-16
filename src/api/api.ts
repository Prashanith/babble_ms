import express, { NextFunction, Request, Response, Router } from 'express';
import userRouter from './routes/user/userRouter';
import authRouter from './routes/ids/idsRouter';
import roleRouter from './routes/roles/roleRouter';
import permissionRouter from './routes/permissions/permissionsRouter';

const api = () => {
  const router: Router = express.Router();

  router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json('Babble Network Server is up and running');
  });

  router.use('/auth', authRouter);
  router.use('/users', userRouter);
  router.use('/roles', roleRouter);
  router.use('/permissions', permissionRouter);
  return router;
};

export default api;
