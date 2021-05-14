module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testRegex: [
        '\\.unit\\.ts$',
        '\\.integration\\.ts$',
        '\\.e2e\\.ts$'
    ],
    coverageDirectory: './coverage/all'
};
