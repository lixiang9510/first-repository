const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const mime = require('./mime.json');
const server = http.createServer((req,res)=>{
	let reqUrl = url.parse(req.url);
	let pathname = reqUrl.pathname;
	if(pathname.lastIndexOf('.')==-1){
		pathname = pathname + "/index.html";
	}
	let filePath  = path.normalize(__dirname + "/static/" + pathname);
	let extname = path.extname(filePath);
	console.log(filePath);
	console.log(mime[extname]);
	fs.readFile(filePath,(err,data)=>{
		if(err){
			res.setHeader("Content-type","text/html;charset=utf-8");
			res.end("你出现错误啦");
		}else{
			res.setHeader("Content-type",mime[extname]+";charset=utf-8");
			res.end(data);
			// console.log(JSON.parse(data));
		}
	})
})
server.listen(3000,"127.0.0.1",()=>{
	console.log("Server is running at http://127.0.0.1:3000")
})