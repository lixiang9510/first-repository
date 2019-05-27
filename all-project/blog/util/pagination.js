

/*
page:页码
model:数据模型
query:查找条件
projection:投影
sort:排序
*/

async function pagination(options){
	
	let { page,model,query,projection,sort } = options;
	const limit = 2;
	page = parseInt(page);
	if(isNaN(page)){
		page = 1;
	}
	if(page == 0 ){
		page = 1;
	}
	//因为是async函数，所以有await方法
	const count = await model.countDocuments(query);
	const pages = Math.ceil(count / limit);
	if(page>pages){
		page = pages;
	}
	if(pages==0){
		page=1;
	}
	const list = [];
	for(let i=1;i<=pages;i++){
		list.push(i)
	}
	//跳过条数
	const skip = (page-1)*limit;
	//查找到的数据
	const docs = await model.find(query,projection)
	.sort(sort)
	.skip(skip)
	.limit(limit)
	return {
		docs,
		page,
		list,
		pages
	}
}
module.exports = pagination;