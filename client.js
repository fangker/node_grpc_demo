const PROTO_PATH = __dirname + '/../common/protos/lhkwmp.proto';
const fs = require('fs');
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

const client = new lhkwmp.Voucher('127.0.0.1:2333',
		grpc.credentials
			.createSsl(
				fs.readFileSync(__dirname + '/keys/ca.crt'),
				fs.readFileSync(__dirname + '/keys/client.key'),
				fs.readFileSync(__dirname + '/keys/client.crt'),
			), { "grpc.ssl_target_name_override": "charmer", "grpc.default_authority": "charmer" }
	);
module.exports = client;
