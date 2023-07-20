class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");

    this.leadeboardTitle = createElement("h2");

    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
    this.playerMoving = false;
    this.leftKeyActive = false;
    this.blast = false
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    plr1 = createSprite(width / 2 - 50, height - 100);
    plr1.addImage("plr1", plr1_img);
    plr1.scale = 0.1;
    plr1.addImage("blast", blastImg);

    plr2 = createSprite(width / 2 + 100, height - 100);
    plr2.addImage("plr2", plr2_img);
    plr2.scale = 0.1;
    plr2.addImage("blast", blastImg);

    players = [plr1, plr2];

    powerUps = new Group();
    equipment = new Group();

    obstacles = new Group();
    maze = new Group();

    var obstaclesPositions = [
      { x: 250, y: height - 80, image: obstacle2Image },
      { x: 170, y: height - 130, image: obstacle1Image },
      { x: 20, y: height - 180, image: obstacle1Image },
      { x: 150, y: height - 230, image: obstacle2Image },
      { x: 200, y: height - 280, image: obstacle2Image },
      { x: 180, y: height - 330, image: obstacle1Image },
      { x: 80, y: height - 330, image: obstacle2Image },
      { x: 25, y: height - 380, image: obstacle2Image },
      { x: 50, y: height - 430, image: obstacle1Image },
      { x: 90, y: height - 480, image: obstacle2Image },
      { x: 100, y: height - 530, image: obstacle1Image },
      { x: 18, y: height - 550, image: obstacle2Image }
    ];
    var mazePositions = [
      { x: 75, y: 445, width:100, height:5 },
      { x: 1222, y: 100, width:100, height:5 },
      { x: 75, y: 485, width:100, height:5 },
      { x: 1222, y: 140, width:100, height:5 },
      
      { x: 647, y: 525, width:1250, height:5 },
      { x: 24, y: 247.5, width:5, height:400 },
      { x: 24.4, y: 504, width:5, height:43 },
      { x: 1269.5, y: 333, width:5, height:383 },
      { x: 1269.5, y: 73, width:5, height:51.4 },

      { x: width/2+5, y: 49.8, width:width-35, height:5 },
     // { x: width/2, y: 20, width:width-50, height:5 },

      { x: width/2, y:80, width:180, height:5 },
      { x: width/2, y: 103, width:5, height:50 },
      { x: width/2-95, y: 103, width:5, height:100 },
      { x: width/2+300, y: 150, width:5, height:150 },
      
      
    ];
    var powerUpsPositions = [
      { x: 50, y: 50, image: powerUpsImage}, 
      { x: 100, y: 100, image: powerUpsImage}
    ]
    // Adding fuel sprite in the game
    //this.addSprites(powerUps, 10, powerUpsImage, 0.04, powerUpsPositions);

    // Adding coin sprite in the game
    this.addSprites(equipment, 4, equipmentImage, 0.09);

    //Adding obstacles sprite in the game
    this.addSprites(
      obstacles,
      obstaclesPositions.length,
      obstacle1Image,
      0.04,
      obstaclesPositions
    );
    this.addMazeSprites(
      maze,
      mazePositions.length,
      mazePositions
    );
  }
