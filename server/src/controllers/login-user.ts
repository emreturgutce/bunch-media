import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { User } from '../models/user';

export async function loginUser(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const { email, password } = req.body;

		const user = await User.findByEmailAndPassword(email, password);

		if (!user) {
			return next(
				new createHttpError.BadRequest('Email or password wrong.'),
			);
		}

		res.status(204).send();
	} catch (error) {
		next(new createHttpError.InternalServerError('Something went wrong'));
	}
}
