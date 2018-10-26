const fs = require('fs-extra');
const path = require('path');
const nock = require('nock');
const pathToMockFile = path.resolve(process.argv[2]);
const pathToCLITool = process.argv[3];
const shouldMock = true;
process.argv.splice(1,2);

if(!fs.existsSync(pathToMockFile) && shouldMock){
	var folderPath = pathToMockFile.substring(0,pathToMockFile.lastIndexOf(path.sep)+1);
	if (!fs.existsSync(folderPath)){
		fs.mkdirSync(folderPath);
	}
	fs.writeFileSync(pathToMockFile,"[]");
	nock.recorder.rec({
		output_objects: true,
		dont_print: false,
		enable_reqheaders_recording:true,
		logging:(msg)=>{
			saveMockDataToFile(msg);
		},
		use_separator:false
	});
	require(pathToCLITool);
}else{
	if(shouldMock){
		const mockData = fs.readJSONSync(pathToMockFile);
		for (const key in mockData) {
			if (mockData.hasOwnProperty(key)) {
				const element = mockData[key];
				nock(element.scope)
				.intercept(element.path, element.method)
				.reply(element.status,element.response);
			}
		}
	}
	require(pathToCLITool);
}

function saveMockDataToFile(data){
	var reqs = fs.readJSONSync(pathToMockFile);
	reqs.push(data);
	fs.writeJSON(pathToMockFile,reqs,{spaces:'\t'})
	nock.recorder.play();
}