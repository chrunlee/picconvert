//测试访问者的IP地址是否正确
var express = require('express');

var Router = express.Router();

Router.get('/',function(req,res,next){
	var ip = req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
        req.connection.remoteAddress || // 判断 connection 的远程 IP
        req.socket.remoteAddress || // 判断后端的 socket 的 IP
        req.connection.socket.remoteAddress;
	res.end(ip);
});

module.exports = Router;