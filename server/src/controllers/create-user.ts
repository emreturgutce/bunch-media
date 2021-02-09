import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { MongoError } from 'mongodb';
import { User } from '../models/user';
import { createConfirmationUrl, sendEmail } from '../utils';

export async function createUserController(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const user = await User.build(req.body).save();

		res.status(201).json({
			status: 201,
			message: 'User created',
			data: { user },
		});

		await sendEmail(
			req.body.email as string,
			await createConfirmationUrl(user.id),
		);
	} catch (error) {
		if (error instanceof MongoError) {
			return next(
				new createHttpError.BadRequest(error.errmsg ?? 'Bad Request'),
			);
		}

		next(new createHttpError.InternalServerError('Something went wrong'));
	}
}
