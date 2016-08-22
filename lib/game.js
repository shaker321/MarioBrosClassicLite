const Turtles = require("./turtles.js");
const Mario = require("./mario.js");
const DrawItems = require("./draw_items.js");
const PlusOrMinus = require("./plus_or_minus.js");

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
