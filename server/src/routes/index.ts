import { Router } from 'express';
import { changeForgottenPasswordController } from '../controllers/change-forgotten-password';
import { confirmUserController } from '../controllers/confirm-user';
import { createUserController } from '../controllers/create-user';
import { forgotPasswordController } from '../controllers/forgot-password';
import { getUsersController } from '../controllers/get-users';
import { loginUserController } from '../controllers/login-user';
import { logoutUserController } from '../controllers/logout-user';
import { auth } from '../middlewares/auth';
import { errorHandler } from '../middlewares/error-handler';
import { notFound } from '../middlewares/not-found';
import { validateChangeForgottenPassword } from '../middlewares/validate-change-forgotten-password';
import { validateConfirmEmail } from '../middlewares/validate-confirm';
import { validateLogin } from '../middlewares/validate-login';
import { validateForgotPassword } from '../middlewares/validate-forgot-password';
import { validateUser } from '../middlewares/validate-user';
import { addPlatformController } from '../controllers/add-platform';
import { validateAddPlatform } from '../middlewares/validate-add-flatform';
import { getPlatformsController } from '../controllers/get-platforms';

const router = Router();

router.get('/api/users', auth, getUsersController);
router.post('/api/signup', validateUser, createUserController);
router.post('/api/login', validateLogin, loginUserController);
router.get('/api/logout', auth, logoutUserController);
router.get('/api/confirm/:token', validateConfirmEmail, confirmUserController);
router.post(
	'/api/forgot-password',
	validateForgotPassword,
	forgotPasswordController,
);
router.post(
	'/api/change-password/:token',
	validateChangeForgottenPassword,
	changeForgottenPasswordController,
);
router.get('/api/platforms', auth, getPlatformsController);
router.post('/api/platforms', auth, validateAddPlatform, addPlatformController);
router.use(notFound);
router.use(errorHandler);

export { router };
