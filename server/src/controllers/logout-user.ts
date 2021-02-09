import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { cookieOptions } from '../config';
import { COOKIE_NAME } from '../constants';

export function logoutUserController(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		req.session.destroy((err: any) => {
			if (err) {
				return next(
					new createHttpError.InternalServerError(
						'Could not logged out',
					),
				);
			}
		});

		res.clearCookie(COOKIE_NAME, cookieOptions);

		res.status(204).send();
	} catch (error) {
		next(new createHttpError.InternalServerError('Something went wrong'));
	}
}
