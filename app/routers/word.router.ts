import {Router} from 'express';
import {ApiRoutes} from '../enums/api-routes.enum';
import { WordDal } from "../dals/word.dal";
import { WordService } from "../services/word.service";
import { WordController } from "../controllers/word.controller";

export class WordRouter {

	router: Router = Router();
	wordDal: WordDal = new WordDal();
	wordService: WordService = new WordService(this.wordDal);
	wordController: WordController = new WordController(
		this.wordDal,
		this.wordService
	);

	constructor() {
		this.router.post(ApiRoutes.Counter, this.wordController.counter);
		this.router.get(ApiRoutes.Statistics, this.wordController.statistics);
	}

	getRouter(): Router {
		return this.router;
	}

}
