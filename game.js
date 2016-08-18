const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// black background
function drawBackground() {
  ctx.beginPath();
  ctx.rect(0, 0, 320, 320);
  ctx.fillStyle = "#000000";
  ctx.fill();
  ctx.closePath();
}

// brick floor
function drawBrickFloor() {
  let brickFloor = new Image();
  brickFloor.src = 'images/brick.png';
  ctx.drawImage(brickFloor, 0, 295);
}

// platforms
function drawPlatform1() {
  let platform1 = new Image();
  platform1.src = 'images/platform.png';
  ctx.drawImage(platform1, -70, 230);
}

function drawPlatform2() {
  let platform2 = new Image();
  platform2.src = 'images/platform.png';
  ctx.drawImage(platform2, 200, 230);
}

function drawPlatform3() {
  let platform3 = new Image();
  platform3.src = 'images/platform.png';
  ctx.drawImage(platform3, -145, 165);
}

function drawPlatform4() {
  let platform4 = new Image();
  platform4.src = 'images/platform.png';
  ctx.drawImage(platform4, 270, 165);
}

function drawPlatform5() {
  let platform5 = new Image();
  platform5.src = 'images/platform2.png';
  ctx.drawImage(platform5, 100, 145);
}

function drawPlatform6() {
  let platform6 = new Image();
  platform6.src = 'images/platform.png';
  ctx.drawImage(platform6, -60, 80);
}

function drawPlatform7() {
  let platform7 = new Image();
  platform7.src = 'images/platform.png';
  ctx.drawImage(platform7, 187, 80);
}

// pipes

function drawRightPipeTop() {
  let rightPipeTop = new Image();
  rightPipeTop.src = 'images/right_pipe.png';
  ctx.drawImage(rightPipeTop, 271, 50);
}

function drawRightPipeBottom() {
  let rightPipeBottom = new Image();
  rightPipeBottom.src = 'images/right_pipe.png';
  ctx.drawImage(rightPipeBottom, 271, 267);
}

function drawLeftPipeTop() {
  let leftPipeTop = new Image();
  leftPipeTop.src = 'images/left_pipe.png';
  ctx.drawImage(leftPipeTop, 0, 50);
}

function drawLeftPipeBottom() {
  let leftPipeBottom = new Image();
  leftPipeBottom.src = 'images/left_pipe.png';
  ctx.drawImage(leftPipeBottom, 0, 267);
}


// draw Mario
let marioX = 155;
let marioY = 262;
let platformCoords = {
  // brickFloorCoords: {
  //   xMin: 0,
  //   xMax: 320,
  //   yMax: 295,
  //   yMin: 263
  // },
  platform1Coords: {
    xMin: -20,
    xMax: 133, // +
    yMax: 230,
    yMin: 208
  },
  platform2Coords: {
    xMin: 190, // -
    xMax: 340,
    yMax: 230,
    yMin: 208
  },
  platform3Coords: {
    xMin: -20,
    xMax: 58, // +
    yMax: 165,
    yMin: 243
  },
  platform4Coords: {
    xMin: 260, // -
    xMax: 340,
    yMax: 165,
    yMin: 243
  },
  platform5Coords: {
    xMin: 90, // -
    xMax: 230, // +
    yMax: 145,
    yMin: 123
  },
  platform6Coords: {
    xMin: -20,
    xMax: 143, // +
    yMax: 80,
    yMin: 58
  },
  platform7Coords: {
    xMin: 177, // -
    xMax: 340,
    yMax: 80,
    yMin: 58
  }
};

function drawMario() {
  let mario = new Image();
  mario.src = 'images/mario.png';

  if (marioX > 300) {
    marioX = 0;
  } else if (marioX < 0) {
    marioX = 300;
  }

  ctx.drawImage(mario, marioX, marioY);
}

// move Mario
let rightPressed = false;
let leftPressed = false;
let upPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.keyCode === 39 || e.keycode === 68) {
    rightPressed = true;
  } else if (e.keyCode === 37 || e.keyCode === 65) {
    leftPressed = true;
  }

  if (e.keyCode === 38 || e.keycode === 87) {
    upPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode === 39) {
    rightPressed = false;
  } else if (e.keyCode === 37) {
    leftPressed = false;
  }

  if (e.keyCode === 38) {
    upPressed = false;
  }
}

