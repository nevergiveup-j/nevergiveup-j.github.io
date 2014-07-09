$(function(){
	var init = {
		jisuan: function(obj,num){
			$(obj).each(function(){
				var objs = $(this).html();
				objs = objs.length > num ? objs.substr(0,num)+'……' : objs;
				$(this).html(objs);
			});
		} 
	};
	init.jisuan('.answer .moreanswer section p a',50);
	init.jisuan('.descript section header span',50);
	$('.answer .moreanswer section').each(function(){
		if($(this).index() < 3){
			$(this).show();
		}
	});
	$('.answer .moreanswer .moreMain span').tap(function(){
		$(this).hide();
		$('.answer .moreanswer section').show();
	});
	$('.descript section .pic,.descript section p').hide();
	$('.descript section b').tap(function(){
		$(this).hide();
		$('.descript section .pic,.descript section p').show();
	});
	
})