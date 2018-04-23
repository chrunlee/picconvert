//测试登录是否成功
var superagent = require('superagent');

var loginUrl = 'http://localhost:5500/login';
var user = 'lixun',
	pwd = '111111';

var testUrl = 'http://localhost:5500/api/test';


superagent.post(loginUrl).send({user:user,pwd : pwd }).end(function(err,res){
	if(err){
		console.log(err);
	}else{
		var rs = JSON.parse(res.text);
		if(rs.token){
			var token = rs.token;
			testTest(token);
		}else{
			console.log(rs.msg);
		}
	}
});

function testTest(token){
	superagent.post(testUrl).send({token : token}).end(function(err,res){
		if(err){
			console.log(err);
		}else{
			console.log(res.text);
		}
	});
}

