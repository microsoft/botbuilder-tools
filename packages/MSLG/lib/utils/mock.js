const swagger = require('../../swagger');
const fetchMock = require('fetch-mock');

const mock = {
    runFetchMock: function(url, path, method){
        const response = swagger["paths"][path][method.toLowerCase()]["responses"]["200"];
        if(response){
            fetchMock.mock(url, response["examples"]["application/json"]);
        }else{
            fetchMock.mock(url, {}); 
        }        
    }
};

module.exports = mock;