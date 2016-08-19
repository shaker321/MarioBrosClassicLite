const Game = require("./game.js");
const Mario = require("./mario.js");

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  const game = new Game(ctx);
  game.play();
});
