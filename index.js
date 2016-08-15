var lightToken = require("./lightToken.js");


var message = "hello world!!!";
var key = "0k8j7h6g5f4d3s2ak8j7h6g5f4d3s2a";

var token = lightToken.authSign({ foo: 'bar' },key,{algorithm:"DES-EDE-CBC",expire:"1h"},function(data) {
	console.log(data);
});
//console.log(token);

var tokenVerify = lightToken.authVerify(token,key,function(data) {
	console.log(data);
});