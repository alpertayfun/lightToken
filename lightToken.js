
var crypto;
var dateJs = require("./date.js");

//Default variables
var	algorithm = 'DES-EDE-CBC',
	algorithm2 = 'AES-256-XTS',
	algorithm3 = 'AES-256-XTS',
	expire = "0",
	expireCheck = ["m","h","day","year","s"],
	newCheckTime="",
	lightTID="";

var Base64 = {


    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",


    encode: function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },


    decode: function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

    _utf8_encode: function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    _utf8_decode: function(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }
};


try {

	var timeStamp = function(date){
		return Math.floor(date / 1000);
	};

	var deCrypto = function(algorithm,key,dec2,lightTIDEnc0,optionsGet4,callback){
							
		var decipher = crypto.createDecipher(algorithm,key)
		var dec = decipher.update(dec2,'hex','utf8')
		dec += decipher.final('utf8');
		


		if(dec==lightTIDEnc0)
		{
			callback({verify:JSON.parse(dec),lightTID:optionsGet4 });
		}else{
			callback({error:"auth Error"});
		}
		

	};

	Object.prototype.hasOwnProperty = function(property) {
	    return this[property] !== undefined;
	};

	crypto = require('crypto');
	module.exports.authSign = function(message,key,options,callback){
	

		if(typeof options === 'object')
		{
			try{

				var now = Date.now();
				
				lightTID = Base64.encode(JSON.stringify(message)+"|||"+key+"|||"+now);

				if(options.hasOwnProperty("algorithm"))
				{
					algorithm = options.algorithm;
				}

				if(options.hasOwnProperty("expire"))
				{
					expire = options.expire;
				}

				var cipher = crypto.createCipher(algorithm,key);
				var crypted = cipher.update(JSON.stringify(message),'utf8','hex');
				crypted += cipher.final('hex');
				
				var cipher2 = crypto.createCipher(algorithm2,key);
				var crypted2 = cipher2.update(JSON.stringify(options)+"."+lightTID,'utf8','hex');
				crypted2 += cipher2.final('hex');

				var cipher3 = crypto.createCipher(algorithm3,key);
				var crypted3 = cipher3.update(now+"."+expire,'utf8','hex');
				crypted3 += cipher3.final('hex');


				callback({sign:""+crypted+"."+crypted2+"."+crypted3+"",algorithm:algorithm,expire:expire,lightTID:lightTID});
				return crypted+"."+crypted2+"."+crypted3;
				
			}catch(e){
				callback({error:"auth Error"});
				return "auth Error";
				
			}
		}else{
			callback({error:"options not defined"});
			return "options not defined";
		}	
	};

	module.exports.authVerify = function(message,key,callback){
		
		var messageGet = message.split(".");
	
		if(messageGet.length==3)
		{
			

				var decipher3 = crypto.createDecipher(algorithm3,key)
				var dec3 = decipher3.update(messageGet[2],'hex','utf8')
				dec3 += decipher3.final('utf8');
				var decGet = dec3.split(".");
		

				if(decGet.length==2)
				{
					

					var cipher3 = crypto.createCipher(algorithm3,key);
					var crypted3 = cipher3.update(decGet[0]+"."+decGet[1],'utf8','hex');
					crypted3 += cipher3.final('hex');
			
	
					if(crypted3==messageGet[2])
					{
						
						
						

						var decipher2 = crypto.createDecipher(algorithm2,key)
						var dec2 = decipher2.update(messageGet[1],'hex','utf8')
						dec2 += decipher2.final('utf8');

						var optionsGet = dec2.split(".");
						var options = JSON.parse(optionsGet[0]);

						var cipher2 = crypto.createCipher(algorithm2,key);
						var crypted2 = cipher2.update(optionsGet[0]+"."+optionsGet[1],'utf8','hex');
						crypted2 += cipher2.final('hex');

						var checkTime = decGet[1];

						var lightTIDEnc = Base64.decode(optionsGet[1]).split("|||");
						

						if(options.hasOwnProperty("algorithm"))
						{
							algorithm = options.algorithm;
						}
						

						if(crypted2==messageGet[1])
						{
							
							if(checkTime=="0")
							{
								deCrypto(algorithm,key,messageGet[0],lightTIDEnc[0],optionsGet[1], function(data){
									callback(data);
								});
							}else{

								if (expireCheck.some(function(e) { return checkTime.indexOf(e) >= 0; })) {
									
									var compare1 = new Date(decGet[0]);
									var compare2 = new Date(decGet[0]);
									
									if(checkTime.indexOf("h") !== -1)
									{
										newCheckTime = checkTime.replace("h","");
										compare2 = compare2.add({ hours: newCheckTime});
										
										if(Date.now().between(compare1,compare2))
										{

											deCrypto(algorithm,key,messageGet[0],lightTIDEnc[0],optionsGet[1], function(data){
												callback(data);
											});
										}else{
											callback({error:"auth Error"});
											return "auth Error";
										}
									}

									if(checkTime.indexOf("m") !== -1)
									{
										newCheckTime = checkTime.replace("m","");
										compare2 = compare2.add({ minutes: newCheckTime});
										
										if(Date.now().between(compare1,compare2))
										{

											deCrypto(algorithm,key,messageGet[0],lightTIDEnc[0],optionsGet[1], function(data){
												callback(data);
											});
										}else{
											callback({error:"auth Error"});
											return "auth Error";
										}
									}

									if(checkTime.indexOf("day") !== -1)
									{
										newCheckTime = checkTime.replace("day","");
										compare2 = compare2.add({ days: newCheckTime});
										
										if(Date.now().between(compare1,compare2))
										{

											deCrypto(algorithm,key,messageGet[0],lightTIDEnc[0],optionsGet[1], function(data){
												callback(data);
											});
										}else{
											callback({error:"auth Error"});
											return "auth Error";
										}
									}

									if(checkTime.indexOf("year") !== -1)
									{
										newCheckTime = checkTime.replace("year","");
										compare2 = compare2.add({ years: newCheckTime});
										
										if(Date.now().between(compare1,compare2))
										{

											deCrypto(algorithm,key,messageGet[0],lightTIDEnc[0],optionsGet[1], function(data){
												callback(data);
											});
										}else{
											callback({error:"auth Error"});
											return "auth Error";
										}
									}

									if(checkTime.indexOf("s") !== -1)
									{
										newCheckTime = checkTime.replace("s","");
										compare2 = compare2.add({ seconds: newCheckTime});
										
										if(Date.now().between(compare1,compare2))
										{

											deCrypto(algorithm,key,messageGet[0],lightTIDEnc[0],optionsGet[1], function(data){
												callback(data);
											});
										}else{
											callback({error:"auth Error"});
											return "auth Error";
										}
									}
								}
							
							}
						}else{
							callback({error:"auth3 Error"});
							return "auth3 Error";
						}
					}else{
						callback({error:"auth4 Error"});
						return "auth4 Error";
					}
				}else{
					callback({error:"auth Error"});
					return "auth Error";
				}
		
		}else{
			callback({error:"auth Error"});
			return "auth Error";
		}
	
	};

} catch (err) {
	return "auth Error";
}