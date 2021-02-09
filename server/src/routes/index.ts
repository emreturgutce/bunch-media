import { Router } from 'express';
import { createUserController } from '../controllers/create-user';
import { getUsersController } from '../controllers/get-users';
import { loginUserController } from '../controllers/login-user';
import { logoutUserController } from '../controllers/logout-user';
import { auth } from '../middlewares/auth';
import { errorHandler } from '../middlewares/error-handler';
import { notFound } from '../middlewares/not-found';
import { validateLogin } from '../middlewares/validate-login';
import { validateUser } from '../middlewares/validate-user';

const router = Router();

router.get('/api/users', auth, getUsersController);
router.post('/api/signup', validateUser, createUserController);
router.post('/api/login', validateLogin, loginUserController);
router.get('/api/logout', auth, logoutUserController);

router.use(notFound);
router.use(errorHandler);

export { router };
