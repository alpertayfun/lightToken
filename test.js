var lightToken = require("./lightToken.js");


var message = "hello world!!!";
var key = "TOPSECRETTTTT";

//js object
var payload = {foo:'asdasdasasdasdasdasdasdasdasd',foo2:11232333,data:"çöçşşğüğüğIIİİ,,1asdasdasdasdasdasd2*983qwopıaskş<zxz<x"};

//text
var textSample = "Donec ipsum erat, rutrum id tincidunt eget, tincidunt vitae est. Praesent elementum id velit sed auctor. Nam cursus sodales metus quis varius. Proin in condimentum tortor. Nam tincidunt odio eu congue placerat. Nulla pharetra tincidunt quam, in fermentum est. Ut porta laoreet euismod.";

var token = lightToken.authSign(textSample,key,{algorithm:"DES-EDE-CBC",expire:"1 day"},function(data) {
	console.log(data);	
});


var tokenVerify = lightToken.authVerify(token,key,function(data) {
	console.log(data);
});
