

const fs = require('fs');
const util = require('util');
const path =  require('path');
const filePath = './data/wish.json';
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const getColor = ['red','blue','pink','grey','purple','orange','green','yellow','cyan','silver','gold'];
async function add(options){
	let data = await readFile(filePath);
	let arr = JSON.parse(data);

	options.id=Date.now().toString()+parseInt(Math.random()*10000).toString().padStart(4,"0");
	const getRandom=(min,max)=>{	
		return Math.round(min + (max-min)*Math.random());
	}
	options.color=getColor[getRandom(0,getColor.length-1)];
	arr.push(options);
	let strArr = JSON.stringify(arr);
	await writeFile(filePath,strArr);
	return options;
}

async function getAll(){
	let data = await readFile(filePath);
	let arr = JSON.parse(data);
	return arr;
}

async function remove(id){
	let data = await readFile(filePath);
	let arr = JSON.parse(data);
	let newArr = arr.filter(val=>{
		return val['id'] != id;
	})
	let strArr = JSON.stringify(newArr);
	await writeFile(filePath,strArr);
	return newArr;
}

module.exports = {
	add,
	getAll,
	remove
}






