const Game = require("./game.js");
const Mario = require("./mario.js");

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const music = document.getElementById("music");

  document.addEventListener("keypress", (e) => {
    if (e.keyCode === 109) {
      music.muted = !music.muted;
    }
  });

  const game = new Game(ctx);
  game.titleScreen();
});
