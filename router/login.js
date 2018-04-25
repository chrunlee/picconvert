var express = require('express');

var sql = require('../lib/sql');

var token = require('../lib/token');

var Router = express.Router();

Router.post('/',function(req,res,next){

	//验证登录是否成功
	var rs = {
		success : false,
		msg : '用户名或密码不正确'
	};
	var user = req.body.user,
		pwd = req.body.pwd;

	//数据库校验用户名和密码
	sql.checkUser(user,pwd,function(err,rst){
		if(err){
			res.end(JSON.stringify(rs));
		}else{
			if(rst && rst.length > 0){
				var user = rst[0];
				//登录成功
				//获得token
				var str = token.createToken(user,3600);
				rs.success = true;
				rs.msg = '登录成功';
				rs.token = str;
				res.end(JSON.stringify(rs));
			}else{
				res.end(JSON.stringify(rs));
			}
		}
	});
});

module.exports = Router;