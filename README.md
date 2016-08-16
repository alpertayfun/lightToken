## lightToken


[![license](https://img.shields.io/badge/license-MIT-green.svg?style=flat)](https://raw.githubusercontent.com/alpertayfun/lightToken/master/LICENSE)[![Build Status](https://api.travis-ci.org/alpertayfun/lightToken.svg?branch=master)](https://travis-ci.org/alpertayfun/lightToken)[![Join the chat at https://gitter.im/lighttoken/Lobby](https://badges.gitter.im/lighttoken/Lobby.svg)](https://gitter.im/lighttoken/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)




Simple use Token.


npm install lighttoken


### Options : 

- algorithm. Please check algorithm list.

```
	https://gist.github.com/reggi/4459803#file-openssl-list-cipher-algorithms
```
- expire.
```
	 "m" : minute , "h" : hour , "day" : day , "year" : year , "s" : second 

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



## lightToken.authSign(token, secretKey, options, [callback])


## lightToken.authVerify(token, secretKey, options, [callback])