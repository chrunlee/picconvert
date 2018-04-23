//测试登录是否成功
var superagent = require('superagent');

var loginUrl = 'http://localhost:5500/login';

var user = 'lixun',
	pwd = '111111';

superagent.post(loginUrl).send({user : user,pwd : pwd}).end(function(err,res){
	if(err){
		console.log(err);
	}else{
		console.log(res.text);
	}
});