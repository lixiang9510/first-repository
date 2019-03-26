const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const querystring = require('querystring');
const swig = require('swig');	
const mime = require('./mime.json');
const {getAll,add} = require('./wishModule.js')
const server = http.createServer((req,res)=>{
	console.log('url=>',req.url);
	let reqUrl = url.parse(req.url,true);
	let pathname = reqUrl.pathname;
	if(pathname == '/' || pathname == '/index.html'){//获取首页
		// res.setHeader('Content-Type','text/html;charset=UTF-8');
		getAll()
		.then(data=>{
			console.log(data);
			/*
				let html = `<!DOCTYPE html>
							<html lang="en">
							<head>
								<meta charset="UTF-8">
								<title>许愿墙</title>
								<link rel="stylesheet" href="css/index.css">
							</head>
							<body>
								<div class="wall">`;
					data.forEach(item=>{
						// console.log(item);
						html +=	`<div class="wish" style="background: ${item.color} ">
								<a href="javascript:;" class="close" data-id=' ${item.id} '></a>
								${item.content}
								</div>`
					});
					html +=	`</div>
								<div class="form-box">
									<div>
										<textarea name="content" id="content" cols="30" rows="20"></textarea>
									</div>
									<div>
										<a href="javascript:;" class="sub-btn">许下心愿</a>
									</div>
								</div>	
							</body>
							<script src="js/jquery.min.js"></script>
							<script src="js/jquery.pep.js"></script>
							<script src="js/index.js"></script>
							</html>`;
			*/
			let template = swig.compileFile(__dirname+'/static/index.html');
			let html = template({
				data
			})
			res.setHeader('Content-Type','text/html;charset=UTF-8');
			res.end(html);
		})
		.catch(err=>{
			console.log('get data err::::',err);
			res.setHeader('Content-Type','text/html;charset=UTF-8');
			res.statusCode = 500;
			res.end('<h1>获取数据出错了！！！</h1>');
		})
	}
	else if(pathname == '/add' && req.method.toLowerCase() == 'post'){
		let body = '';
		req.on('data',(chunk)=>{
			body += chunk;
		});
		req.on('end',()=>{
			let obj = querystring.parse(body);
			add(obj)
			.then(data=>{
				let result = JSON.stringify({
					status:0,
					data:data
				});
				res.end(result);
			})
			.catch(err=>{
				let result = JSON.stringify({
					status:10,
					massage:"添加失败"
				});
				res.end(result);
			})
		})
	}	
	else{
		let filePath = path.normalize(__dirname + '/static/' + pathname);
		let extname = path.extname(filePath);
		fs.readFile(filePath,(err,data)=>{
			if(err){
				res.setHeader('Content-Type','text/plain;charset=UTF-8');
				res.end('出现错误啦');
			}else{
				res.setHeader('Content-Type',mime[extname]+";charset=UTF-8");
				res.end(data);
			}
		})
	}
})
server.listen(3000,"127.0.0.1",()=>{
	console.log("Server is running at http://127.0.0.1:3000");
})