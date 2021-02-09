import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { RedisClient } from '../config';
import { User } from '../models/user';
import { FORGOT_PASSWORD_PREFIX } from '../constants';
import createHttpError from 'http-errors';

export async function changeForgottenPasswordController(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const { token } = req.params;

		const id = await RedisClient.getInstance().get(
			`${FORGOT_PASSWORD_PREFIX}${token}`,
		);

		if (!id) {
			return next(new createHttpError.BadRequest('Bad request'));
		}

		await Promise.all([
			User.updateOne(
				{ _id: mongoose.Types.ObjectId(id) },
				{ password: await bcrypt.hash(req.body.password, 10) },
			),
			RedisClient.getInstance().del(`${FORGOT_PASSWORD_PREFIX}${token}`),
		]);

		res.status(204).send();
	} catch (error) {
		console.log(error);
		next(new createHttpError.InternalServerError('Something went wrong'));
	}
}
