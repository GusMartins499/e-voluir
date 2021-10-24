import { Router } from 'express';
import UsersRoutes from './users.routes';
import NgosRouter from './ngos.routes';
import SessionRouter from './session.routes';

const routes = Router();

routes.use('/users', UsersRoutes);
routes.use('/ngos', NgosRouter);
routes.use('/session', SessionRouter);

export default routes;