import express from 'express';
import verify from './middlewares/auth';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';
import AuthController from './controllers/AuthController';

const routes = express.Router();
const classesController = new ClassesController();
const connectionsController = new ConnectionsController();
const authController = new AuthController();

routes.get('/classes', classesController.index);
routes.post('/classes', verify, classesController.create);

routes.get('/connections', connectionsController.index);
routes.post('/connections', connectionsController.create);

routes.post('/register', authController.register);
routes.post('/login', authController.login);

export default routes;