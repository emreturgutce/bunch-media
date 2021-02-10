import { JSONSchemaType } from 'ajv';
import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { ajv } from '../config';

interface ISchema {
	platform: string;
}

const schema: JSONSchemaType<ISchema> = {
	type: 'object',
	properties: {
		platform: {
			type: 'string',
			minLength: 0,
			maxLength: 20,
			enum: ['TWITTER', 'YOUTUBE', 'FACEBOOK', 'INSTAGRAM'],
		},
	},
	required: ['platform'],
	additionalProperties: false,
};

const validate = ajv.compile(schema);

export function validateAddPlatform(
	req: Request,
	_: Response,
	next: NextFunction,
) {
	if (!validate(req.body)) {
		return next(
			new createHttpError.BadRequest('Invalid add platform attributes.'),
		);
	}

	next();
}
