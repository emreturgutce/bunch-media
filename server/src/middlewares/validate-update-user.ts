import { JSONSchemaType } from 'ajv';
import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { ajv } from '../config';

interface IUserAttributes {
	email: string;
	biography: string;
	phone: string;
}

const userSchema: JSONSchemaType<IUserAttributes> = {
	type: 'object',
	properties: {
		email: { type: 'string', minLength: 0, maxLength: 255 },
		phone: { type: 'string', minLength: 0, maxLength: 15 },
		biography: { type: 'string' },
	},
	required: ['email', 'phone', 'biography'],
	additionalProperties: false,
};

const validate = ajv.compile(userSchema);

export function validateUpdateUser(
	req: Request,
	_: Response,
	next: NextFunction,
) {
	if (!validate(req.body)) {
		return next(
			new createHttpError.BadRequest('Invalid update user attributes.'),
		);
	}

	next();
}
