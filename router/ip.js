//测试访问者的IP地址是否正确
var express = require('express');

var Router = express.Router();

Router.get('/',function(req,res,next){
	var str = req.ip;
	var ips = /[\d]{1,3}.[\d]{1,3}.[\d]{1,3}.[\d]{1,3}/.exec(str);
	var ip = '';
	if(ips && ips.length > 0){
		ip = ips[0];
	}
	res.end(ip);
});

module.exports = Router;