/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const Mario = __webpack_require__(3);
	
	document.addEventListener("DOMContentLoaded", function(){
	  const canvas = document.getElementById("myCanvas");
	  const ctx = canvas.getContext("2d");
	
	  const game = new Game(ctx);
	  game.titleScreen();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Turtles = __webpack_require__(2);
	const Mario = __webpack_require__(3);
	const DrawItems = __webpack_require__(4);
	const PlusOrMinus = __webpack_require__(5);
	
	class Game {
	  constructor(ctx) {
	    this.ctx = ctx;
	    this.shouldDrawTurtle1 = true;
	    this.shouldDrawTurtle2 = true;
	    this.shouldDrawTurtle3 = true;
	    this.drawItems = new DrawItems (this.ctx);
	    this.turtles = new Turtles (this.drawItems, this.ctx);
	    this.mario = new Mario (this.drawItems, this.ctx);
	    this.lastMarioY = this.mario.marioY;
	  }
	
	  titleScreen() {
	    this.draw();
	    this.drawTitle();
	
	    let play = (e) => {
	      if (e.keyCode === 13) {
	        this.play();
	        window.removeEventListener("keydown", play);
	      }
	    };
	
	    window.addEventListener("keydown", play);
	  }
	
	  drawTitle() {
	    let title = new Image();
	    title.src = 'images/title.png';
	    title.onload = () => { this.ctx.drawImage(title, 35, 50, 250, 100); };
	
	    this.ctx.fillStyle= "white";
	    this.ctx.font = "18px Sans-Serif";
	    this.ctx.fillText("Press ENTER to play.", 74, 240);
	  }
	
	  draw() {
	    this.ctx.clearRect(0, 0, 320, 320);
	    this.drawItems.drawBackground();
	    this.drawItems.drawBrickFloor();
	    this.drawItems.drawPlatform1();
	    this.drawItems.drawPlatform2();
	    this.drawItems.drawPlatform3();
	    this.drawItems.drawPlatform4();
	    this.drawItems.drawPlatform5();
	    this.drawItems.drawPlatform6();
	    this.drawItems.drawPlatform7();
	    this.mario.drawMario();
	
	    if (this.shouldDrawTurtle1) { this.turtles.drawTurtle1(); }
	    if (this.shouldDrawTurtle2) { this.turtles.drawTurtle2(); }
	    if (this.shouldDrawTurtle3) { this.turtles.drawTurtle3(); }
	
	    this.drawItems.drawRightPipeTop();
	    this.drawItems.drawRightPipeBottom();
	    this.drawItems.drawLeftPipeTop();
	    this.drawItems.drawLeftPipeBottom();
	  }
	
	  gameOver() {
	    return ((PlusOrMinus(this.mario.marioX, 10, this.turtles.turtle1X).includes(this.turtles.turtle1X) &&
	              (this.mario.marioY + 10 === this.turtles.turtle1Y || this.mario.marioY + 9 === this.turtles.turtle1Y) &&
	              this.shouldDrawTurtle1) ||
	            (PlusOrMinus(this.mario.marioX, 10, this.turtles.turtle2X).includes(this.turtles.turtle2X) &&
	              (this.mario.marioY + 10 === this.turtles.turtle2Y || this.mario.marioY + 9 === this.turtles.turtle2Y) &&
	              this.shouldDrawTurtle2) ||
	            (PlusOrMinus(this.mario.marioX, 10, this.turtles.turtle3X).includes(this.turtles.turtle3X) &&
	              (this.mario.marioY + 10 === this.turtles.turtle3Y || this.mario.marioY + 9 === this.turtles.turtle3Y) &&
	              this.shouldDrawTurtle3));
	  }
	
	  gameWon() {
	    return (!this.shouldDrawTurtle1 && !this.shouldDrawTurtle2 && !this.shouldDrawTurtle3);
	  }
	
	  drawGameOver() {
	    let gameOver = new Image();
	    gameOver.src = 'images/game_over.png';
	    gameOver.onload = () => { this.ctx.drawImage(gameOver, 100, 100); };
	  }
	
	  drawWinner() {
	    let winner = new Image();
	    winner.src = 'images/winner.png';
	    winner.onload = () => { this.ctx.drawImage(winner, 50, 100); };
	  }
	
	  killTurtle() {
	    if (this.mario.marioY === this.turtles.turtle1Y + 37 && PlusOrMinus(this.mario.marioX, 10, this.turtles.turtle1X).includes(this.turtles.turtle1X)) {
	      this.shouldDrawTurtle1 = false;
	    }
	
	    if (this.mario.marioY === this.turtles.turtle2Y + 37 && PlusOrMinus(this.mario.marioX, 10, this.turtles.turtle2X).includes(this.turtles.turtle2X)) {
	      this.shouldDrawTurtle2 = false;
	    }
	
	    if (this.mario.marioY === this.turtles.turtle3Y + 37 && PlusOrMinus(this.mario.marioX, 10, this.turtles.turtle3X).includes(this.turtles.turtle3X)) {
	      this.shouldDrawTurtle3 = false;
	    }
	  }
	
	  playTurn() {
	    this.turtles.moveTurtles();
	    this.killTurtle();
	    this.draw();
	
	    if (this.gameOver()) {
	      clearInterval(this.timer);
	      this.drawGameOver();
	    }
	
	    if (this.gameWon()) {
	      clearInterval(this.timer);
	      this.draw();
	      this.drawWinner();
	    }
	  }
	
	  play() {
	    this.timer = setInterval(() => { this.playTurn(); }, 100);
	  }
	}
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	class Turtles {
	  constructor(drawItems, ctx) {
	    this.turtle1X = 265;
	    this.turtle1Y = 141;
	    this.turtle2X = 0;
	    this.turtle2Y = 55;
	    this.turtle3X = 250;
	    this.turtle3Y = 55;
	    this.drawItems = drawItems;
	    this.ctx = ctx;
	  }
	
	  drawTurtle1() {
	    let turtle1 = new Image();
	    turtle1.src = 'images/turtle.png';
	
	    if (this.turtle1X > 300) { this.turtle1X = 0; }
	    else if (this.turtle1X < 0) { this.turtle1X = 300; }
	
	    this.ctx.drawImage(turtle1, this.turtle1X, this.turtle1Y);
	  }
	
	  drawTurtle2() {
	    let turtle2 = new Image();
	    turtle2.src = 'images/red_turtle.png';
	
	    if (this.turtle2X > 300) { this.turtle2X = 0; }
	    else if (this.turtle2X < 0) { this.turtle2X = 300; }
	
	    this.ctx.drawImage(turtle2, this.turtle2X, this.turtle2Y);
	  }
	
	  drawTurtle3() {
	    let turtle3 = new Image();
	    turtle3.src = 'images/backwards_turtle.png';
	
	    if (this.turtle3X > 300) { this.turtle3X = 0; }
	    else if (this.turtle3X < 0) { this.turtle3X = 300; }
	
	    this.ctx.drawImage(turtle3, this.turtle3X, this.turtle3Y);
	  }
	
	  fallDownTurtle(numTurtle) {
	    let turtleX;
	    let turtleY;
	
	    if (numTurtle === 1) {
	      turtleY = this.turtle1Y;
	      turtleX = this.turtle1X;
	    } else if (numTurtle === 2) {
	      turtleY = this.turtle2Y;
	      turtleX = this.turtle2X;
	    } else if (numTurtle === 3) {
	      turtleY = this.turtle3Y;
	      turtleX = this.turtle3X;
	    }
	
	    let platformsTurtleIsAbove = [];
	
	    Object.keys(this.drawItems.platformCoords).map((platform) => {
	      if (turtleY < this.drawItems.platformCoords[platform].yMax &&
	          turtleX + 20 <= this.drawItems.platformCoords[platform].xMax &&
	          turtleX >= this.drawItems.platformCoords[platform].xMin) {
	            platformsTurtleIsAbove.push(platform);
	      }
	    });
	
	    let nearestPlatform;
	    let nearestPlatformY = 320;
	
	    platformsTurtleIsAbove.map((platform) => {
	      if (nearestPlatformY > this.drawItems.platformCoords[platform].yMax) {
	        nearestPlatformY = this.drawItems.platformCoords[platform].yMax;
	        nearestPlatform = platform;
	      }
	    });
	
	    if (nearestPlatformY > 262) {
	      turtleY = 272;
	    } else {
	      turtleY = nearestPlatformY - 25;
	    }
	
	    return turtleY;
	  }
	
	  fallDownTurtle1() {
	    return this.fallDownTurtle(1);
	  }
	
	  fallDownTurtle2() {
	    return this.fallDownTurtle(2);
	  }
	
	  fallDownTurtle3() {
	    return this.fallDownTurtle(3);
	  }
	
	  moveTurtles() {
	    this.turtle1X += 5;
	    this.turtle2X += 10;
	    this.turtle3X -= 5;
	
	    this.turtle1Y = this.fallDownTurtle1();
	    this.turtle2Y = this.fallDownTurtle2();
	    this.turtle3Y = this.fallDownTurtle3();
	
	    if (this.turtle1X > 300 && this.turtle1Y > 230) { this.turtle1Y = 55; }
	    if (this.turtle2X > 300 && this.turtle2Y > 230) { this.turtle2Y = 55; }
	    if (this.turtle3X < 0 && this.turtle3Y > 230) { this.turtle3Y = 55; }
	  }
	}
	
	module.exports = Turtles;


/***/ },
/* 3 */
/***/ function(module, exports) {

	class Mario {
	  constructor(drawItems, ctx) {
	    this.marioX = 155;
	    this.marioY = 262;
	    this.rightPressed = false;
	    this.leftPressed = false;
	    this.upPressed = false;
	    this.drawItems = drawItems;
	    this.ctx = ctx;
	    this.keyFired = false;
	    this.leftLastPressed = true;
	
	    this.addListeners();
	  }
	
	  addListeners() {
	    document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
	    document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
	  }
	
	  drawMario() {
	    if (this.marioX > 300) {
	      this.marioX = 0;
	    } else if (this.marioX < 0) {
	      this.marioX = 300;
	    }
	
	    if (this.rightPressed) {
	      this.marioX += 15;
	    } else if (this.leftPressed) {
	      this.marioX -= 15;
	    }
	
	    if (this.upPressed) {
	      this.marioY -= this.stopJump(70);
	      this.upPressed = false;
	    } else {
	      this.marioY = this.fallDown();
	    }
	
	    let mario = new Image();
	
	    if (this.leftLastPressed) {
	      mario.src = 'images/mario.png';
	    } else {
	      mario.src = 'images/mario_backwards.png';
	    }
	
	    this.ctx.drawImage(mario, this.marioX, this.marioY);
	  }
	
	  keyDownHandler(e) {
	    if (e.keyCode === 39) {
	      this.rightPressed = true;
	      this.leftLastPressed = false;
	    } else if (e.keyCode === 37) {
	      this.leftPressed = true;
	      this.leftLastPressed = true;
	    }
	
	    if (!this.fired && e.keyCode === 38) {
	      this.upPressed = true;
	      this.fired = true;
	    }
	  }
	
	  keyUpHandler(e) {
	    if (e.keyCode === 39) {
	      this.rightPressed = false;
	    } else if (e.keyCode === 37) {
	      this.leftPressed = false;
	    }
	
	    if (e.keyCode === 38) {
	      this.upPressed = false;
	      this.fired = false;
	    }
	  }
	
	  stopJump(initJump) {
	    let jumpHeight = initJump;
	
	    Object.keys(this.drawItems.platformCoords).map((platform) => {
	      if ((this.marioY - this.drawItems.platformCoords[platform].yMax <= jumpHeight &&
	          this.marioY > this.drawItems.platformCoords[platform].yMax &&
	          this.marioY - jumpHeight <= this.drawItems.platformCoords[platform].yMax &&
	          this.marioX + 20 <= this.drawItems.platformCoords[platform].xMax &&
	          this.marioX >= this.drawItems.platformCoords[platform].xMin) || this.marioY - jumpHeight <= 0) {
	        jumpHeight = this.marioY - 12 - this.drawItems.platformCoords[platform].yMax;
	      }
	    });
	
	    if (this.marioY + jumpHeight < 0) {
	      jumpHeight = this.marioY;
	    }
	
	    return jumpHeight;
	  }
	
	  fallDown() {
	    let platformsMarioIsAbove = [];
	
	    Object.keys(this.drawItems.platformCoords).map((platform) => {
	      if (this.marioY < this.drawItems.platformCoords[platform].yMax &&
	          this.marioX + 20 <= this.drawItems.platformCoords[platform].xMax &&
	          this.marioX >= this.drawItems.platformCoords[platform].xMin) {
	            platformsMarioIsAbove.push(platform);
	      }
	    });
	
	    let nearestPlatform;
	    let nearestPlatformY = 320;
	
	    platformsMarioIsAbove.map((platform) => {
	      if (nearestPlatformY > this.drawItems.platformCoords[platform].yMax) {
	        nearestPlatformY = this.drawItems.platformCoords[platform].yMax;
	        nearestPlatform = platform;
	      }
	    });
	
	    if (nearestPlatformY > 262) {
	      this.marioY = 262;
	    } else {
	      this.marioY = nearestPlatformY - 34;
	    }
	
	    return this.marioY;
	  }
	}
	
	module.exports = Mario;


/***/ },
/* 4 */
/***/ function(module, exports) {

	class DrawItems {
	  constructor(ctx) {
	    this.ctx = ctx;
	    this.platformCoords = {
	      platform1Coords: { xMin: -20, xMax: 133, yMax: 230, yMin: 208 },
	      platform2Coords: { xMin: 190, xMax: 340, yMax: 230, yMin: 208 },
	      platform3Coords: { xMin: -20, xMax: 58, yMax: 165, yMin: 243 },
	      platform4Coords: { xMin: 260, xMax: 340, yMax: 165, yMin: 243 },
	      platform5Coords: { xMin: 90, xMax: 230, yMax: 145, yMin: 123 },
	      platform6Coords: { xMin: -20, xMax: 143, yMax: 80, yMin: 58 },
	      platform7Coords: { xMin: 177, xMax: 340, yMax: 80, yMin: 58 }
	    };
	  }
	
	  drawBackground() {
	    this.ctx.beginPath();
	    this.ctx.rect(0, 0, 320, 320);
	    this.ctx.fillStyle = "#000000";
	    this.ctx.fill();
	    this.ctx.closePath();
	  }
	
	  drawBrickFloor() {
	    let brickFloor = new Image();
	    brickFloor.src = 'images/brick.png';
	    this.ctx.drawImage(brickFloor, 0, 295);
	  }
	
	  drawPlatform1() {
	    let platform1 = new Image();
	    platform1.src = 'images/platform.png';
	    this.ctx.drawImage(platform1, -70, 230);
	  }
	
	  drawPlatform2() {
	    let platform2 = new Image();
	    platform2.src = 'images/platform.png';
	    this.ctx.drawImage(platform2, 200, 230);
	  }
	
	  drawPlatform3() {
	    let platform3 = new Image();
	    platform3.src = 'images/platform.png';
	    this.ctx.drawImage(platform3, -145, 165);
	  }
	
	  drawPlatform4() {
	    let platform4 = new Image();
	    platform4.src = 'images/platform.png';
	    this.ctx.drawImage(platform4, 270, 165);
	  }
	
	  drawPlatform5() {
	    let platform5 = new Image();
	    platform5.src = 'images/platform2.png';
	    this.ctx.drawImage(platform5, 100, 145);
	  }
	
	  drawPlatform6() {
	    let platform6 = new Image();
	    platform6.src = 'images/platform.png';
	    this.ctx.drawImage(platform6, -60, 80);
	  }
	
	  drawPlatform7() {
	    let platform7 = new Image();
	    platform7.src = 'images/platform.png';
	    this.ctx.drawImage(platform7, 187, 80);
	  }
	
	  drawRightPipeTop() {
	    let rightPipeTop = new Image();
	    rightPipeTop.src = 'images/right_pipe.png';
	    this.ctx.drawImage(rightPipeTop, 271, 27);
	  }
	
	  drawRightPipeBottom() {
	    let rightPipeBottom = new Image();
	    rightPipeBottom.src = 'images/right_pipe.png';
	    this.ctx.drawImage(rightPipeBottom, 271, 243);
	  }
	
	  drawLeftPipeTop() {
	    let leftPipeTop = new Image();
	    leftPipeTop.src = 'images/left_pipe.png';
	    this.ctx.drawImage(leftPipeTop, 0, 27);
	  }
	
	  drawLeftPipeBottom() {
	    let leftPipeBottom = new Image();
	    leftPipeBottom.src = 'images/left_pipe.png';
	    this.ctx.drawImage(leftPipeBottom, 0, 243);
	  }
	}
	
	module.exports = DrawItems;


/***/ },
/* 5 */
/***/ function(module, exports) {

	function plusOrMinus(baseNumber, spreadNumber, questionedNumber) {
	  let possibleValues = [baseNumber];
	
	  for (let i = spreadNumber + baseNumber; i > baseNumber; i-- ) { possibleValues.push(i); }
	  for (let i = baseNumber - spreadNumber; i < baseNumber; i++ ) { possibleValues.push(i); }
	
	  return possibleValues;
	}
	
	module.exports = plusOrMinus;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map