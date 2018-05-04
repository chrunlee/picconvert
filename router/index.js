var express = require('express');

var formidable = require('formidable');

var router = express.Router();

var Jimp = require('jimp');

var path = require('path');
var fs = require('fs');

var attach = require('../dao/AttachDao');

var {status} = require('../config/config');

var Util = require('../lib/Util');

var ImageUtil = require('../lib/ImageUtil');


/**
 * 首页
 **/
router.get('/',function(req,res,next){
	res.render('index',{});
});
//文件上传
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
        var fileName = file.name;
      	var filePath = file.path;
      	var currentPath = path.join(__dirname,'../'+filePath);
      	Jimp.read(currentPath).then(function(image){
      		if(image && image.bitmap){
            var realPath = Util.upload(currentPath,fileName);
            //保存数据
            attach.uploadOne({
              filePath : realPath,
              ip : req.ip,
              browser : req.headers['user-agent']
            }).then(function(rs){
                var id = rs[0].insertId;
                res.end(Util.getStatus(10003,{
                    filePath : realPath,
                    id : id
                }));
            }).catch(function(err){
                Util.deleteFile(realPath);
                res.end(Util.getStatus(10004));
            });
      		}else{
	      		fs.unlinkSync(path.join(__dirname,'../'+filePath));
	      		res.end(Util.getStatus(10002));	
      		}
      	}).catch(function(err){
            console.log(err);
      		//不是图片,删除上传后的文件
      		fs.unlinkSync(path.join(__dirname,'../'+filePath));
      		res.end(Util.getStatus(10002));
      	});
      });
    }else{
        res.end(Util.getStatus(10009));
    }
});
router.post('/delete',function(req,res,next){
  var id = req.body.id;
  if(id){
    //先获得再删除
    attach.getById(id).then(function(rst){
        var filePath = rst[0][0].filePath;
        Util.deleteFile(filePath);
        return attach.failOne(id);
    }).then(function(rst){
        res.end(Util.getStatus(10005));
    }).catch(function(err){
        res.end(Util.getStatus(10004));
    });
  }
});
/**
 * 下载
 **/
router.post('/download',function(req,res,next){
    var id = req.body.id;
    var compress = req.body.compress;
    compress = parseInt(compress,10);
    if(id){
        //根据内容处理图片，然后生成一个对应的图片，并将该图片设置一个
        //设置前，先将图片复制出一份，然后对复制出的文件进行处理，最后返回
        attach.getById(id).then(function(rs){
          var fileObj = rs[0][0];
          if(fileObj && fileObj.filePath){
            var targetPath = Util.getRealPath(fileObj.filePath);
            var newPath = Util.copyFile(targetPath);
            //对图片进行处理，然后将新的路径存储
            var realNewPath = Util.getRealPath(newPath);
            var iu = new ImageUtil(realNewPath);
            iu.compress(compress).then(function(){
                //图片处理成功，将newPath,进行存储
                attach.updateNewPath(id,newPath).then(function(){
                    res.end(Util.getStatus(10006,{url : '/download/'+id}));
                }).catch(function(err){
                    //保存失败
                    res.end(Util.getStatus(10010));
                });
            }).catch(function(err){
                //图片处理失败
                res.end(Util.getStatus(10010));
            });
          }
        }).catch(function(err){
            console.log(err);
          //失败
          res.end(Util.getStatus(10007));
        });
    }else{
        res.end(JSON.stringify(status[10007]));
    }
});
router.get('/download/:id',function(req,res,next){
    var id= req.params.id;
    if(id){
        attach.getById(id).then(function(rst){
            var rs = rst[0][0];
            var realPath = Util.getRealPath(rs.targetPath);
            var realFilePath = Util.getRealPath(rs.filePath);
            if(fs.existsSync(realPath)){
                res.download(realPath,path.basename(realPath),function(){
                    Util.deleteFile(realPath);//删除转化后的文件
                    Util.deleteFile(realFilePath);
                    //更新数据库
                    attach.successOne(id).catch(function(err){});
                });
            }else{
                res.end(Util.getStatus(10008));
            }
        }).catch(function(){
            res.end(Util.getStatus(10008));
        })
    }else{
        res.end(Util.getStatus(10008));
    }
});
module.exports = router;