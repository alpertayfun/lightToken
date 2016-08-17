var lightToken = require("./lightToken.js");


var message = "hello world!!!";
var key = "1sd33asd34df45sd2";

var token = lightToken.authSign({foo:'asdasdasasdasdasdasdasdasdasd',foo2:11232333,data:"çöçşşğüğüğIIİİ,,12*983qwopıaskş<zxz<x"},key,{algorithm:"DES-EDE-CBC",expire:"1 day"},function(data) {
	console.log(data);	
});


var tokenVerify = lightToken.authVerify(token,key,function(data) {
	console.log(data);
});
