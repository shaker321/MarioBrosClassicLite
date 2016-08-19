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
    this.ctx.drawImage(rightPipeTop, 271, 50);
  }

  drawRightPipeBottom() {
    let rightPipeBottom = new Image();
    rightPipeBottom.src = 'images/right_pipe.png';
    this.ctx.drawImage(rightPipeBottom, 271, 267);
  }

  drawLeftPipeTop() {
    let leftPipeTop = new Image();
    leftPipeTop.src = 'images/left_pipe.png';
    this.ctx.drawImage(leftPipeTop, 0, 50);
  }

  drawLeftPipeBottom() {
    let leftPipeBottom = new Image();
    leftPipeBottom.src = 'images/left_pipe.png';
    this.ctx.drawImage(leftPipeBottom, 0, 267);
  }
}

module.exports = DrawItems;
