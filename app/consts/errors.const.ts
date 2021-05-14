import {ResponseStatusCodes} from '../enums/response-status-codes.enum';
import {ILemonadeError} from '../interfaces/lemonade-error.interface';

export const InternalServerError: ILemonadeError = {
	statusCode: ResponseStatusCodes.InternalServerError,
	name: 'InternalServerError',
	message: 'Internal server error.'
};

export const InvalidInputType: ILemonadeError = {
	statusCode: ResponseStatusCodes.BadRequest,
	name: 'InvalidInputType',
	message: 'Invalid type must be filePath / url / text'
};

export const InvalidData: ILemonadeError = {
	statusCode: ResponseStatusCodes.BadRequest,
	name: 'InvalidData',
	message: 'Invalid data'
};

export const InvalidWord: ILemonadeError = {
	statusCode: ResponseStatusCodes.BadRequest,
	name: 'InvalidWord',
	message: 'Invalid word'
};
