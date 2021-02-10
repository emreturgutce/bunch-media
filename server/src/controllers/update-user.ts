import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

export async function updateUserController(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const id = jwt.decode(req.session.context?.id!);

		if (!id) {
			return next(
				new createHttpError.Unauthorized('Could not find user id.'),
			);
		}

		await User.updateOne(
			{ _id: mongoose.Types.ObjectId(id as string) },
			{ ...req.body },
		);

		res.status(204).send();
	} catch (error) {
		next(new createHttpError.InternalServerError('Something went wrong'));
	}
}
