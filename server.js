const fs = require('fs');
const PROTO_PATH = __dirname + '/../common/protos/lhkwmp.proto';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(
	PROTO_PATH,
	{
		keepCase: true,
		longs: String,
		enums: String,
		defaults: true,
		oneofs: true
	});
const lhkwmp = grpc.loadPackageDefinition(packageDefinition).lhkwmp;







/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
	const server = new grpc.Server();
	server.addService(lhkwmp.Voucher.service,
		require('./rpcServiceFunction/VoucherService')
	);
	let credentials = grpc.ServerCredentials.createSsl(
		fs.readFileSync(__dirname + '/keys/ca.crt'), [{
			cert_chain: fs.readFileSync(__dirname + '/keys/server.crt'),
			private_key: fs.readFileSync(__dirname + '/keys/server.key')
		}], true);
	server.bind('0.0.0.0:2333',credentials);
	server.start();
}

main();