


const express = require('express');

const swig = require('swig');

const mongoose = require('mongoose');

const app = express();

const port =3000

mongoose.connect('mongodb://localhost/blog',{userNewUrlParser:true});

const db = mongoose.connection;

db.on('error',(err)=>{
	console.log('connection  error');
	throw err;
});

db.once('open',()=>{
	console.log('connection successful');
});

app.use(express.static('public'));