const config = require('./jest.config');
config.testRegex = '\\.e2e\\.ts$';
config.coverageDirectory = './coverage/e2e';
module.exports = config;
