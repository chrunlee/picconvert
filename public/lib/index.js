var Index = function(){
	var bind = function(){
		//上传,校验ID，存在则删除
		byy.uploader().simpleImage({
			selector : '#upload',
			md5 : false,
			count : 1,
			auto : true,
			server : '/upload',
			onSuccess : function(file,res){
				if(res && res.filePath && res.code == 10003){
					$('.img-container').html('<img src="'+res.filePath+'" style="max-width:100%;max-height:100%;"/>');
				}else{
					byy.win.msg(res.msg);
				}
			}
		});
	};
	var start = function(){
		bind();
	}
	return {
		start : start
	};
};
byy.require(['jquery','uploader'],function(){
	var index = new Index();
	index.start();
})