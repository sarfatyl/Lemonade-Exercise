import './utils/env-loader';
import app from './app';
import * as http from 'http';

const port = process.env.SERVER_PORT;
const env = process.env.NODE_ENV;

http.createServer(app).listen(port, () => {
	console.log(`Express server listening on port ${port} with NODE_ENV: ${env}`);
});
