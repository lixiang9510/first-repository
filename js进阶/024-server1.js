var http = require('http');

var hostname = '127.0.0.1';
var port = 3000;

var server = http.createServer(function(req,res){
	res.statusCode = 200;
	res.setHeader('Content-Type','text/plain');
	res.end('Hello World Wo cao\n');
})

server.listen(port,hostname,function(){
	console.log("Server runing at http://"+hostname+":"+port+"/");
})