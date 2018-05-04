/****
 * 定时任务
 ***/

//1.每5分钟，检查一次数据库，将对应的数据清除

var attach = require('../dao/AttachDao');
var async = require('async');
var path = require('path');
var fs = require('fs');

var schedule = require('node-schedule');

//每隔5分钟清一次数据库
var job = schedule.scheduleJob('*/6 * * * *',function(){
	console.log('执行日常5分钟清理数据 fire at '+ new Date())
	attach.getLastData().then(function(rs){
		// console.log(rs);
		var list = rs[0];
		if(list && list.length > 0){
			async.mapLimit(list,5,function(item,cb){
				clearData(item,cb);
			},function(err,rs){
				console.log('clear down with :'+list.length + ' records ');
			});
		}

	}).catch(function(err){
		//错误或链接失败或其他原因，忽略
	});
});

//每隔一天，清理一次上传的文件，全部清空
var job2 = schedule.scheduleJob('0 0 */1 * *',function(){
	var uploadPath = path.join(__dirname,'../public/upload/');
	console.log('执行日常文件清空 fire at '+ new Date());
	fs.readdir(uploadPath,function(err,files){
		if(files && files.length > 0){
			files.forEach(function( item ){
				var tempPath = path.join(uploadPath,item);
				if(fs.existsSync(tempPath)){
					fs.unlinkSync(tempPath);
				}
			});
		}
	});
});

//将数据清楚
function clearData ( item,cb ){
	var filePath = item.filePath,targetPath = item.targetPath || '',
		id = item.id;
	var basePath = path.dirname(__dirname);
	var filePathAbs = path.join(basePath,'public',filePath);
	var targetPathAbs = path.join(basePath,'public',targetPath);
	if(fs.existsSync(filePathAbs)){
		fs.unlinkSync(filePathAbs);
	}
	if(targetPath != '' && fs.existsSync(targetPathAbs)){
		fs.unlinkSync(targetPathAbs);
	}
	//文件删除完毕，更新数据库
	attach.failOne(id).then(function(rs){
		cb(null);
	}).catch(function(err){
		cb(null);
	});
}




module.exports = {};