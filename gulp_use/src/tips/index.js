function Tips(){
	this.QRcode = "我是改动后的qrcode";
	this.img = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQGH8TwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyUjl1NHBhMElkZmwxMDAwME0wNzUAAgSGIw9cAwQAAAAA'
}
Tips.prototype.loadingShow = function(text){
	var m = '<div class="tips-load" id="tips-load"><div class="load-container">'
			+'<img src="/Public/common/images/loading.gif" class="loadingimg"/>'
			+'<p>'+(!text?'加载中...':text)+'</p>'
			+'</div></div>'
		$('#tips-load').remove()	
		$('body').append(m);
		$('#tips-load').fadeIn(200)
}
Tips.prototype.loadingHide = function(){
	$('#tips-load').fadeOut(200, function(){
		$('#tips-load').remove()	
	})
}
Tips.prototype.msg = function(text, time) {
	var m = '<div class="tips-middle" id="loadbox">'
			+	'<div class="tips-middle-msg">'+text+'<div>'
			+	'</div>'
			+'</div>'
		$('#loadbox').remove()	
		$('body').append(m);
		$('#loadbox').fadeIn(200)
		time = time || 2000
		setTimeout( function() {
			$('#loadbox').fadeOut(200, function() {
				$('#loadbox').remove()
			})
		}, time)
}
Tips.prototype.destroy = function(){
	$('.popover_bg').remove()
}
//自定义弹窗
Tips.prototype.custom = function(chtml, type) {
		let qhtml='<div class="popover_bg">'
				+'<div class="custom_box_container">'
				+' 	<div class="custom_box">'
				+'  <img src="/Public/common/tips/images/close.png" class="customClose">'
				+chtml
				+'	</div>'
				+'</div>'
				+'</div>'
		$('.popover_bg').remove()
		$('body').append(qhtml);
		if(type) {
			$('.customClose').hide()
		}
		$('.popover_bg').fadeIn(200);

		$('.customClose').click(function() {
			$('.popover_bg').fadeOut(200, function() {
				$('.popover_bg').remove()
			});
		})
		$('.custom_box_container').click(function(event){
			if(event.target == event.currentTarget){
				$('.customClose').trigger('click')
			}
		})	
}

