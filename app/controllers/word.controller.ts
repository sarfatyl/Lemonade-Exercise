import { NextFunction, Request, Response } from 'express-serve-static-core';
import { ResponseStatusCodes } from '../enums/response-status-codes.enum';
import { LemonadeError } from '../utils/error-handling';
import { InvalidData, InvalidInputType, InvalidWord } from '../consts/errors.const';
import { WordDal } from "../dals/word.dal";
import { WordService } from "../services/word.service";
import { InputTypeEnum } from "../enums/input-type.enum";

export class WordController {

	constructor(
		private wordDal: WordDal,
		private wordService: WordService
	) {
	}

	counter = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const inputType: InputTypeEnum = req.body.inputType;
			if (!inputType || ![InputTypeEnum.Text, InputTypeEnum.Url, InputTypeEnum.FilePath].includes(inputType)) {
				throw new LemonadeError(InvalidInputType);
			}
			if (!req.body.data) {
				throw new LemonadeError(InvalidData);
			}
			switch (inputType) {
				case InputTypeEnum.Text:
					const text = req.body.data;
					this.wordService.countWords(text);
					break;
				case InputTypeEnum.FilePath:
					const fileUrl: string = req.body.data;
					this.wordService.countWordsFromFile(fileUrl);
					break;
				case InputTypeEnum.Url:
					const url: string = req.body.data;
					// I do not use await to return an immediate response to the client
					// and continue the calculation behind the scenes
					this.wordService.countWordsFromUrl(url);
					break;
			}
			res.status(ResponseStatusCodes.Ok).send();
			next();
		} catch (error) {
			next(error);
		}
	};

	statistics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const word: string = req.query.word;
			if (!word) {
				throw new LemonadeError(InvalidWord)
			}
			const wordStatistic: number = this.wordService.getWordStatistic(word);
			res.status(ResponseStatusCodes.Ok).send(`The word ${word} appears ${wordStatistic} times.`);
			next();
		} catch (error) {
			next(error);
		}
	};

}
