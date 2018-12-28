const vc = require('./rpcCallerFunction/VoucherCaller');

const c =async function(){
	console.log(await vc.rpc[vc.api.sayHello]({name:'888888'}));
}();

