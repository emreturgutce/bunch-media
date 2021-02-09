import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { v4 as uuid } from 'uuid';
import { RedisClient } from '../config';
import { FORGOT_PASSWORD_PREFIX } from '../constants';
import { User } from '../models/user';
import { sendEmail } from '../utils';

export async function forgotPasswordController(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const { email } = req.body;

		const user = await User.findOne({ email });

		if (!user) {
			return next(
				new createHttpError.BadRequest(
					'Could not find any user with the given email',
				),
			);
		}

		const token = uuid();

		res.status(204).send();

		Promise.all([
			RedisClient.getInstance().set(
				`${FORGOT_PASSWORD_PREFIX}${token}`,
				user.id,
				'ex',
				60 * 60 * 24,
			),
			sendEmail(
				email,
				`http://localhost:3000/user/change-password/${token}`,
			),
		]);
	} catch (error) {
		next(new createHttpError.InternalServerError('Something went wrong'));
	}
}
