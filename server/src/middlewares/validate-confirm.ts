import { JSONSchemaType } from 'ajv';
import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { ajv } from '../config';

interface ISchema {
	token: string;
}

const schema: JSONSchemaType<ISchema> = {
	type: 'object',
	properties: {
		token: { type: 'string', minLength: 0, maxLength: 255 },
	},
	required: ['token'],
	additionalProperties: false,
};

const validate = ajv.compile(schema);

export function validateConfirmEmail(
	req: Request,
	_: Response,
	next: NextFunction,
) {
	if (!validate(req.params)) {
		return next(
			new createHttpError.BadRequest('Invalid token.'),
		);
	}

	next();
}
