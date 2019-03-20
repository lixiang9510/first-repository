
const EventEmitter =require('events');
// console.log(EventEmitter)
class MyEmitt extends EventEmitter{

}
const emitter = new MyEmitt();
emitter.on('test',()=>{
	console.log('1:::running test...');
})
emitter.addListener('test',()=>{
	console.log('2:::running test...');
});
emitter.emit('test');