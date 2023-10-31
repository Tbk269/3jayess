const {readFile, readFileSync} = require('fs');
const txt = readFileSync('./hello.txt','utf8');
console.log(txt);