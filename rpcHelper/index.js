const moment = require('moment');
const path = require('path');

const swrapper = function({ call, callback, funbody, path, funName }) {
	return async function(call, callback) {
		try {
			console.log(`${moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')} RPC Service Request: ${path}  - ${funName}`)
			const data = await funbody(call);
			callback(null, data)
		} catch (e) {
			console.error(`RPC Response: ${e}`);
			console.error(`RPC Response: Body ${JSON.stringify(call.request)}`);
			callback(JSON.stringify(e,null,4),'');
		}
	}
};

const cwrapper = function( {client, path,funName, arg}) {
	 const obj = Object.keys(arg);
	return function(qobj){
		console.log(`${moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')} RPC Caller Request: ${path}  - ${funName}`)
			return new Promise((resolve,reject) => {
				Object.keys(qobj).map(q=>{
					if(obj.indexOf(q)===-1){
						return reject(`RPC Request: ${path} - ${funName}  Query Error ${qobj}`);
					}
				});
				client[funName](qobj, (err, response) => {
					if(err){
						return reject(err);
					}
					return resolve(response);
				})
			})
	};
};

function serviceInjector(api, fp) {
	for (i in api) {
		api[i] = swrapper({ funbody: api[i], path: path.basename(fp), funName: i })
	}
	return api;
}

function callerInjection(api, fp, client) {
	const capi = JSON.parse(JSON.stringify(api));
	Object.keys(capi).map(i=>{
		return capi[i]=i;
	})
	for (i in api){
		api[i] = cwrapper({ client, path:path.basename(fp), funName: i, arg: api[i] })
	}
	return {rpc:api,api:capi};
}


module.exports = { serviceInjector, callerInjection };