

const http = require("http");
const url = require('url');
const querystring = require('querystring');
const server = http.createServer((req,res)=>{
	console.log("url=>",req.url,"method=>",req.method);
	// const myUrl1 = url.parse(req.url);
	// console.log(myUrl1.query);
	// const obj1 = querystring.parse(myUrl1.query);
	// console.log(obj1);
	const myUrl2 = url.parse(req.url,true);
	console.log(myUrl2);
	const obj2 = myUrl2.query;
	console.log(obj2);
	res.setHeader('Content-Type',"text/html;charset=utf-8");
	res.end('kuazhu');
})
server.listen(3000,"127.0.0.1",()=>{
	console.log("Server in running at http://127.0.0.1:3000")
})