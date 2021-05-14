import express = require('express');
import bodyParser = require('body-parser');
import compression = require('compression');
import { ApiRoutes } from './enums/api-routes.enum';
import { ErrorHandling } from './utils/error-handling';
import { WordRouter } from "./routers/word.router";

class App {

	public app: express.Application = express();
	public prefixRoute = '/ms_name/v1';

	constructor() {
		this.config();
		this.setRouters();
		this.app.use(this.prefixRoute, this.app._router);
		this.app.use(ErrorHandling.errorHandler);
	}

	private config(): void {
		this.app.use(compression());
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({extended: false}));
		// serving static files
		this.app.use(express.static('public'));
		this.app.disable('x-powered-by');
	}

	private setRouters(): void {
		this.app.use(ApiRoutes.Word, new WordRouter().getRouter());
	}
}

export default new App().app;
