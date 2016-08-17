var lightToken = require("./lightToken.js");


var message = "hello world!!!";
var key = "TOPSECRETTTTT";

var payload = {foo:'asdasdasasdasdasdasdasdasdasd',foo2:11232333,data:"çöçşşğüğüğIIİİ,,1asdasdasdasdasdasd2*983qwopıaskş<zxz<x"};


var token = lightToken.authSign(payload,key,{algorithm:"DES-EDE-CBC",expire:"1 day"},function(data) {
	console.log(data);	
});


var tokenVerify = lightToken.authVerify(token,key,function(data) {
	console.log(data);
});
