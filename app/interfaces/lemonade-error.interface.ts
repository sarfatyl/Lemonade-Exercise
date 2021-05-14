import {ResponseStatusCodes} from '../enums/response-status-codes.enum';

export interface ILemonadeError {
	name: string;
	message: string;
	statusCode: ResponseStatusCodes
}
