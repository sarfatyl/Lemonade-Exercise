const config = require('./jest.config');
config.testRegex = '\\.integration\\.ts$';
config.coverageDirectory = './coverage/integration';
module.exports = config;
