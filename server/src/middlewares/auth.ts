import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export function auth(req: Request, res: Response, next: NextFunction) {
	if (!req.session.context?.id) {
		return next(
			new createHttpError.Unauthorized(
				'You must be authenticated to perform this action.',
			),
		);
	}

	jwt.verify(req.session.context.id, JWT_SECRET, (error, decoded) => {
		if (error) {
			return next(
				new createHttpError.Unauthorized(
					'You must be authenticated to perform this action.',
				),
			);
		}
	});

	next();
}
