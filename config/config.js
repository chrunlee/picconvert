var config = {
	port : 5500,//端口
	mysql :  {
		host : '127.0.0.1',
		port : '3306',
		user : 'root',
		password : 'root',
		database : 'picconvert'
	},
	//上传路径
	uploadDir : 'public/upload',
	//状态
	status : {
		10001 : {
			code : 10001,
			msg : 'token验证不通过或已过期'
		},
		10002 : {
			code : 10002,
			msg : '上传的文件不是图片或图片已损坏'
		},
		10003 : {
			code : 10003,
			msg : '上传成功'
		},
		10004 : {
			code : 10004,
			msg : '服务器错误'
		},
		10005 : {
			code : 10005,
			msg : '数据删除成功'
		},
		10006 : {
			code : 10006,
			msg : '下载成功'
		},
		10007 : {
			code : 10007,
			msg : '数据错误或不存在'
		},
		10008 : {
			code : 10008,
			msg : '该数据已删除，请重新上传图片进行处理'
		},
		10009 : {
			code : 10009,
			msg : '上传类型不是multipart'
		},
		10010 : {
			code : 10010,
			msg : '图片处理失败，请重试'
		}
	}
};

module.exports = config;