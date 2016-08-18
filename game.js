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
    xMin: 0,
    xMax: 123,
    yMax: 230,
    yMin: 208
  },
  platform2Coords: {
    xMin: 200,
    xMax: 320,
    yMax: 230,
    yMin: 208
  },
  platform3Coords: {
    xMin: 0,
    xMax: 48,
    yMax: 165,
    yMin: 243
  },
  platform4Coords: {
    xMin: 270,
    xMax: 320,
    yMax: 165,
    yMin: 243
  },
  platform5Coords: {
    xMin: 100,
    xMax: 220,
    yMax: 145,
    yMin: 123
  },
  platform6Coords: {
    xMin: 0,
    xMax: 133,
    yMax: 80,
    yMin: 58
  },
  platform7Coords: {
    xMin: 187,
    xMax: 320,
    yMax: 80,
    yMin: 58
  }
};

function drawMario() {
  let mario = new Image();
  mario.src = 'images/mario.png';

  if (marioX > 320) {
    marioX = 0;
  } else if (marioX < 0) {
    marioX = 320;
  }

  mario.onload = () => { ctx.drawImage(mario, marioX, marioY); };
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
  if (e.keyCode === 39 || e.keycode === 68) {
    rightPressed = false;
  } else if (e.keyCode === 37 || e.keyCode === 65) {
    leftPressed = false;
  }

  if (e.keyCode === 38 || e.keycode === 87) {
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

  if (rightPressed) {
    marioX += 1;
  } else if (leftPressed) {
    marioX -= 1;
  }

  if (upPressed) {
    marioY -= stopJump(50);
    upPressed = false;
  } else {
    marioY = fallDown();
  }

}

setInterval(draw, 0);
