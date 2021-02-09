import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { User } from '../models/user';
import { JWT_SECRET } from '../config';

export async function loginUserController(
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

		req.session.context = { id: jwt.sign(user.id, JWT_SECRET) };

		res.status(204).send();
	} catch (error) {
		next(new createHttpError.InternalServerError('Something went wrong'));
	}
}