function stopJump(initJump) {
  let jumpHeight = initJump;

  Object.keys(platformCoords).map((platform) => {
    if ((marioY - platformCoords[platform].yMax <= jumpHeight &&
        marioY > platformCoords[platform].yMax &&
        marioY - jumpHeight <= platformCoords[platform].yMax &&
        marioX + 20 <= platformCoords[platform].xMax &&
        marioX >= platformCoords[platform].xMin) || marioY - jumpHeight <= 0) {


      jumpHeight = marioY - 12 - platformCoords[platform].yMax;
    }
  });

  return jumpHeight;
}

function fallDown() {
  let platformsMarioIsAbove = [];

  Object.keys(platformCoords).map((platform) => {
    if (marioY < platformCoords[platform].yMax &&
        marioX + 20 <= platformCoords[platform].xMax &&
        marioX >= platformCoords[platform].xMin) {
          platformsMarioIsAbove.push(platform);
    }
  });

  let nearestPlatform;
  let nearestPlatformY = 320;

  platformsMarioIsAbove.map((platform) => {
    if (nearestPlatformY > platformCoords[platform].yMax) {
      nearestPlatformY = platformCoords[platform].yMax;
      nearestPlatform = platform;
    }
  });

  if (nearestPlatformY > 262) {
    marioY = 262;
  } else {
    marioY = nearestPlatformY - 34;
  }

  return marioY;
}

// turtles
let turtle1X = 0;
let turtle1Y = 55;
function drawTurtle1() {
  let turtle1 = new Image();
  turtle1.src = 'images/turtle.png';

  if (turtle1X > 300) {
    turtle1X = 0;
  } else if (turtle1X < 0) {
    turtle1X = 300;
  }

  ctx.drawImage(turtle1, turtle1X, turtle1Y);
}

let turtle2X = 265;
let turtle2Y = 141;
function drawTurtle2() {
  let turtle2 = new Image();
  turtle2.src = 'images/red_turtle.png';

  if (turtle2X > 300) {
    turtle2X = 0;
  } else if (turtle2X < 0) {
    turtle2X = 300;
  }

  ctx.drawImage(turtle2, turtle2X, turtle2Y);
}

let turtle3X = 250;
let turtle3Y = 55;
function drawTurtle3() {
  let turtle3 = new Image();
  turtle3.src = 'images/backwards_turtle.png';

  if (turtle3X > 300) {
    turtle3X = 0;
  } else if (turtle3X < 0) {
    turtle3X = 300;
  }

  ctx.drawImage(turtle3, turtle3X, turtle3Y);
}

// move turtle's Y
function fallDownTurtle1() {
  let platformsTurtle1IsAbove = [];

  Object.keys(platformCoords).map((platform) => {
    if (turtle1Y < platformCoords[platform].yMax &&
        turtle1X + 20 <= platformCoords[platform].xMax &&
        turtle1X >= platformCoords[platform].xMin) {
          platformsTurtle1IsAbove.push(platform);
    }
  });

  let nearestPlatform;
  let nearestPlatformY = 320;

  platformsTurtle1IsAbove.map((platform) => {
    if (nearestPlatformY > platformCoords[platform].yMax) {
      nearestPlatformY = platformCoords[platform].yMax;
      nearestPlatform = platform;
    }
  });

  if (nearestPlatformY > 262) {
    turtle1Y = 272;
  } else {
    turtle1Y = nearestPlatformY - 25;
  }

  return turtle1Y;
}

function fallDownTurtle2() {
  let platformsTurtle2IsAbove = [];

  Object.keys(platformCoords).map((platform) => {
    if (turtle2Y < platformCoords[platform].yMax &&
        turtle2X + 20 <= platformCoords[platform].xMax &&
        turtle2X >= platformCoords[platform].xMin) {
          platformsTurtle2IsAbove.push(platform);
    }
  });

  let nearestPlatform;
  let nearestPlatformY = 320;

  platformsTurtle2IsAbove.map((platform) => {
    if (nearestPlatformY > platformCoords[platform].yMax) {
      nearestPlatformY = platformCoords[platform].yMax;
      nearestPlatform = platform;
    }
  });

  if (nearestPlatformY > 262) {
    turtle2Y = 272;
  } else {
    turtle2Y = nearestPlatformY - 25;
  }

  return turtle2Y;
}

