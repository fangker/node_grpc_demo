const client = require('../client');
const {callerInjection} = require('../rpcHelper');

const api = {
	sayHello:{ name:'' }
};




module.exports = callerInjection(api,__filename,client);

