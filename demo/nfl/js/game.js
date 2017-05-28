(function() {

	var viewWidth = $(window).width();
	var viewHeight = $(window).height();

	var Game = new Phaser.Game(viewWidth, viewHeight, Phaser.AUTO, '#game');

  var gameTimes = 30;
  var score = 0;
  var timer = null;

	var States = {
		preload: function() {

			this.preload = function() {
				Game.stage.backgroundColor = '#eee';
				Game.load.crossOrigin = 'anonymous';

				Game.load.image('start_bg', './images/start_game.png');
				Game.load.image('state_bg', './images/state_bg.jpg');
				Game.load.image('top_bg', './images/top_bg.png');
				Game.load.image('goal', './images/goal.png');
				Game.load.image('goalkeeper', './images/goalkeeper.png');
				Game.load.image('stick', './images/stick.png');
				Game.load.image('ball', './images/ball.png');

				for(var i = 0; i < 10; i++) {
					Game.load.image('number_' + i, './images/n_'+ i +'.png');
				}

				var progressText = Game.add.text(Game.world.centerX, Game.world.centerY, '0%', {
          fontSize: '60px',
          fill: '#666'
        });

        progressText.anchor.setTo(0.5, 0.5);

        Game.load.onFileComplete.add(function(progress) {
        	progressText.text = progress + '%';
        });

        var deadLine = false;

        setTimeout(function() {
        	deadLine = true;
        }, 100)

        Game.load.onLoadComplete.add(onLoad);

        function onLoad() {
        	if (deadLine) {
            // 已到达最小展示时间，可以进入下一个场景
            Game.state.start('created');
          } else {
            // 还没有到最小展示时间，1秒后重试
            setTimeout(onLoad, 1000);
          }
        }
			}
		},
		created: function() {
			this.create = function() {
				var width = Game.world.width;
				var height = Game.world.height;
				var centerX = Game.world.centerX;

				var bg = Game.add.image(0, 0, 'state_bg');
        bg.width = width;
        bg.height = height;

        var topBg = Game.add.image(centerX, height * 0.08, 'top_bg');
        var topBgImage = Game.cache.getImage('top_bg');
        topBg.width = width * 0.95;
        topBg.height = topBg.width / topBgImage.width * topBgImage.height;

        topBg.anchor.setTo(0.5, 0.5);

        var goal = Game.add.image(centerX, height * 0.26, 'goal');
        var goalImage = Game.cache.getImage('goal');
        goal.width = width * 0.5;
        goal.height = goal.width / goalImage.width * goalImage.height;

        goal.anchor.setTo(0.5, 0.5);

        // 守门
    		var goalkeeper = Game.add.image(centerX, height * 0.34, 'goalkeeper');
        var goalkeeperImage = Game.cache.getImage('goalkeeper');
        goalkeeper.width = width * 0.2;
        goalkeeper.height = goalkeeper.width / goalkeeperImage.width * goalkeeperImage.height;

        goalkeeper.anchor.setTo(0.5, 0.5);

        // 添加点击事件
        // Game.input.onTap.add(function() {
            Game.state.start('play');
        // });
        
			}
		},
		play: function() {
			var stick;
			var balls;
			var ball;
      var ballX = 0;
      var ballY = 0;
      var goal;
			var goalkeeper;
			var isBall = false;
      var isballKill = true; 
      var isScoreTween = false;

			this.create = function() {
				var width = Game.world.width;
				var height = Game.world.height;
				var centerX = Game.world.centerX;
        var ballDefaultY = height * 0.7;
        var ballDefaultX = 0;
        var ballTweenY = ballDefaultY;

				function randomX() {
	      	return Math.random() * width;
	      }


        timer = setInterval(function() {
          gameTimes--;
          createNumber(gameTimes, true);

          if(gameTimes <= 0) {
            clearInterval(timer);
            // gameEnd();
            // Game.state.start('created');
          }
        }, 1000)

				// 开启物理引擎
				Game.physics.startSystem(Phaser.Physics.ARCADE);
    		// Game.physics.arcade.gravity.y = 400;

				var bg = Game.add.image(0, 0, 'state_bg');
        bg.width = width;
        bg.height = height;

        var topBg = Game.add.image(centerX, height * 0.08, 'top_bg');
        var topBgImage = Game.cache.getImage('top_bg');
        topBg.width = width * 0.95;
        topBg.height = topBg.width / topBgImage.width * topBgImage.height;

        topBg.anchor.setTo(0.5, 0.5);

        // 球门
        goal = Game.add.sprite(centerX, height * 0.26, 'goal');
        var goalImage = Game.cache.getImage('goal');
        goal.width = width * 0.5;
        goal.height = goal.width / goalImage.width * goalImage.height;

        goal.anchor.setTo(0.5, 0.5);

        Game.physics.enable(goal);
        goal.body.immovable = true;

        // 守门
        goalkeeper = Game.add.sprite(width * 0.2, height * 0.34, 'goalkeeper');
    		// goalkeeper = Game.add.sprite(centerX, height * 0.34, 'goalkeeper');
        var goalkeeperImage = Game.cache.getImage('goalkeeper');
        goalkeeper.width = width * 0.2;
        goalkeeper.height = goalkeeper.width / goalkeeperImage.width * goalkeeperImage.height;

        goalkeeper.anchor.setTo(0.5, 0.5);

        Game.physics.enable(goalkeeper);

        goalkeeper.body.immovable = true;

        Game.add.tween(goalkeeper).to({ x: width * 0.8 },1000,null,true,0,Number.MAX_VALUE,true);

        stick = Game.add.sprite(centerX, height * 0.67, 'stick');
        var stickImage = Game.cache.getImage('stick');
        stick.width = width * 0.35;
        stick.height = stick.width / stickImage.width * stickImage.height;

        stick.anchor.setTo(0.3, 0.5);
     

        balls = Game.add.group();
        balls.enableBody = true;

        var ballTimer = Game.time.create(true);

        createBall();

        ballTimer.loop(1000, createBall);

        ballTimer.start();

        function createBall() {
        	if(isBall) {
        		return;
        	}

          ballDefaultX = Game.world.randomX;


        	ball = balls.create(ballDefaultX, ballDefaultY, 'ball');
        	ball.type = 'ball';

        	var ballImage = Game.cache.getImage('ball');
	        ball.width = width * 0.1;
	        ball.height = ball.width / ballImage.width * ballImage.height;
	        ball.anchor.setTo(0.5, 0.5);

          if(ballDefaultX < ball.width + 20){
            ballDefaultX = ball.width + 20;
            ball.x = ballDefaultX 
          }

          if(ballDefaultX > (width - ball.width - 20)) {
            ballDefaultX = width - ball.width - 20;
            ball.x = ballDefaultX;
          } 

        	Game.physics.enable(ball);

          Game.add.tween(stick).to({ 
            x: ballDefaultX
          },100,Phaser.Easing.Linear.None,true,0,0,false);

        	isBall = true;
          isballKill = true;

        	// angle

        	// ball.body.acceleration.y = 50;
        	
        	// ball.body.maxAngular = 0.5;

        	// ball.body.allowRotation = true;
        	// 边缘碰撞
	        ball.body.collideWorldBounds = true;
          ball.body.onWorldBounds = new Phaser.Signal();
          ball.body.onWorldBounds.add(function(ball, up, down, left, right) {
            isBall = false;
            ball.kill();
          });


        }

        // 事件
      	var touching = false,
          startX = 0,
      		startY = 0,
      		endX = 0,
      		endY = 0,
      		angle = 0;

        ballX = ball.x;
        ballY = ball.y;

      	Game.input.onDown.add(function(pointer) {
          if(Math.abs(pointer.x - ballX) < ball.width * 2 && Math.abs(pointer.y - ballY) < ball.height * 2) {
      		  touching = true;
          }


      		startX = pointer.x;
      		startY = pointer.y;
      	})

      	Game.input.onUp.add(function(pointer) {
          if(!touching) {
            return
          }
      		
      		angle = Math.atan2((startY - endY),(endX - startX)) * 180 / Math.PI;

          ballTweenY = ballY;
          stick.y = ballTweenY;


          var stickTween = Game.add.tween(stick).to({ 
            y: ballTweenY - 30
            // alpha: 0
          },100,Phaser.Easing.Linear.None,true,0,0,true);

          stickTween.onComplete.add(function() {
            stick.y = ballTweenY;
          })

          if(startY - pointer.y > 5) {
            Game.physics.arcade.moveToPointer(ball, height);
          }else{
            ball.body.velocity.y = -Game.world.height;
          }
          
          touching = false;
      	})

      	Game.input.addMoveCallback(function(pointer, x, y, isTap) {
      		if(isTap) {
      			return;
      		}

      		endX = x;
      		endY = y;
      	})
        

        // console.log(ball)
			}

			this.update = function() {
        ballX = ball.x;
        ballY = ball.y;
				Game.physics.arcade.collide(goalkeeper, balls, goalkCb);

				Game.physics.arcade.collide(goal, balls, goalScore);
			}

			// 创建数
			function createNumber(number, isleft) {
				var width = Game.world.width;
				var height = Game.world.height;
        var x = Game.world.centerX * 0.52;

        if(!isleft) {
          x = width * 0.878;
        }

        if(+number <= 9) {
          number = '0' + number;
        }

        var arr = number.toString().split('');

        var number1 = Game.add.image(x, height * 0.086, 'number_' + arr[0], 'number');
        var numberImage = Game.cache.getImage('number');
        number1.width = width * 0.04;
        number1.height = number1.width * 1.1;

        var number2 = Game.add.image(x + number1.width + 2, height * 0.086, 'number_' + arr[1], 'number');
        number2.width = width * 0.04;
        number2.height = number1.width * 1.1;

				
			}			

      function goalkCb(goalk, ball) {
        ball.body.velocity.y = Game.world.height / 2;
      }

			// 进球
			function goalScore(goal, ball) {
        if(isScoreTween) {
          return;
        }

        isScoreTween = true;

        var showTween = Game.add.tween(ball).to({ 
            y: ball.y - 50
          },100,Phaser.Easing.Linear.None,true,0,0,false);
				
        showTween.onComplete.add(function() {
          var hideTween = Game.add.tween(ball).to({ 
            y: ball.y - 10,
            alpha: 0
          },100,Phaser.Easing.Linear.None,true,0,0,false);
          hideTween.onComplete.add(function() {
            isScoreTween = false;
            ball.kill();
            isballKill = false;
            isBall = false;
          })
        });

				score += 1;

        // createNumber(score);

				console.log('score==' + score)
			}

      this.render = function() {

      }
		},
		over: function() {
      this.create = function() {
        Game.debug.spriteInfo(ball, 32, 100);
      }
		}
	}


  // function gameEnd() {
  //   $('#J_gameEnd').show();
  //   $('#J_ballNumber').html(score)
  // }

  // $('#J_startGame').on('click', function() {
  //   $('#J_startPage').hide();
  // });

  // $('#J_ruleGameStart').on('click', function() {
  //   $('#J_gameRule').hide();
  //   Game.state.start('play');
  // });

	// Make.init();
	Object.keys(States).map(function(key) {
    Game.state.add(key, States[key]);
	});

	Game.state.start('preload');

})();