/*
obj-> {
		text:'',
		yesText:'',
		cancelText:'',
		callback: function
		}
*/
Tips.prototype.confirm = function(obj){
	var _t=this
	obj.yesText = obj.yesText || '确定';
	obj.cancelText = obj.cancelText || '取消'
	var con='<div class="confirm_bg" id="confirm">'
			+'	<div class="confirm_container">'
			+'		<div class="confirm_text">'+obj.text+'</div>'
			+'		<div class="confirm_btn">'
			+'			<span id="confirm_cancel">'+obj.cancelText+'</span>'
			+'			<span id="confirm_yes">'+obj.yesText +'</span>'
			+'		</div>'
			+'	</div>'
		  	+'</div>'
	$('#confirm').remove()	
	$('body').append(con);
	$('#confirm').fadeIn()
	
	if(obj.yesText.length > 2){
		$('#confirm_yes').css('marginLeft','1.2rem')
	}
	$('#confirm_cancel').click(function(){
		$('#confirm').fadeOut(200,function(){
			$('#confirm').remove()
		})
	})
	$('.confirm_bg').click(function(event){
		if(event.target===event.currentTarget){
			$('#confirm_cancel').trigger('click')
		}
	})
	$('#confirm_yes').click(function(){
		if(obj.callback !=null && typeof obj.callback == "function") {
			obj.callback.call(_t)
			$('#confirm').fadeOut(200,function(){
				$('#confirm').remove()
			})
		} else {
			$('#confirm').fadeOut(200,function(){
				$('#confirm').remove()
			})
		}
	})
}
//未关注
Tips.prototype.subcribe = function(){
	tip.custom('<div class="subscribe_popover">'
		      +'<img src="/Public/common/tips/images/subscribe.png" class="titlepic"/>'
              +'<img src="'+this.QRcode+'" class="qrcode"/>'
              +'<p>为方便使用和及时接收消息<br>请长按识别二维码</p>'
              +'</div>')
}
//分享成功
Tips.prototype.shareSuccess = function(obj) {
	//文章列表
	var _t = this
	if(obj.type == 1) {
		var shtml = '<div class="popover_bg" id="share_s_type1">'
					+'<div class="custom_box_container">'
					+' 	<div class="custom_box">'
					+'  <img src="/Public/common/tips/images/successTitle.png" class="share_s_title"/>'
					+'	<img src="/Public/common/tips/images/replaceIcon.png" class="share_s_replace"/>'
					+'   	<div id="share_s_articlelist">'
					+'		</div>'
					+'	<div class="share_s_bottombox">'
					+'		<div class="close">关闭</div>'
					+'		<div class="yes">回到首页</div>'
					+'	</div>'
					+'	</div>'
					+'</div>'
					+'</div>'
		$('#share_s_type1').remove()	
		$('body').append(shtml);
		$('#share_s_type1').fadeIn()
		

		$('#share_s_type1 .close').click(function(){
			$('#share_s_type1').fadeOut(200,function(){
				$('#share_s_type1').remove()
			})
		})
		$('#share_s_type1 .yes').click(function(){
			if(obj.callback !=null && typeof obj.callback == "function") {
				obj.callback.call(_t)
				$('#share_s_type1').fadeOut(200,function(){
					$('#share_s_type1').remove()
				})
			}
		})
		function showAlist() {
			if(obj.change !=null && typeof obj.change == "function") {
				 
				obj.change.call(_t, nextfunc)
				// 渲染相关文章函数
				function nextfunc(data){
					if(data.length > 0) {
						$('#share_s_articlelist').html('')
						for (var i = 0; i < data.length; i++) {
							$('#share_s_articlelist').append('<a class="eachlist" href="'+data[i].detail_url+'"><img src="'+data[i].cover+'"/><div>'+data[i].title+'</div></a>')
						}
					}
				}
			}
		}
		showAlist()
		$('.share_s_replace').click(function() {
			showAlist()
		})
	}

	//已关注未开通
	if(obj.type == 2) {
		var shtml = '<div class="popover_bg" id="share_s_type2">'
					+'<div class="custom_box_container">'
					+' 	<div class="custom_box">'
					+'  <img src="/Public/common/tips/images/close.png" class="customClose">'
					+'  <img src="/Public/common/tips/images/warmPrompt.jpg" class="share_s_title"/>'
					+'	<div class="share_s_warn"><img src="/Public/common/tips/images/warning.png"/>'
					+'		<div>您当前为普通会员，无法和客户在线沟通、无法查看客户/人脉信息，为避免资源流失，请及时开通会员。</div>'
					+'	</div>'
					+'	<div class="share_s_bottombox">'
					+'		<div class="close">回到首页</div>'
					+'		<div class="yes">开通会员</div>'
					+'	</div>'
					+'	</div>'
					+'</div>'
					+'</div>'
		$('#share_s_type2').remove()	
		$('body').append(shtml);
		$('#share_s_type2').fadeIn()
		
		$('.customClose').click(function() {
			$('#share_s_type2').fadeOut(200, function() {
				$('#share_s_type2').remove()
			});
		})
		$('#share_s_type2 .close').click(function(){
			if(obj.cancel !=null && typeof obj.cancel == "function") {
				obj.cancel.call(_t)
				$('#share_s_type2').fadeOut(200, function(){
					$('#share_s_type2').remove()
				})
			}
		})
		$('#share_s_type2 .yes').click(function(){
			if(obj.callback !=null && typeof obj.callback == "function") {
				obj.callback.call(_t)
				$('#share_s_type2').fadeOut(200,function(){
					$('#share_s_type2').remove()
				})
			}
		})
	}

	//没关注
	if(obj.type == 3) {
		var shtml = '<div class="popover_bg" id="share_s_type3">'
					+'<div class="custom_box_container">'
					+' 	<div class="custom_box">'
					+'  <img src="/Public/common/tips/images/close.png" class="customClose">'
					+'  <img src="/Public/common/tips/images/warmPrompt.jpg" class="share_s_title"/>'
					+'		<img src="'+this.img+'" class="qrcode"/>'
					+'		<div class="qrcodeTiptext">长按识别开启访问通知</div>'
					+'			<div class="knowed">知道了</div>'
					+'	</div>'
					+'	</div>'
					+'</div>'
					+'</div>'
		$('#share_s_type3').remove()	
		$('body').append(shtml);
		$('#share_s_type3').fadeIn()
		
		$('.customClose').click(function() {
			$('#share_s_type3').fadeOut(200, function() {
				$('#share_s_type3').remove()
			});
		})
		$('.knowed').click(function(){
			$('.customClose').trigger('click')
		})
	}
}

Tips.prototype.addInfo = function(callback, obj){
	var _t = this
	var ahtml = '<div class="popover_bg" id="addinfobox">'
				+'</div>'
				+'	<div class="addinfo_box">'
				+'		<p>为方便客户联系你,请完善名片信息</p>'
				+'		<div class="infoLine"><span>姓名</span><input type="text" id="name" value="'+obj.name+'"></div>'
				+'		<div class="infoLine"><span>电话</span><input type="tel" id="tel"></div>'
				+'		<div class="infoLine"><span>称谓</span><input type="text" id="job" value="'+obj.job+'"></div>'
				+'		<dl class="addinfo_btn"><dd class="cancel">取消</dd><dd class="save">保存</dd></dl>'
				+'	</div>'
	$('#addinfobox').remove()	
	$('body').append(ahtml);
	$('#addinfobox').fadeIn(100)
	$('.addinfo_box').css('bottom','0')
	
	$('.addinfo_btn .cancel').click(function() {
		$('.addinfo_box').css('bottom','-100%')
		
		$('#addinfobox').remove()
		
	})
	$('#addinfobox').click(function(){
		$('.addinfo_btn .cancel').trigger('click')
	})
	$('.addinfo_btn .save').click(function() {
		var infoobj={
			name: $('.addinfo_box #name').val(),
			tel: $('.addinfo_box #tel').val(),
			job: $('.addinfo_box #job').val()
		}
		if(!infoobj.name){
			_t.msg('名字不能为空')
			return
		}
		if(!infoobj.tel){
			_t.msg('电话不能为空')
			return
		}
		var telEXP=/^(0|86|17951)?(13[0-9]|15[012356789]|17[1234567890]|18[0-9]|14[57])[0-9]{8}$/
		if(infoobj.tel && !(telEXP.test(infoobj.tel)) ){
			_t.msg('请输入正确的电话号码')
			return
		}
		if(!infoobj.job){
			_t.msg('称谓不能为空')
			return
		}
		callback.call(_t, infoobj)
		$('.addinfo_box').css('bottom','-100%')
		
		$('#addinfobox').remove()
	})
}