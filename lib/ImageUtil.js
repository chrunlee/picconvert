/***
 * 对图片进行处理，包括：压缩、旋转、裁切、模糊等等
 ***/

var Jimp = require('jimp');

var ImageUtil  = function( filePath  ){
	this.filePath = filePath;
	return this;
}

//对图片进行压缩
ImageUtil.prototype.compress = function( compressVal ){
	var thiz = this;
	return new Promise(function(resolve,reject){
		Jimp.read(thiz.filePath).then(function(image){
			image.quality(compressVal).write(thiz.filePath);
			resolve();
		}).catch(function(err){
			reject(err);//
		});
	});
}

module.exports = ImageUtil;