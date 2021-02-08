import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';

export function notFound(_: Request, __: Response, ___: NextFunction) {
	throw new createHttpError.NotFound('Route not found');
}
