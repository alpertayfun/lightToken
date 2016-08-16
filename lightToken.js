
var crypto;
var dateJs = require("./date.js");

//Default variables
var	algorithm = 'DES-EDE-CBC',
	algorithm2 = 'AES-256-CBC',
	algorithm3 = 'BF-CBC',
	expire = "0",
	expireCheck = ["m","h","days","years","s"],newCheckTime="";


try {
	

	Object.prototype.hasOwnProperty = function(property) {
	    return this[property] !== undefined;
	};

	crypto = require('crypto');
	module.exports.authSign = function(message,key,options,callback){
		
		if(typeof options === 'object')
		{
			try{
				var now = Date.today();

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
				var crypted2 = cipher2.update(crypted,'utf8','hex');
				crypted2 += cipher2.final('hex');

				var cipher3 = crypto.createCipher(algorithm3,key);
				var crypted3 = cipher3.update(crypted2+"."+JSON.stringify(options)+"."+now+"."+expire,'utf8','hex');
				crypted3 += cipher3.final('hex');
				callback({sign:""+crypted+"."+crypted2+"."+crypted3+"",algorithm:algorithm,expire:expire});
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
			try{

				var decipher3 = crypto.createDecipher(algorithm3,key)
				var dec3 = decipher3.update(messageGet[2],'hex','utf8')
				dec3 += decipher3.final('utf8');
				var optionsGet = dec3.split(".");
				var options = JSON.parse(optionsGet[1]);
				
				if(optionsGet.length==4)
				{
					if(options.hasOwnProperty("algorithm"))
					{
						algorithm = options.algorithm;
					}

					var cipher3 = crypto.createCipher(algorithm3,key);
					var crypted3 = cipher3.update(messageGet[1]+"."+JSON.stringify(options)+"."+optionsGet[2]+"."+optionsGet[3],'utf8','hex');
					crypted3 += cipher3.final('hex');

					if(crypted3==messageGet[2])
					{
						
						var checkTime = optionsGet[3];

						var cipher2 = crypto.createCipher(algorithm2,key);
						var crypted2 = cipher2.update(messageGet[0],'utf8','hex');
						crypted2 += cipher2.final('hex');

						var decipher2 = crypto.createDecipher(algorithm2,key)
						var dec2 = decipher2.update(optionsGet[0],'hex','utf8')
						dec2 += decipher2.final('utf8');


						if(crypted2==messageGet[1])
						{
							if(checkTime=="0"){
						
									

									var decipher = crypto.createDecipher(algorithm,key)
									var dec = decipher.update(dec2,'hex','utf8')
									dec += decipher.final('utf8');
									callback({verify:JSON.parse(dec)});
									return JSON.parse(dec);
							}else{

								if (expireCheck.some(function(e) { return checkTime.indexOf(e) >= 0; })) {
									
									var compare1 = new Date(optionsGet[2]);
									var compare2 = new Date(optionsGet[2]);
									
									if(checkTime.indexOf("h") !== -1)
									{
										newCheckTime = checkTime.replace("h","");
										compare2 = compare2.add({ hours: newCheckTime});
										
										if(Date.today().between(compare1,compare2))
										{

											var decipher = crypto.createDecipher(algorithm,key)
											var dec = decipher.update(dec2,'hex','utf8')
											dec += decipher.final('utf8');
											callback({verify:JSON.parse(dec)});
											return JSON.parse(dec);
										}else{
											callback({error:"auth Error"});
											return "auth Error";
										}
									}

									if(checkTime.indexOf("m") !== -1)
									{
										newCheckTime = checkTime.replace("m","");
										compare2 = compare2.add({ minutes: newCheckTime});
										
										if(Date.today().between(compare1,compare2))
										{

											var decipher = crypto.createDecipher(algorithm,key)
											var dec = decipher.update(dec2,'hex','utf8')
											dec += decipher.final('utf8');
											callback({verify:JSON.parse(dec)});
											return JSON.parse(dec);
										}else{
											callback({error:"auth Error"});
											return "auth Error";
										}
									}

									if(checkTime.indexOf("days") !== -1)
									{
										newCheckTime = checkTime.replace("days","");
										compare2 = compare2.add({ days: newCheckTime});
										
										if(Date.today().between(compare1,compare2))
										{

											var decipher = crypto.createDecipher(algorithm,key)
											var dec = decipher.update(dec2,'hex','utf8')
											dec += decipher.final('utf8');
											callback({verify:JSON.parse(dec)});
											return JSON.parse(dec);
										}else{
											callback({error:"auth Error"});
											return "auth Error";
										}
									}

									if(checkTime.indexOf("years") !== -1)
									{
										newCheckTime = checkTime.replace("years","");
										compare2 = compare2.add({ years: newCheckTime});
										
										if(Date.today().between(compare1,compare2))
										{

											var decipher = crypto.createDecipher(algorithm,key)
											var dec = decipher.update(dec2,'hex','utf8')
											dec += decipher.final('utf8');
											callback({verify:JSON.parse(dec)});
											return JSON.parse(dec);
										}else{
											callback({error:"auth Error"});
											return "auth Error";
										}
									}

									if(checkTime.indexOf("s") !== -1)
									{
										newCheckTime = checkTime.replace("s","");
										compare2 = compare2.add({ seconds: newCheckTime});
										
										if(Date.today().between(compare1,compare2))
										{

											var decipher = crypto.createDecipher(algorithm,key)
											var dec = decipher.update(dec2,'hex','utf8')
											dec += decipher.final('utf8');
											callback({verify:JSON.parse(dec)});
											return JSON.parse(dec);
										}else{
											callback({error:"auth Error"});
											return "auth Error";
										}
									}
								}
							
							}
						}else{
							callback({error:"auth Error"});
							return "auth Error";
						}
					}else{
						callback({error:"auth Error"});
						return "auth Error";
					}
				}else{
					callback({error:"auth Error"});
					return "auth Error";
				}
			}catch(e){
				callback({error:"auth Error"});
				return "auth Error";
			}
		}else{
			callback({error:"auth Error"});
			return "auth Error";
		}
	
	};

} catch (err) {
	console.log('crypto support is disabled!');
	return "auth Error";
}