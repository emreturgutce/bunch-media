import { Router } from 'express';
import { createUserController } from '../controllers/create-user';
import { getUsersController } from '../controllers/get-users';
import { loginUser } from '../controllers/login-user';
import { errorHandler } from '../middlewares/error-handler';
import { notFound } from '../middlewares/not-found';
import { validateLogin } from '../middlewares/validate-login';
import { validateUser } from '../middlewares/validate-user';

const router = Router();

router.get('/', getUsersController);
router.post('/', validateUser, createUserController);
router.post('/login', validateLogin, loginUser);

router.use(notFound);
router.use(errorHandler);

export { router };
