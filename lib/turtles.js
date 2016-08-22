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
    this.turtleSpeedSlow = 5;
    this.turtleSpeedFast = 10;
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
    this.turtle1X += this.turtleSpeedSlow;
    this.turtle2X += this.turtleSpeedFast;
    this.turtle3X -= this.turtleSpeedSlow;

    this.turtle1Y = this.fallDownTurtle1();
    this.turtle2Y = this.fallDownTurtle2();
    this.turtle3Y = this.fallDownTurtle3();

    if (this.turtle1X > 300 && this.turtle1Y > 230) { this.turtle1Y = 55; }
    if (this.turtle2X > 300 && this.turtle2Y > 230) { this.turtle2Y = 55; }
    if (this.turtle3X < 0 && this.turtle3Y > 230) { this.turtle3Y = 55; }
  }
}

module.exports = Turtles;
