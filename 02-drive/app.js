
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'kuazhu';

// Create a new MongoClient
const client = new MongoClient(url,{useNewUrlParser:true});

// Use connect method to connect to the Server
client.connect(function(err) {
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  
 
  const collection = db.collection('users');

  /*
 // Get the documents collection
  collection.insertMany([{name:"Arm",age:38,major:"computer"},{name:"Mike",age:88,major:"art"}],(err,result)=>{
  	if(err){
  		console.log('err::::',err);
  	}else{
  		console.log('result:::',result);
  	}
  	client.close();
  })
  */
  /*
  //Find some documents
  collection.find({}).toArray((err, docs)=>{
    if(err){
    	console.log('err:::',err)
    }else{
    	console.log('docs:::',docs)
    }
  	client.close();
  });
  */
  /*
  //update one document
  collection.updateOne({name:"Tom"},{$set:{age:108}},(err,result)=>{
  	if(err){
  		console.log('err:::',err);
  	}else{
  		console.log('result:::',result);
  	}
  	client.close();
  })
  */
   //update one document
  collection.deleteOne({name:"Tom"},(err,result)=>{
  	if(err){
  		console.log('err:::',err);
  	}else{
  		console.log('result:::',result);
  	}
  	client.close();
  })
});