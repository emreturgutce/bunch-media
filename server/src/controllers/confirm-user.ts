import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { RedisClient } from '../config';
import { CONFIRM_USER_PREFIX } from '../constants';
import { User } from '../models/user';

export async function confirmUserController(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const { token } = req.params;

		const id = await RedisClient.getInstance().get(
			`${CONFIRM_USER_PREFIX}${token}`,
		);

		if (!id) {
			return next(new createHttpError.BadRequest('Bad request'));
		}

		await Promise.all([
			User.updateOne(
				{ _id: mongoose.Types.ObjectId(id) },
				{ verified: true },
			),
			RedisClient.getInstance().del(token),
		]);

		res.status(204).send();
	} catch (error) {
		next(new createHttpError.InternalServerError('Something went wrong.'));
	}
}
