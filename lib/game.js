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
    this.level = 1;
    this.score = 0;
    this.life1 = true;
    this.life2 = true;
    this.life3 = true;
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
    this.ctx.clearRect(0, 0, 320, 320);
    this.drawItems.drawBackground();

    let title = new Image();
    title.src = 'images/title.png';
    title.onload = () => { this.ctx.drawImage(title, 35, 50, 250, 100); };

    this.ctx.fillStyle= "white";
    this.ctx.font = "14px Sans-Serif";
    this.ctx.fillText("Defeat each turtle by jumping and hitting", 35, 180);
    this.ctx.fillText("the platform directly beneath it,", 63, 198);
    this.ctx.fillText("but don't let it touch you!", 84, 216);

    this.ctx.font = "20px Sans-Serif";
    this.ctx.fillText("Press ENTER to play.", 67, 270);
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

    if (this.life1) {this.mario.drawLife1();}
    if (this.life2) {this.mario.drawLife2();}
    if (this.life3) {this.mario.drawLife3();}

    this.drawItems.drawRightPipeTop();
    this.drawItems.drawRightPipeBottom();
    this.drawItems.drawLeftPipeTop();
    this.drawItems.drawLeftPipeBottom();

    this.ctx.font = "12px Sans-Serif";
    this.ctx.fillStyle= "white";
    this.ctx.fillText(`Score: ${this.score}`, 15, 25);

    this.ctx.font = "14px Sans-Serif";
    this.ctx.fillStyle= "gold";
    this.ctx.fillText(`LEVEL ${this.level}`, 132, 25);
  }

  loseAlife() {
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

  deathReset() {
    clearInterval(this.timer);
    this.mario.marioY = 155;
    this.mario.marioX = 15;
    this.draw();
    setTimeout(this.play.bind(this), 1200);
  }

  subtractAlife() {
    if (this.loseAlife() && this.life1 === true && this.life2 === true && this.life3 === true) {
      this.life1 = false;
      this.deathReset();
    } else if (this.loseAlife() && this.life1 === false && this.life2 === true && this.life3 === true) {
      this.life2 = false;
      this.deathReset();
    } else if (this.loseAlife() && this.life1 === false && this.life2 === false && this.life3 === true) {
      this.life3 = false;
      this.deathReset();
    }
  }

  gameOver() {
    return (this.loseAlife() && this.life1 === false && this.life2 === false && this.life3 === false);
  }

  gameWon() {
    return (!this.shouldDrawTurtle1 && !this.shouldDrawTurtle2 && !this.shouldDrawTurtle3);
  }

  drawGameOver() {
    this.ctx.fillStyle= "white";
    this.ctx.font = "18px Sans-Serif";
    this.ctx.fillText("Play again? Press ENTER!", 50, 200);
    this.ctx.fillText("GAME OVER", 105, 125);

    let play = (e) => {
      if (e.keyCode === 13) {
        this.reset();
        this.score = 0;
        this.level = 1;
        this.turtles.turtleSpeedSlow = 5;
        this.turtles.turtleSpeedFast = 10;
        this.life1 = true;
        this.life2 = true;
        this.life3 = true;
        this.play();
        window.removeEventListener("keydown", play);
      }
    };

    window.addEventListener("keydown", play);
  }

  reset() {
    this.shouldDrawTurtle1 = true;
    this.shouldDrawTurtle2 = true;
    this.shouldDrawTurtle3 = true;

    this.mario.marioX = 155;
    this.mario.marioY = 262;
    this.turtles.turtle1X = 265;
    this.turtles.turtle1Y = 141;
    this.turtles.turtle2X = 0;
    this.turtles.turtle2Y = 55;
    this.turtles.turtle3X = 250;
    this.turtles.turtle3Y = 55;
  }

  drawWinner() {
    this.ctx.fillStyle= "white";
    this.ctx.font = "18px Sans-Serif";
    this.level += 1;
    this.ctx.fillText(`Level ${this.level.toString()}`, 130, 120);

    this.reset();

    this.turtles.turtleSpeedSlow += 3;
    this.turtles.turtleSpeedFast += 3;
  }

  killTurtle() {
    if (this.mario.marioY === this.turtles.turtle1Y + 37 && PlusOrMinus(this.mario.marioX, 10, this.turtles.turtle1X).includes(this.turtles.turtle1X)) {
      this.shouldDrawTurtle1 = false;
      this.score += 1000;
    }

    if (this.mario.marioY === this.turtles.turtle2Y + 37 && PlusOrMinus(this.mario.marioX, 10, this.turtles.turtle2X).includes(this.turtles.turtle2X)) {
      this.shouldDrawTurtle2 = false;
      this.score += 1000;
    }

    if (this.mario.marioY === this.turtles.turtle3Y + 37 && PlusOrMinus(this.mario.marioX, 10, this.turtles.turtle3X).includes(this.turtles.turtle3X)) {
      this.shouldDrawTurtle3 = false;
      this.score += 1000;
    }
  }

  playTurn() {
    this.turtles.moveTurtles();
    this.killTurtle();
    this.subtractAlife();
    this.draw();

    if (this.gameOver()) {
      clearInterval(this.timer);
      this.drawGameOver();
    }

    if (this.gameWon()) {
      clearInterval(this.timer);
      this.drawWinner();
      setTimeout(this.play.bind(this), 2000);
    }
  }

  play() {
    this.timer = setInterval(() => { this.playTurn(); }, 100);
  }
}

module.exports = Game;
