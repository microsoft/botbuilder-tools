const fs = require('fs-extra');
const nock = require('nock');
const path = require('path');
const pathToMockFile = path.resolve(process.argv[2]);
const pathToCLITool = path.resolve(process.argv[3]);
const mockData = fs.readJSONSync(pathToMockFile);

for (const key in mockData) {
	if (mockData.hasOwnProperty(key)) {
		const element = mockData[key];
		nock(element.url)
		.intercept(new RegExp(element.uri, "i"), element.method)
		.reply(element.responseCode,element.response);
	}
}

process.argv.splice(1,2); //The args would look like it was run directly from the CLI
require(pathToCLITool);