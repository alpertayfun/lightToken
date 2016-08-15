## lightToken


Simple use Token.


npm install lighttoken


```
var lightToken = require("lighttoken");


var message = "hello world!!!";
var key = "0k8j7h6g5f4d3s2ak8j7h6g5f4d3s2a";

var token = lightToken.authSign({ foo: 'bar' },key,{algorithm:"DES-EDE-CBC",expire:"1h"},function(data) {
	console.log(data);
});

var tokenVerify = lightToken.authVerify(token,key,function(data) {
	console.log(data);
});

```


Please check algorithm list :

https://gist.github.com/reggi/4459803