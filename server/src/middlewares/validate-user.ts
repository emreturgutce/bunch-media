import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { ajv } from '../config';
import { userSchema } from '../models/user';

const validate = ajv.compile(userSchema);

export function validateUser(req: Request, _: Response, next: NextFunction) {
	if (!validate(req.body)) {
		return next(new createHttpError.BadRequest('Invalid user attributes.'));
	}

	next();
}
