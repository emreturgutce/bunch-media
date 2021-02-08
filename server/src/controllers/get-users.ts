import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { User } from '../models/user';

export async function getUsersController(
	_: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const users = await User.find();

		res.json({
			status: 200,
			message: 'All users fetched',
			data: { users },
		});
	} catch (error) {
		next(new createHttpError.InternalServerError('Something went wrong'));
	}
}
