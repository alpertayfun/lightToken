## lightToken


Simple use Token.


npm install lighttoken


### Options : 

- algorithm.

```
 	Please check algorithm list :

	https://gist.github.com/reggi/4459803
```
- expire.
```
	 "m" : minute , "h" : hour , "days" : day , "years" : year , "s" : second 

```

### Usage : 

```
var lightToken = require("lighttoken");


var key = "i9Ijt87Ao4zAPwP8jQZSn5X9ABAeBvMw";

var token = lightToken.authSign({ foo: 'bar' },key,{algorithm:"DES-EDE-CBC",expire:"1h"},function(data) {
	console.log(data);
});

var tokenVerify = lightToken.authVerify(token,key,function(data) {
	console.log(data);
});

```


