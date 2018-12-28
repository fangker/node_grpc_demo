const {serviceInjector} = require('../rpcHelper');


const sayHello = async function(call){
	console.log(call);
	throw new Error('zzzz')
};

const api = {
	sayHello,
};


module.exports = serviceInjector(api,__filename);