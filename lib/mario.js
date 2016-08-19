class Mario {
  constructor(drawItems, ctx) {
    this.marioX = 155;
    this.marioY = 262;
    this.rightPressed = false;
    this.leftPressed = false;
    this.upPressed = false;
    this.drawItems = drawItems;
    this.ctx = ctx;

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
    mario.src = 'images/mario.png';
    this.ctx.drawImage(mario, this.marioX, this.marioY);
  }

  keyDownHandler(e) {
    if (e.keyCode === 39) {
      this.rightPressed = true;
    } else if (e.keyCode === 37) {
      this.leftPressed = true;
    }

    if (e.keyCode === 38) {
      this.upPressed = true;
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
