var express = require('express');

var formidable = require('formidable');

var router = express.Router();

var Jimp = require('jimp');

var path = require('path');
var fs = require('fs');

var status = require('../config/status');

router.get('/',function(req,res,next){
	res.render('index',{});
});
//文件上传
/***
1.确定文件格式
2.确定文件大小
3.确定上传者身份
4.确定浏览器
5.确定来源
6.确定token
***/
var isFormdata = function(req){
  var type = req.headers['content-type'] || '';
  return -1 < type.indexOf('multipart/form-data');
};
router.post('/upload',function(req,res,next){
	if(isFormdata(req)){
      var form = formidable.IncomingForm();
      form.uploadDir = 'public/upload';
      form.parse(req,function(err,fileds,files){
      	var file = files.file;//上传的文件
      	var fileSize = file.size,
      		type = file.type,
      		name = file.name,
      		filePath = file.path;
      	var currentPath = path.join(__dirname,'../'+filePath);
      	Jimp.read(currentPath).then(function(image){
      		if(image && image.bitmap){
	      		var extName = path.extname(name);
	      		var fileName = (+new Date())+'-'+(Math.floor(Math.random()*100))+extName;
	      		var realPath = '/upload/'+fileName;
	      		var targetPath = path.join(__dirname,'../public'+realPath);
	      		fs.renameSync(currentPath,targetPath);
	      		res.end(JSON.stringify(Object.assign(status[10003],{
	      			filePath : realPath,
	      			id : '111'
	      		})));
      		}else{
	      		fs.unlinkSync(path.join(__dirname,'../'+filePath));
	      		res.end(JSON.stringify(status[10002]));	
      		}
      	}).catch(function(err){
      		//不是图片,删除上传后的文件
      		fs.unlinkSync(path.join(__dirname,'../'+filePath));
      		res.end(JSON.stringify(status[10002]));
      	});
      });
    }
});
module.exports = router;