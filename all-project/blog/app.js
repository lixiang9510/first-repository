



const express = require('express');
const swig = require('swig');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Cookies = require('cookies');
const app = express();
const port = 3000
mongoose.connect('mongodb://localhost/blog',{useNewUrlParser:true})

const db = mongoose.connection;
db.on('error',err=>{
    console.log('connecton error');
    throw err;
})
db.once('open',()=>{
    console.log("connection successful")
})

app.use(express.static('public'))
//开发阶段设置不走缓存
swig.setDefaults({
  cache: false
})

//配置应用模板
app.engine('html', swig.renderFile);
//配置模板的存放目录
app.set('views', './views')
//注册模板引擎
app.set('view engine', 'html')

//post/put请求处理中间件
app.use(bodyParser.urlencoded({ extended:false}))
app.use(bodyParser.json())

//设置cookies中间件
app.use((req,res,next)=>{
    req.cookies = new Cookies(req,res);
    req.userInfo={};
    let userInfo = req.cookies.get('userInfo');
    if(userInfo){
        req.userInfo = JSON.parse(userInfo);
    }
    next();
})

app.use('/',require('./routes/index.js'))

app.use('/user',require('./routes/user.js'))

app.get('/list',(req,res)=>{
	res.render('list')
})

app.listen(port, () => console.log(`app listening on port ${port}!`))