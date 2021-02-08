import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';

export function errorHandler(
	error: Error,
	_: Request,
	res: Response,
	__: NextFunction,
) {
	if (error instanceof HttpError) {
		return res
			.status(error.statusCode)
			.json({ message: error.message, status: error.statusCode });
	}

	res.status(500).json({ error: 'Internal Server Error', status: 500 });
}