addMazeSprites(spritesGroup, numberOfSprites, positions= []){
for(var i=0; i<numberOfSprites; i++){
  var x,y,w,h
  if(positions.length>0){
    x = positions[i].x
    y = positions[i].y
    w = positions[i].width
    h = positions[i].height
  }
  var sprite = createSprite(x,y,w,h)
  sprite.shapeColor = "white"
  spritesGroup.add(sprite)
}
}
  addSprites(spriteGroup, numberOfSprites, spriteImage, scale, positions = []) {
    for (var i = 0; i < numberOfSprites; i++) {
      var x, y;

      //C41 //SA
      if (positions.length > 0) {
        x = positions[i].x;
        y = positions[i].y;
        spriteImage = positions[i].image;
      }
      var sprite = createSprite(x, y);
      sprite.addImage("sprite", spriteImage);

      sprite.scale = scale;
      spriteGroup.add(sprite);
    }
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");

    //C39
    this.resetTitle.html("Reset Game");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 200, 40);

    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 + 230, 100);

    this.leadeboardTitle.html("Leaderboard");
    this.leadeboardTitle.class("resetText");
    this.leadeboardTitle.position(width / 3 - 60, 40);

    this.leader1.class("leadersText");
    this.leader1.position(width / 3 - 50, 80);

    this.leader2.class("leadersText");
    this.leader2.position(width / 3 - 50, 130);



  }

  play() {
    this.handleElements();
    this.handleResetButton();

    Player.getPlayersInfo();
    //player.getCarsAtEnd();

    if (allPlayers !== undefined) {
      //image(backgroundImage, 0, 0, width, height);

      /*this.showFuelBar();
      this.showLife();
      this.showLeaderboard();

      //index of the array
      var index = 0;
      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //use data form the database to display the cars in x and y direction
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;
        var currentLife = allPlayers[plr].life
        if (currentLife < 1) {
          cars[index - 1].changeImage("blast")
          cars[index - 1].scale = 0.3
        }

        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;

        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);

          this.handleFuel(index);
          this.handlePowerCoins(index);
          this.handleObstacleCollision(index);

          this.handleLife(index);
          if(player.life<=0){
            this.blast = true
            this.playerMoving = false

          }
          // Changing camera position in y direction
          camera.position.y = cars[index - 1].position.y;
        }
      }

      if (this.playerMoving) {
        player.positionY += 5;
        player.update();
      }

      // handling keyboard events
      this.handlePlayerControls();

      // Finshing Line
      const finshLine = height * 6 - 100;

      if (player.positionY > finshLine) {
        gameState = 2;
        player.rank += 1;
        Player.updateCarsAtEnd(player.rank);
        player.update();
        this.showRank();
      }
*/
      drawSprites();
      fill("white")
      textSize(20)
      text(mouseX + "-" + mouseY, mouseX, mouseY)
    }
  }

  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        playerCount: 0,
        gameState: 0,
        players: {},
        carsAtEnd: 0
      });
      window.location.reload();
    });
  }

  showLife() {
    push();
    image(lifeImage, width / 2 - 130, height - player.positionY - 300, 20, 20);
    fill("white");
    rect(width / 2 - 100, height - player.positionY - 300, 185, 20);
    fill("#f50057");
    rect(width / 2 - 100, height - player.positionY - 300, player.life, 20);
    noStroke();
    pop();
  }

  showFuelBar() {
    push();
    image(fuelImage, width / 2 - 130, height - player.positionY - 250, 20, 20);
    fill("white");
    rect(width / 2 - 100, height - player.positionY - 250, 185, 20);
    fill("#ffc400");
    rect(width / 2 - 100, height - player.positionY - 250, player.fuel, 20);
    noStroke();
    pop();
  }

  showLeaderboard() {
    var leader1, leader2;
    var players = Object.values(allPlayers);
    if (
      (players[0].rank === 0 && players[1].rank === 0) ||
      players[0].rank === 1
    ) {
      // &emsp;    This tag is used for displaying four spaces.
      leader1 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;

      leader2 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;
    }

    if (players[1].rank === 1) {
      leader1 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;

      leader2 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;
    }

    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }

  handlePlayerControls() {
    if (!this.blast) {
      if (keyIsDown(UP_ARROW)) {
        this.playerMoving = true;
        player.positionY += 10;
        player.update();
      }
      if (keyIsDown(LEFT_ARROW) && player.positionX > width / 3 - 50) {
        this.leftKeyActive = true;
        player.positionX -= 5;
        player.update();
      }

      if (keyIsDown(RIGHT_ARROW) && player.positionX < width / 2 + 300) {
        this.leftKeyActive = false;
        player.positionX += 5;
        player.update();
      }
    }



  }

  handleFuel(index) {
    // Adding fuel
    cars[index - 1].overlap(fuels, function (collector, collected) {
      player.fuel = 185;
      //collected is the sprite in the group collectibles that triggered
      //the event
      collected.remove();
    });

    // Reducing Player car fuel
    if (player.fuel > 0 && this.playerMoving) {
      player.fuel -= 0.3;
    }

    if (player.fuel <= 0) {
      gameState = 2;
      this.gameOver();
    }
  }

  handlePowerCoins(index) {
    cars[index - 1].overlap(powerCoins, function (collector, collected) {
      player.score += 21;
      player.update();
      //collected is the sprite in the group collectibles that triggered
      //the event
      collected.remove();
    });
  }

  handleObstacleCollision(index) {
    if (cars[index - 1].collide(obstacles)) {
      if (this.leftKeyActive) {
        player.positionX += 100;
      } else {
        player.positionX -= 100;
      }

      //Reducing Player Life
      if (player.life > 0) {
        player.life -= 185 / 4;
      }

      player.update();
    }
  }
  handleLife(index) {
    if (index === 1) {
      if (cars[0].collide(cars[1])) {
        if (this.leftKeyActive) {
          player.positionX += 100
        }
        else {
          player.positionX -= 100
        }
        if (player.life > 0) {
          player.life -= 185 / 4
        }
        player.update()
      }
    }
    if (index === 2) {
      if (cars[1].collide(cars[0])) {
        if (this.leftKeyActive) {
          player.positionX += 100
        }
        else {
          player.positionX -= 100
        }
        if (player.life > 0) {
          player.life -= 185 / 4
        }
        player.update()
      }
    }
  }
  showRank() {
    swal({
      title: `Awesome!${"\n"}Rank${"\n"}${player.rank}`,
      text: "You reached the finish line successfully",
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
      imageSize: "100x100",
      confirmButtonText: "Ok"
    });
  }

  gameOver() {
    swal({
      title: `Game Over`,
      text: "Oops you lost the race....!!!",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    });
  }
}
