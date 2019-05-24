



const express = require('express')
const swig = require('swig')
const mongoose = require('mongoose')
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

app.get('/',(req,res)=>{
	res.render('main/index')
})
app.get('/list',(req,res)=>{
	res.render('list')
})

app.listen(port, () => console.log(`app listening on port ${port}!`))