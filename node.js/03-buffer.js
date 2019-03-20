var buf = Buffer.from('你');
var buf1 = Buffer.alloc(3);
console.log(buf);
buf1[2]=0xe4;
buf1[1]=0xbd;
buf1[0]=0xa0;
console.log(buf1.toString());//e4 bd a0
console.log(buf1);