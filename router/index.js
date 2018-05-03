var express = require('express');

var formidable = require('formidable');

var router = express.Router();

var Jimp = require('jimp');

var path = require('path');
var fs = require('fs');

var attach = require('../dao/AttachDao');

var status = require('../config/status');


/**
 * 首页
 **/
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
/***
 * 图片上传
 **/
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
                //保存数据
                attach.uploadOne({
                  filePath : realPath,
                  ip : req.id,
                  browser : ipbrowser.browser
                }).then(function(rs){
                    var id = rs[0].insertId;
                    res.end(JSON.stringify(Object.assign(status[10003],{
                      filePath : realPath,
                      id : id
                    })));
                }).catch(function(err){
                    fs.unlinkSync(path.join(__dirname,'../public'+realPath));
                    res.end(JSON.stringify(status[10004]));
                });
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
router.post('/delete',function(req,res,next){
  var id = req.body.id;
  if(id){
    //先获得再删除
    attach.getById(id).then(function(rst){
        var filePath = rst[0][0].filePath;
        fs.unlinkSync(path.join(__dirname,'../public'+filePath));
        return attach.failOne(id);
    }).then(function(rst){
        res.end(JSON.stringify(status[10005]));
    }).catch(function(err){
        res.end(JSON.stringify(status[10004]));
    });
  }
});
/**
 * 下载
 **/
router.post('/download',function(req,res,next){
    var id = req.body.id;
    if(id){
        //根据内容处理图片，然后生成一个对应的图片，并将该图片设置一个
        var rs = status[10006];
        rs.url = '/download/'+id;
        res.end(JSON.stringify(rs));
    }else{
        res.end(JSON.stringify(status[10007]));
    }
});
router.get('/download/:id',function(req,res,next){
    var id= req.params.id;
    if(id){
        attach.getById(id).then(function(rst){
            var rs = rst[0][0];
            var filePath = rs.filePath;
            var realPath = path.join(__dirname,'../public'+filePath);
            if(fs.existsSync(realPath)){
                res.download(realPath,path.basename(realPath),function(){
                    fs.unlinkSync(realPath);
                    //更新数据库
                    attach.successOne(id).catch(function(err){});
                });
            }else{
                res.end('该数据已删除，请重新上传图片进行处理');
            }
        }).catch(function(){
            res.end('该数据已删除，请重新上传图片进行处理');
        })
    }else{
        res.end('该数据已删除，请重新上传图片进行处理');
    }
});
module.exports = router;