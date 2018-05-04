/**
 * 处理业务中的重复动作
 ***/

var path = require('path');
var status = require('../config/status');
var fs = require('fs');

var Util = {
	//根据相对路径删除文件
	deleteFile : function( filePath ){
		if(fs.existsSync(filePath)){
			fs.unlinkSync(filePath);
			return true;
		}else{
			var realPath = Util.getRealPath(filePath);
			if(fs.existsSync(realPath)){
				fs.unlinkSync(realPath);
				return true;
			}
		}
		return false;
	},
	//根据上传上的文件路径，将文件保存到另外的路径，并返回路径
	upload : function( currentPath,fileName ){
		var extName = path.extname(fileName);
		var newName = Util.getNewName(extName);
		var newPath = '/upload/'+newName;
		var newPathAbs = Util.getRealPath(newPath);
		fs.renameSync(currentPath,newPathAbs);
		return newPath;
	},
	//返回一个新的文件名字
	getNewName : function( extname ){
		return (+new Date())+'-'+(Math.floor(Math.random()*100))+extname;
	},
	//根据code获得status内的内容，并返回字符串
	getStatus : function( code ,obj ){
		obj = obj || {};
		var statusObj = status[code];
		var newObj = Object.assign(statusObj,obj);
		return JSON.stringify(newObj);
	},
	//根据相对路径获得绝对路径
	getRealPath : function( filePath ){
		return path.join(__dirname,'../public',filePath);
	},
	//copy
	copyFile : function( filePath ){
		if(!fs.existsSync(filePath)){
			filePath = Util.getRealPath(filePath);
		}
		//根据文件路径，重新复制一个新的文件，并写入数据，返回新的文件的路径
		var extname = path.extname(filePath);
		var newName = Util.getNewName(extname);
		var newPath = '/upload/'+newName;
		var newRealPath = Util.getRealPath(newPath);
		fs.renameSync(filePath,newRealPath);
		return newPath;
	}

};

module.exports = Util;