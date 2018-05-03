/**
操作attach表，修改数据
**/

var query = require('../lib/sql');

var sqls = {
	uploadOne : 'insert into attach (filePath,ip,browser,createTime,filedel,type) values (?,?,?,?,?,?) ',
	successOne : 'update attach set filedel=?,type=? where id=? ',
	failOne : 'update attach set filedel=1,type=0 where id=? ',
	getById : 'select * from attach where id=? '
};

module.exports = {
	/**
	 * 上传一个新的图片文件，插入数据库
	 **/
	uploadOne : function( data ){
		var list = {
			sql : sqls.uploadOne,
			params : [data.filePath,data.ip,data.browser,new Date(),0,0]
		};
		return query(list);
	},
	/***
  	 * 将文件处理完毕并成功下载,
  	 * 1.更新删除状态
  	 * 2.更新处理状态
	 **/
	successOne : function( id ){
		var list = {
			sql : sqls.successOne,
			params : [1,1,id]
		};
		return query(list);
	},
	/***
	 * 删除或替换
	 *
	 ***/
	failOne : function( id ,cb ){
		var list = {
			sql : sqls.failOne,
			params : [id]
		};
		return query(list);
	},
	/***
	 * 根据ID获得信息
	 *
	 ***/
	getById : function( id ){
		var list = {sql : sqls.getById,params : [id]};
		return query(list);
	}
};