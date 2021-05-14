const config = require('./jest.config');
config.testRegex = '\\.unit\\.ts$';
config.coverageDirectory = './coverage/unit';
module.exports = config;
