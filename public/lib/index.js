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
					$('.img-container').html('<img src="'+res.filePath+'" id="'+res.id+'" style="max-width:100%;max-height:100%;"/>');
					$('.img-container').addClass('upload');
				}else{
					byy.win.msg(res.msg);
				}
			},
			onSelect : function(){
				var $img = $('.img-container img');
				if($img.length > 0){
					var lastId = $img.attr('id');
					deleteFile(lastId);
				}
			}
		});
		//校验
		var rules = {
			rules : {
				compress : {required : true,max : 100,min : 10,digits : true}
			}
		};
		byy('.byy-form').validate(rules);
		//下载图片
		$('#download').on('click',download);
		if($('footer').offset().top < $(window).height() - 30 ){
			$('footer').addClass('fixed');
		}
	};
	var download = function(){
		var $img = $('.img-container img');
		if($img.length > 0){
			var id = $img.attr('id');
			if(byy('.byy-form').valid()){
				var ldx = byy.win.load(1);

				var formData = byy('.byy-form').getValues();
				formData.id = id;
				$.ajax({
					url : '/download',
					type : 'POST',
					data : formData,
					success : function(res){
						byy.win.close(ldx);
						var resobj = byy.json(res);
						if(resobj && resobj.code === 10006){
							window.open(resobj.url);
							$('.img-container').removeClass('upload');
							$('.img-container').html('');
						}else{
							byy.win.msg(resobj.msg);
						}
					}
				});
			}
		}else{
			byy.win.msg('请先上传图片后再进行下载');
		}
	}
	var deleteFile = function( id ){
		$.ajax({
			url : '/delete',
			type : 'POST',
			data : {id : id},
			success : function(r){console.log(r)}
		});
	}
	var start = function(){
		bind();
	}
	return {
		start : start
	};
};
byy.require(['jquery','uploader','validator'],function(){
	var index = new Index();
	index.start();
})