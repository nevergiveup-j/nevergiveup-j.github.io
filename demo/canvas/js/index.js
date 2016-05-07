

var imageEditor = {
	init: function() {
		var self = this;

		this.config = {
			width: 320,
			height: 320,
			fps: 60
		};

		this.ratio = $(window).width() / 640;
		this.canvas = null;
		this.stage = null;
		this.em = null;
		this.bgImg = null;


		// 图片
		this.imgs = {
			bg: 'images/photo-area.png'
		};

		this.loadImg(this.imgs.bg, function(img) {
			self.config.width = img.width * self.ratio;
			self.config.height = img.height * self.ratio;

			self.bgImg = img;

			var canvas = self.render();
			self.startStage(img, canvas);

			self.uploadPeople([
				'images/ydb-body.png',
				'images/jiangsu.png'
			]);
		});

		this.bind();

	},
	render: function() {
		var self = this;

		// 创建canvas
		var canvas = Quark.createDOM('canvas', {
			width: this.config.width,
			height: this.config.height,
			id: 'canvas',
			style: {
			}
		});

		$('#canvas-wrap')
			.css({
				width: this.config.width
			})
			.append(canvas);

		this.canvas = canvas;

		return canvas;
	},
	bind: function() {
		var self = this;

		$('#J_buttonUploadPeople').on('click', function() {
			self.allClear();
			self.addBg(self.bgImg);

			self.uploadPeople([
				'images/wulei-body.png',
				'images/shanghai.png'
			]);
		});


		$('#J_buttonUploadPhoto').on('click', function() {
			self.addPhoto();
		});

		$('#J_buttonmakePhoto').on('click', function() {
			self.canvasToImage();
		})

	},
	/**
	 * 舞台
	 */
	startStage: function(img, canvas) {
		var self = this;

		var config = this.config;

		var context = new Quark.CanvasContext({canvas: canvas});

		// 创建舞台
		this.stage = new Quark.Stage({width: this.config.width, height: this.config.height, context:context});

		// 注册舞台事件
		this.em = new Quark.EventManager();
		this.events = Quark.supportTouch ? ["touchstart", "touchmove", "touchend"] : ["mousedown", "mousemove", "mouseup"];
		this.em.registerStage(this.stage, this.events);

		// 计时器
		var timer = this.timer = new Quark.Timer(1000/this.config.fps);
		timer.addListener(self.stage);
		timer.addListener(Quark.Tween);
		timer.start();

		this.addBg(img);
	},
	loadImg: function(url, callback) {
		var self = this;

		var img = new Image();

		img.onload = function() {
			callback && callback(img);
		}

		img.src = url;
	},
	addBg: function(img) {
		// 增加背景
		var bgImg = new Quark.Bitmap({image: img});

		bgImg.scaleX = this.ratio;
		bgImg.scaleY = this.ratio;

		this.stage.addChild(bgImg);
	},
	/**
	 * 更新
	 */
	uploadPeople: function(arr) {
		var self = this;

		// 添加人物
		this.loadImg(arr[0], function(img) {
			var peopleImg = new Quark.Bitmap({image: img});

			peopleImg.y = self.config.height / 16;
			peopleImg.x = self.config.width / 2 - 10;
			peopleImg.scaleX = self.ratio;
			peopleImg.scaleY = self.ratio;

			self.stage.addChild(peopleImg);

		});

		// 添加名称
		this.loadImg(arr[1], function(img) {
			var addressImg = new Quark.Bitmap({image: img});

			addressImg.y = self.config.height / 2.6;
			addressImg.x = self.config.width / 1.28;
			addressImg.scaleX = self.ratio;
			addressImg.scaleY = self.ratio;

			self.stage.addChild(addressImg);

		});
	},
	/**
	 * 添加图片
	 */
	addPhoto: function() {
		var self = this,
			width = this.config.width / 3,
			height = this.config.width / 3;

		var imgContainer = new Quark.DisplayObjectContainer({
			width: width,
			height: height
		});
	},
	allClear: function() {
		this.stage.removeAllChildren();
	},
	/**
	 * 生成图片
	 */
	canvasToImage: function() {
		var self = this;


		// 已测手机QQ浏览器canvas.toDataURL有问题，使用jeegEncoder
		window.setTimeout(function(){
			var encoder = new JPEGEncoder();
			var data = encoder.encode(self.canvas.getContext('2d').getImageData(0,0,self.config.width,self.config.height), 90);

			console.log(data);
		}, 1000/self.config.fps)

	}
}

imageEditor.init();