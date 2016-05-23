"use strict";

var Gauntlet = (function(gauntlet) {
  let canvas = $("#field")[0];
  let ctx = canvas.getContext("2d");

  //NOTE(adam): caching to prevent NaN issues
  let canvasSize = {w: canvas.width, h: canvas.height};

  let orcImg = $("#orc-img")[0];


  let playerCoord = {x: 10, y: 10};
  let enemyCoord = {x: canvas.width - 10, y: 10};
  let size = {w: 100, h: 100};

  let playerAttacking = false;
  let enemyAttacking = false;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle ="tan";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(orcImg, playerCoord.x, playerCoord.y, size.w, size.h);

    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(orcImg, -enemyCoord.x, enemyCoord.y, size.w, size.h);
    ctx.restore();

    if(playerAttacking) {
      playerCoord.x += 5;

      if(playerCoord.x >= 750) {
        playerCoord.x = 10;
        playerAttacking = false;
        enemyAttacking = true;
      }
    }

    if(enemyAttacking) {
      enemyCoord.x -= 5;

      if(enemyCoord.x <= 150) {
        enemyCoord.x = canvasSize.w - 10;
        enemyAttacking = false;
        playerAttacking = true;
      }
    }
  }

  setInterval(draw, 10);
  playerAttacking = true;

  return gauntlet;
}(Gauntlet || {}));