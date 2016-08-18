## lightToken


[![license](https://img.shields.io/badge/license-MIT-green.svg?style=flat)](https://raw.githubusercontent.com/alpertayfun/lightToken/master/LICENSE)
[![Build Status](https://api.travis-ci.org/alpertayfun/lightToken.svg?branch=master)](https://travis-ci.org/alpertayfun/lightToken)
[![Join the chat at https://gitter.im/lighttoken/Lobby](https://badges.gitter.im/lighttoken/Lobby.svg)](https://gitter.im/lighttoken/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


[![NPM](https://nodei.co/npm/lighttoken.png?compact=true)](https://nodei.co/npm/lighttoken/)


Simple use Token.


### Description


lightToken contains open-ssl-cipher-algorithms by three section like Json Web Token. 

#### First Section

> Encryption started with choosed one algorithm. Encryption data : payload

#### Second Section

> Encryption contuniued with RC4-HMAC-MD5 algorithm. Encryption data : options + "." + lightTID

#### Third Section

> Encryption contuniued with RC4-HMAC-MD5 algorithm. Encryption data : timestamped date now + "." + expire


```
npm install lighttoken
```


### Configuration

- secretKey ( key ): A shared or secret key.
- payload : Javascript Object.
- options : algorithm ( Default : DES-EDE-CBC ), expire ( Default : 0 ( infite ) ). 


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

```js
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

Returns :

- Valid Values : 

```js
{ sign: "f16d6e37f9ab859655d48ec22f1c9c18.c651a664f843a743a8a665f744f3df1ad3b14556b19b62681e2a9e6c51fd19604d0d51c9c748f5be8edfeb068300b17e.ea7a4b17cd381a43e67a1c049ab4bac4ee559582a373129745a5d231cb440f1fe63033f40e9effce6f1213e1e1c0b39dc8b015850cd5264189996fe18fae9ec97b52f1e944d73849aca134789feeb112d82408fc50946a1cf75f295641e3bc88bbc28eab2d3a6d99cb7fc44df366a58ba578a8d40d380252e5d2934238db0451d1f33665dee52a81b29e4cebd7f482ad760033be67ff9203b0b95c72d107de861cfc9b07b9d84812d6c85add96ee7924afc456d3483420a0507f1f6c9b162da5565a5ddc993c7b3eebc699643e1005f68145e4d785f8de8e186d3aef05f29d315b4a9ea11d4a532b6acdb5ba409de8661f7973007173e4bac9c5966d19c9c9718e6ab1ae63ffb9e74888fa7fe57b528b7a3af60aff4069ffd387f1e10cf469865bcade4c052f30fc3786c9f6901f14c10e959ac708348c5d94800b4fdd93a9321db370853e68af0b",
  algorithm: "DES-EDE-CBC",
  expire: "3m",
  lightTID: "eyJmb28iOiJiYXIifXx8fDBrOGo3aDZnNWY0ZDNzMmFrOGo3aDZnNWY0ZDNzMmF8fHxUdWUgQXVnIDE2IDIwMTYgMTg6MjI6MjUgR01UKzAzMDAgKEdUQiBZYXogU2FhdGkp" }
```

- Error Values :

```js
{error:"auth Error"}
```

## lightToken.authVerify(token, secretKey, options, [callback])

Returns :

- Valid Values : 

```js
{ verify: { foo: 'bar' },
  lightTID: "eyJmb28iOiJiYXIifXx8fDBrOGo3aDZnNWY0ZDNzMmFrOGo3aDZnNWY0ZDNzMmF8fHxUdWUgQXVnIDE2IDIwMTYgMTg6MjI6MjUgR01UKzAzMDAgKEdUQiBZYXogU2FhdGkp" }
```

- Error Values :

```js
{error:"auth Error"}
```

### Changelog

## Version - 1.0.31

- Date object changed to timestamp. 
- Changed algorithm2 & algorithm3 with "RC4-HMAC-MD5"
- Fixes for large tokens

### Support

Need help or have a question?

- [Gitter Chat Room](https://gitter.im/lighttoken/Lobby)