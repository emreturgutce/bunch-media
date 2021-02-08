import { Router } from 'express';
import { createUserController } from '../controllers/create-user';
import { getUsersController } from '../controllers/get-users';
import { errorHandler } from '../middlewares/error-handler';
import { notFound } from '../middlewares/not-found';
import { validateUser } from '../middlewares/validate-user';

const router = Router();

router.get('/', getUsersController);
router.post('/', validateUser, createUserController);

router.use(notFound);
router.use(errorHandler);

export { router };
