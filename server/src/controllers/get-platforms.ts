import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

export async function getPlatformsController(
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

		const platforms = await User.findOne({
			_id: mongoose.Types.ObjectId(id as string),
		}).select({ platforms: 1, _id: 0 });

		res.json({
			status: 200,
			message: 'User platforms fetched',
			data: platforms,
		});
	} catch (error) {
		next(new createHttpError.InternalServerError('Something went wrong'));
	}
}
