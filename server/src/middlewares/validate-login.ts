import { JSONSchemaType } from 'ajv';
import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { ajv } from '../config';

interface ISchema {
	email: string;
	password: string;
}

const schema: JSONSchemaType<ISchema> = {
	type: 'object',
	properties: {
		email: { type: 'string', minLength: 0, maxLength: 255 },
		password: { type: 'string', minLength: 0, maxLength: 255 },
	},
	required: ['email', 'password'],
	additionalProperties: false,
};

const validate = ajv.compile(schema);

export function validateLogin(req: Request, _: Response, next: NextFunction) {
	if (!validate(req.body)) {
		return next(
			new createHttpError.BadRequest('Invalid user login attributes.'),
		);
	}

	next();
}
