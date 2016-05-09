(function() {

	var Make = {
		init: function() {
			var self = this;

			this.width = $(window).width();
			this.height = $(window).height();
			this.bg = 'images/page_bg_2.jpg';
			this.ratio = this.width / 640;
			this.textArr = [
				'宋仲基',
				'SONG ZHONG JI'
			];
			this.fps = 60;

			this.$input = $('.input-name');

			this.render();
			this.bind();
		},
		render: function() {
			var self = this;

			// 创建canvas
			var canvas = Quark.createDOM('canvas', {
				width: this.width,
				height: this.height,
				id: 'canvas',
				style: {
				}
			});

			self.canvas = canvas;

			$('.page-2').append(canvas);


			var context = new Quark.CanvasContext({canvas: canvas});

			// 创建舞台
			this.stage = new Quark.Stage({width: this.width, height: this.height, context:context});

			// 注册舞台事件
			this.em = new Quark.EventManager();
			this.events = Quark.supportTouch ? ["touchstart", "touchmove", "touchend"] : ["mousedown", "mousemove", "mouseup"];
			this.em.registerStage(this.stage, this.events);

			// 计时器
			var timer = this.timer = new Quark.Timer(1000/this.fps);
			timer.addListener(self.stage);
			timer.addListener(Quark.Tween);
			timer.start();

			this.loadImg(this.bg, function(img) {
				// 增加背景
				var bgImg = new Quark.Bitmap({image: img});

				bgImg.y = self.height - (img.height * self.ratio);

				bgImg.scaleX = self.ratio;
				bgImg.scaleY = self.ratio;

				self.stage.addChild(bgImg);

			});

			return canvas;
		},
		bind: function() {
			var self = this;

			$('#J_buttonToImage').on('click', function() {
				self.name();
			});
		},
		loadImg: function(url, callback) {
			var self = this;

			var img = new Image();

			img.onload = function() {
				callback && callback(img);
			}

			img.src = url;
		},
		name: function() {
			var self = this,
				val = $.trim(this.$input.val());

			if(val.length < 1){
				alert('请输入姓名');
				return
			}

			var text = new Quark.Text({
				text: val,
				color: '#444547',
				font: '400 12px Microsoft Yahei'
			});

			var posX = self.width / 12;

			text.y = self.height / 1.45;
			text.x = posX;

			self.stage.addChild(text);

			var textEn = new Quark.Text({
				text: self.textArr[1],
				color: '#444547',
				font: '400 12px aldoPC'
			});

			textEn.y = self.height / 1.4;
			textEn.x = posX;

			self.stage.addChild(textEn);

			$('.ui-page').hide();
			$('.page-2').show();

			self.canvasToImage();
		},
		canvasToImage: function(callback) {
			var self = this;

			window.setTimeout(function(){
				var encoder = new JPEGEncoder();
				var data = encoder.encode(self.canvas.getContext('2d').getImageData(0,0,self.width,self.height), 90);

				callback && callback.call(self, data);

				$('#J_pagePhoto').attr('src', data);
				$('#canvas').hide();

			}, 1000/self.fps)
		}
	}


	Make.init();

})();