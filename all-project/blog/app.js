



const express = require('express');
const swig = require('swig');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Cookies = require('cookies');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
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

/*
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
*/
//利用session保存数据
app.use(session({
    //设置cookie名称，可以随意命名
    name:'liId',
    //用来对session cookie签名，防止篡改，也就是加密，可以随意
    secret:'aaa',
    //强制保存session即使没有发生变化
    resave:true,
    //强制将为初始化的session储存
    saveUninitialized:true,
    //如果时间true，则每次请求都刷新cookie的过期时间
    rolling:true,
    //cookie的过期时间
    cookie:{maxAge:1000*60*60*24},
    //设置session储存在数据库当中
    store:new MongoStore({ mongooseConnection: mongoose.connection })

}))
app.use((req,res,next)=>{
    req.userInfo = req.session.userInfo || {};
    next();
})

app.use('/',require('./routes/index.js'))

app.use('/user',require('./routes/user.js'))

app.use('/admin',require('./routes/admin.js'))
app.get('/list',(req,res)=>{
	res.render('list')
})

app.listen(port, () => console.log(`app listening on port ${port}!`))