function fallDownTurtle3() {
  let platformsTurtle3IsAbove = [];

  Object.keys(platformCoords).map((platform) => {
    if (turtle3Y < platformCoords[platform].yMax &&
        turtle3X + 20 <= platformCoords[platform].xMax &&
        turtle3X >= platformCoords[platform].xMin) {
          platformsTurtle3IsAbove.push(platform);
    }
  });

  let nearestPlatform;
  let nearestPlatformY = 320;

  platformsTurtle3IsAbove.map((platform) => {
    if (nearestPlatformY > platformCoords[platform].yMax) {
      nearestPlatformY = platformCoords[platform].yMax;
      nearestPlatform = platform;
    }
  });

  if (nearestPlatformY > 262) {
    turtle3Y = 272;
  } else {
    turtle3Y = nearestPlatformY - 25;
  }

  return turtle3Y;
}


// killing turtles
let shouldDrawTurtle1 = true;
let shouldDrawTurtle2 = true;
let shouldDrawTurtle3 = true;

function killTurtle() {
  if (marioY === turtle1Y + 37 && plusOrMinus(marioX, 10, turtle1X).includes(turtle1X)) {
    shouldDrawTurtle1 = false;
  }

  if (marioY === turtle2Y + 37 && plusOrMinus(marioX, 10, turtle2X).includes(turtle2X)) {
    shouldDrawTurtle2 = false;
  }

  if (marioY === turtle3Y + 37 && plusOrMinus(marioX, 10, turtle3X).includes(turtle3X)) {
    shouldDrawTurtle3 = false;
  }
}

function draw() {
  ctx.clearRect(0, 0, 320, 320);
  drawBackground();
  drawBrickFloor();
  drawPlatform1();
  drawPlatform2();
  drawPlatform3();
  drawPlatform4();
  drawPlatform5();
  drawPlatform6();
  drawPlatform7();
  drawMario();

  if (shouldDrawTurtle1) {
    drawTurtle1();
  }

  if (shouldDrawTurtle2) {
    drawTurtle2();
  }

  if (shouldDrawTurtle3) {
    drawTurtle3();
  }

  drawRightPipeTop();
  drawRightPipeBottom();
  drawLeftPipeTop();
  drawLeftPipeBottom();

  killTurtle();

  if (rightPressed) {
    marioX += 15;
  } else if (leftPressed) {
    marioX -= 15;
  }

  if (upPressed) {
    marioY -= stopJump(70);
    upPressed = false;
  } else {
    marioY = fallDown();
  }

}

let refreshPage = setInterval(() => {
  turtle1X += 5;
  turtle1Y = fallDownTurtle1();

  if (turtle1X > 300 && turtle1Y > 230) {
    turtle1Y = 55;
  }

  turtle2X += 10;
  turtle2Y = fallDownTurtle2();

  if (turtle2X > 300 && turtle2Y > 230) {
    turtle2Y = 55;
  }

  turtle3X -= 5;
  turtle3Y = fallDownTurtle3();

  if (turtle3X < 0 && turtle3Y > 230) {
    turtle3Y = 55;
  }

  draw();

  if ((marioX === turtle1X + 5 && marioY + 10 === turtle1Y) ||
      (marioX === turtle2X + 5 && marioY + 10 === turtle2Y) ||
      (marioX === turtle3X - 5 && marioY + 10 === turtle3Y)) {
    clearInterval(refreshPage);
    drawGameOver();
  }

  if (!shouldDrawTurtle1 &&
      !shouldDrawTurtle2 &&
      !shouldDrawTurtle3) {
    clearInterval(refreshPage);
    draw();
    drawWinner();
  }
}, 100);


// Game Over Win and Lose

function drawGameOver() {
  let gameOver = new Image();
  gameOver.src = 'images/game_over.png';
  gameOver.onload = () => { ctx.drawImage(gameOver, 100, 100); };
}

function drawWinner() {
  let winner = new Image();
  winner.src = 'images/winner.png';
  winner.onload = () => { ctx.drawImage(winner, 50, 100); };
}

// helper functions
function plusOrMinus(baseNumber, spreadNumber, questionedNumber) {
  let possibleValues = [baseNumber];

  for (let i = spreadNumber + baseNumber; i > baseNumber; i-- ) {
    possibleValues.push(i);
  }

  for (let i = baseNumber - spreadNumber; i < baseNumber; i++ ) {
    possibleValues.push(i);
  }

  return possibleValues;
}
