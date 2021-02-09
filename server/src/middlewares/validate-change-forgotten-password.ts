import { JSONSchemaType } from 'ajv';
import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { ajv } from '../config';

interface ISchemaParams {
	token: string;
}

const schemaParams: JSONSchemaType<ISchemaParams> = {
	type: 'object',
	properties: {
		token: { type: 'string', minLength: 0, maxLength: 255 },
	},
	required: ['token'],
	additionalProperties: false,
};

const validateParams = ajv.compile(schemaParams);

interface ISchemaBody {
	password: string;
}

const schemaBody: JSONSchemaType<ISchemaBody> = {
	type: 'object',
	properties: {
		password: { type: 'string', minLength: 0, maxLength: 255 },
	},
	required: ['password'],
	additionalProperties: false,
};

const validateBody = ajv.compile(schemaBody);

export function validateChangeForgottenPassword(
	req: Request,
	_: Response,
	next: NextFunction,
) {
	if (!validateBody(req.body) && !validateParams(req.params)) {
		return next(
			new createHttpError.BadRequest(
				'Invalid change forgotten password attributes',
			),
		);
	}

	next();
}
