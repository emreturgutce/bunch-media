import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

export async function addPlatformController(
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

		const result = await User.updateOne(
			{ _id: mongoose.Types.ObjectId(id as string) },
			{ $addToSet: { platforms: [req.body.platform] } },
		);

		if (result.nModified === 0) {
			return next(
				new createHttpError.BadRequest(
					'This platform is already added.',
				),
			);
		}

		res.status(204).json();
	} catch (error) {
		next(new createHttpError.InternalServerError('Something went wrong'));
	}
}
