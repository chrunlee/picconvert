/***
 * 根据请求获得对应请求的IP和对应的浏览器版本
 ***/
 function getIpAndBrowser(req){
 	console.log(req.ip);
 	var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    var browser = req.headers['user-agent']||'';
 	return {
 		ip : ip,
 		browser : browser
 	};
 }

 module.exports = getIpAndBrowser;