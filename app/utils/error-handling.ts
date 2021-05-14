import {NextFunction, Request, Response} from 'express-serve-static-core';
import * as Errors from '../consts/errors.const';
import {ILemonadeError} from '../interfaces/lemonade-error.interface';

export class LemonadeError extends Error {
	error: ILemonadeError;
	data: any;
	isCustomError: boolean = true;

	constructor(error: ILemonadeError, data?: any) {
		super(error.message);
		this.error = error;
		this.data = data;
	}
}

export class ErrorHandling {

	static errorHandler(error: LemonadeError, req: Request, res: Response, next: NextFunction) {
		if (error.isCustomError) {
			res.status(error.error.statusCode).send(error.error);
		} else {
			res.status(Errors.InternalServerError.statusCode).send(Errors.InternalServerError);
		}
		next(error);
	}

}
