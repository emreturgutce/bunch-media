import { JSONSchemaType } from 'ajv';
import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { ajv } from '../config';

interface ISchema {
	email: string;
}

const schema: JSONSchemaType<ISchema> = {
	type: 'object',
	properties: {
		email: { type: 'string', minLength: 0, maxLength: 255 },
	},
	required: ['email'],
	additionalProperties: false,
};

const validate = ajv.compile(schema);

export function validateForgotPassword(req: Request, _: Response, next: NextFunction) {
	if (!validate(req.body)) {
		return next(
			new createHttpError.BadRequest('Invalid forgot password attributes.'),
		);
	}

	next();
}
