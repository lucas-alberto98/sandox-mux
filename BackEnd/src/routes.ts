import { Router } from 'express';
import ClassController from './Controllers/ClassController';
import ClassUserController from './Controllers/ClassUserController';
import CourseController from './Controllers/CourseController';
import LoginController from './Controllers/LoginController';
import UserController from './Controllers/UserController';
import VideoController from './Controllers/VideoController';
import VideoUploadController from './Controllers/VideoUploadController';
import authMiddleware from './middlewares/auth';

const routes = Router();

routes.post('/user/login', LoginController.store);
routes.use(authMiddleware);

routes.get('/users/', UserController.index);

routes.post('/courses', CourseController.store);
routes.put('/courses/:courseId', CourseController.update);

routes.get('/courses', CourseController.index);
routes.get('/courses/:courseId', CourseController.show);

routes.post('/courses/:courseId/classes', ClassController.store);
routes.get('/courses/:courseId/classes', ClassController.index);

routes.put('/courses/:courseId/classes/:classId', ClassController.update);
routes.get('/courses/:courseId/classes/:classId', ClassController.show);

routes.post(
    '/courses/:courseId/classes/:classId/students/:studentId',
    ClassUserController.store
);

routes.delete(
    '/courses/:courseId/classes/:classId/students/:studentId',
    ClassUserController.destroy
);

routes.get(
    '/courses/:courseId/classes/:classId/students',
    ClassUserController.index
);
routes.put(
    '/courses/:courseId/classes/:classId/students/:studentId',
    ClassUserController.update
);
routes.get(
    '/courses/:courseId/classes/:classId/students/:studentId',
    ClassUserController.show
);

routes.get('/course/:courseId/videos', VideoController.index);

routes.post('/video/upload', VideoUploadController.store);
routes.put('/video/upload/:uploadId/complete', VideoUploadController.update);
routes.get('/video', VideoController.index);
routes.get('/video/upload', VideoUploadController.index);
routes.get('/video/view', VideoController.show);
// routes.get("/assets", VideoController.get);

export default routes;
