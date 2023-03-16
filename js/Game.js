class Game{
  constructor() {

    this.resetButton = createButton("Reset")
    this.resetButton.position(width-200,100)
    this.leadeboardTitle = createElement("h2");
    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
    this.blastUpdate = false

  }



  start() {
    player = new Player();
  playerCount = player.getCount();

  form = new Form();
  form.display();

  dog1 = createSprite(width / 2 - 50, height - 100);
  dog1.addImage("dog1", dog1_img);
  dog1.scale = 0.2;

  dog1.addImage("blast", blastImage);

  dog2 = createSprite(width / 2 + 100, height - 100);
  dog2.addImage("dog2", dog2_img);
  dog2.scale = 0.2;

  dog2.addImage("blast", blastImage);

  dogs = [dog1, dog2];
 
      speedBoneGroup = new Group()      
      protectionBoneGroup = new Group()
      obstaclesGroup = new Group()
      var obstaclesPositions = [
              { x: width / 2 + 150, y: height - 800, image: obstacle2Image },
              { x: width / 2 - 150, y: height - 1300, image: obstacle1Image },
              { x: width / 2 + 250, y: height - 1800, image: obstacle1Image },
              { x: width / 2 - 180, y: height - 2300, image: obstacle2Image },
              { x: width / 2, y: height - 2800, image: obstacle2Image },
              { x: width / 2 - 180, y: height - 3300, image: obstacle1Image },
              { x: width / 2 + 180, y: height - 3300, image: obstacle2Image },
              { x: width / 2 + 250, y: height - 3800, image: obstacle2Image },
              { x: width / 2 - 150, y: height - 4300, image: obstacle1Image },
              { x: width / 2 + 250, y: height - 4800, image: obstacle2Image },
              { x: width / 2, y: height - 5300, image: obstacle1Image },
              { x: width / 2 - 180, y: height - 5500, image: obstacle2Image }
            ];
     this.addSprites(speedBoneGroup,4,blueBone_img,0.08)
     this.addSprites(protectionBoneGroup,4,whiteBone_img,0.2)
    this.addSprites(obstaclesGroup,obstaclesPositions.length,obstacle1Image,0.2,obstaclesPositions)

}



  handleElements() {

    form.hide()
    form.titleImg.class("gameTitleAfterEffect")
    form.titleImg.position(40,50)



        this.leadeboardTitle.html("Leaderboard");
    this.leadeboardTitle.class("resetText");
    this.leadeboardTitle.position(width / 3 - 60, 40);

    this.leader1.class("leadersText");
    this.leader1.position(width / 3 - 50, 80);

    this.leader2.class("leadersText");

    this.leader2.position(width / 3 - 50, 130);
    }


    addSprites(spriteGroup, numberOfSprites, spriteImage, scale, positions = []) {
          for (var i = 0; i < numberOfSprites; i++) {
            var x, y;
      
            //C41 //SA
            if (positions.length > 0) {
              x = positions[i].x;
              y = positions[i].y;
              spriteImage = positions[i].image;
            } else {
              x = random(width / 2 + 150, width / 2 - 150);
              y = random(-height * 4.5, height - 400);
            }
            var sprite = createSprite(x, y);
            sprite.addImage("sprite", spriteImage);
      
            sprite.scale = scale;
            spriteGroup.add(sprite);
          }

        }

    handleResetButton() {
    this.resetButton.mousePressed(()=>{
      database.ref("/").set({

        gameState: 0,
        playerCount:0,
        players: {},


      })

      window.location.reload()

    })

    }


    showLife() {
    push();
    image(lifeImage, width / 2 - 130, height - player.positionY - 350, 20, 20);
    fill("white");
    rect(width / 2 - 100, height - player.positionY - 350, 185, 20);
    fill("#f50057");
    rect(width / 2 - 100, height - player.positionY - 350, player.life, 20);
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
      if (!this.blastUpdate) {
        if (keyIsDown(UP_ARROW)) {
          this.playerMoving = true;
          player.positionY += 5;
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
      }}

      handleSpeed(index) {
        dogs[index - 1].overlap(speedBoneGroup, function(collector, collected) {
          player.positionY += 13;
        
        
          player.update();
        
          //collected is the sprite in the group collectibles that triggered
          //the event
          collected.remove();
        });
      }

    
      handleProtection(index) {
            dogs[index - 1].overlap(protectionBoneGroup, function(collector, collected) {
              player.score += 15;
              player.update();
              //collected is the sprite in the group collectibles that triggered
              //the event
              collected.remove();
            });
          }



  play() {
 
 this.handleElements()

 this.handleResetButton();

 this.handlePlayerControls()

 
 
 Player.getPlayersInfo();
 if(allPlayers != undefined){
  image(track, 0, -height * 5, width, height * 6)
  this.showLeaderboard()
  this.showLife()
 var index = 0;
       for (var plr in allPlayers) {
      
         //add 1 to the index for every loop
         index = index + 1;
 
         //use data form the database to display the cars in x and y direction
         var x = allPlayers[plr].positionX;
         var y = height - allPlayers[plr].positionY;
 
         var currentlife = allPlayers[plr].life;
 
            if (currentlife <=0) {
                
              dogs[index-1].changeImage("blast")
              dogs[index - 1].scale = 0.3
              this.blastUpdate = true
              gameState = 2
              this.update(2)
              this.end()
            }
        

         dogs[index - 1].position.x = x;
         dogs[index - 1].position.y = y;
 
         if (index === player.index) {
           stroke(10);
           fill("red");
           ellipse(x, y, 60, 60);
 
           this.handleSpeed(index);
           this.handleProtection(index);
           this.handleDogACollisionWithDogB(index);
           this.handleObstacleCollision(index);

          
 
          //  if (player.life <= 0) {
          //    this.blast = true;
          //    this.playerMoving = false;
          //  }
 
           // Changing camera position in y direction
            camera.position.y = dogs[index - 1].position.y;
            //camera.position.x = dogs[index - 1].position.x;
         }
       }


      // if (this.playerMoving) {
      //   player.positionY += 5;
      //   player.update();
      // }

      // handling keyboard events
      this.handlePlayerControls();

      // Finshing Line
      const finishLine = height * 6 - 100;

      if (player.positionY > finishLine) {
        gameState = 2
        player.rank +=1
        Player.updateDogsAtEnd(player.rank)
        player.update()
        this.showRank()
        
      }


  drawSprites()
 }




  }

  end() {
console.log("end")
  }

  getState() {

    var gameStateRef = database.ref("gameState")
    gameStateRef.on("value", function (data) {
      gameState = data.val()
    })
  }
  
  update(state) {
    database.ref("/").update({
      gameState: state
    })

  }

  
  handleObstacleCollision(index) {
        if (dogs[index - 1].collide(obstaclesGroup)) {
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
        
  showRank() {
    swal({
      title: `Good Job!${"\n"}Rank${"\n"}${player.rank}`,
      text: " You reached the finish line succesfully",
      imageURL:
      "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
      imageSize: "100x100",
      confirmButtonText: "Ok"
        })

  }


  gameOver() {
    swal(
      {
      title: `Sorry, you lost!`,
      text: " You did not reach the finish line succesfully",
      imageURL:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Ok"
        }, function(isConfirm){
          if (isConfirm){
        location.reload()
          }
        }
        )
        
  }
  
        handleDogACollisionWithDogB(index) {
    if (index === 1) {
      if (dogs[index - 1].collide(dogs[1])) {
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
    if (index === 2) {
      if (dogs[index - 1].collide(dogs[0])) {
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
  }
  


//   // getState() {
//   //   var gameStateRef = database.ref("gameState");
//   //   gameStateRef.on("value", function(data) {
//   //     gameState = data.val();
//   //   });
//   // }

// class Game {
//   constructor() {
//     this.resetTitle = createElement("h2");
//     this.resetButton = createButton("");




//     this.leadeboardTitle = createElement("h2");

//     this.leader1 = createElement("h2");
//     this.leader2 = createElement("h2");
//     this.playerMoving = false;
//     this.leftKeyActive = false;
//     this.blast = false;
//   }



//   handleElements() {
//     form.hide();
//     form.titleImg.position(40, 50);
//     form.titleImg.class("gameTitleAfterEffect");

//     //C39
//     this.resetTitle.html("Reset Game");
//     this.resetTitle.class("resetText");
//     this.resetTitle.position(width / 2 + 200, 40);

//     this.resetButton.class("resetButton");
//     this.resetButton.position(width / 2 + 230, 100);

//     this.leadeboardTitle.html("Leaderboard");
//     this.leadeboardTitle.class("resetText");
//     this.leadeboardTitle.position(width / 3 - 60, 40);

//     this.leader1.class("leadersText");
//     this.leader1.position(width / 3 - 50, 80);

//     this.leader2.class("leadersText");
//     this.leader2.position(width / 3 - 50, 130);
//   }

//   play() {
//     this.handleElements();
//     this.handleResetButton();

//     Player.getPlayersInfo();
//     player.getCarsAtEnd();

//     if (allPlayers !== undefined) {
//       image(track, 0, -height * 5, width, height * 6);

//       this.showFuelBar();
//       this.showLife();
//       this.showLeaderboard();

//       //index of the array
//       var index = 0;
//       for (var plr in allPlayers) {
//         //add 1 to the index for every loop
//         index = index + 1;

//         //use data form the database to display the cars in x and y direction
//         var x = allPlayers[plr].positionX;
//         var y = height - allPlayers[plr].positionY;

//         var currentlife = allPlayers[plr].life;

//         if (currentlife <= 0) {
//           cars[index - 1].changeImage("blast");
//           cars[index - 1].scale = 0.3;
//         }

//         cars[index - 1].position.x = x;
//         cars[index - 1].position.y = y;

//         if (index === player.index) {
//           stroke(10);
//           fill("red");
//           ellipse(x, y, 60, 60);

//           this.handleFuel(index);
//           this.handlePowerCoins(index);
//           this.handleCarACollisionWithCarB(index);
//           this.handleObstacleCollision(index);

//           if (player.life <= 0) {
//             this.blast = true;
//             this.playerMoving = false;
//           }

//           // Changing camera position in y direction
//           camera.position.y = cars[index - 1].position.y;
//         }
//       }

//       if (this.playerMoving) {
//         player.positionY += 5;
//         player.update();
//       }

//       // handling keyboard events
//       this.handlePlayerControls();

//       // Finshing Line
//       const finshLine = height * 6 - 100;

//       if (player.positionY > finshLine) {
//         gameState = 2;
//         player.rank += 1;
//         Player.updateCarsAtEnd(player.rank);
//         player.update();
//         this.showRank();
//       }

//       drawSprites();
//     }
//   }

//   handleResetButton() {
//     this.resetButton.mousePressed(() => {
//       database.ref("/").set({
//         playerCount: 0,
//         gameState: 0,
//         players: {},
//         carsAtEnd: 0
//       });
//       window.location.reload();
//     });
//   }

//   showLife() {
//     push();
//     image(lifeImage, width / 2 - 130, height - player.positionY - 400, 20, 20);
//     fill("white");
//     rect(width / 2 - 100, height - player.positionY - 400, 185, 20);
//     fill("#f50057");
//     rect(width / 2 - 100, height - player.positionY - 400, player.life, 20);
//     noStroke();
//     pop();
//   }

//   showFuelBar() {
//     push();
//     image(fuelImage, width / 2 - 130, height - player.positionY - 350, 20, 20);
//     fill("white");
//     rect(width / 2 - 100, height - player.positionY - 350, 185, 20);
//     fill("#ffc400");
//     rect(width / 2 - 100, height - player.positionY - 350, player.fuel, 20);
//     noStroke();
//     pop();
//   }

//   showLeaderboard() {
//     var leader1, leader2;
//     var players = Object.values(allPlayers);
//     if (
//       (players[0].rank === 0 && players[1].rank === 0) ||
//       players[0].rank === 1
//     ) {
//       // &emsp;    This tag is used for displaying four spaces.
//       leader1 =
//         players[0].rank +
//         "&emsp;" +
//         players[0].name +
//         "&emsp;" +
//         players[0].score;

//       leader2 =
//         players[1].rank +
//         "&emsp;" +
//         players[1].name +
//         "&emsp;" +
//         players[1].score;
//     }

//     if (players[1].rank === 1) {
//       leader1 =
//         players[1].rank +
//         "&emsp;" +
//         players[1].name +
//         "&emsp;" +
//         players[1].score;

//       leader2 =
//         players[0].rank +
//         "&emsp;" +
//         players[0].name +
//         "&emsp;" +
//         players[0].score;
//     }

//     this.leader1.html(leader1);
//     this.leader2.html(leader2);
//   }

  // handlePlayerControls() {
  //   if (!this.blast) {
  //     if (keyIsDown(UP_ARROW)) {
  //       this.playerMoving = true;
  //       player.positionY += 10;
  //       player.update();
  //     }

  //     if (keyIsDown(LEFT_ARROW) && player.positionX > width / 3 - 50) {
  //       this.leftKeyActive = true;
  //       player.positionX -= 5;
  //       player.update();
  //     }

  //     if (keyIsDown(RIGHT_ARROW) && player.positionX < width / 2 + 300) {
  //       this.leftKeyActive = false;
  //       player.positionX += 5;
  //       player.update();
  //     }
  //   }
  // }

//   handleFuel(index) {
//     // Adding fuel
//     cars[index - 1].overlap(fuels, function(collector, collected) {
//       player.fuel = 185;
//       //collected is the sprite in the group collectibles that triggered
//       //the event
//       collected.remove();
//     });

//     // Reducing Player car fuel
//     if (player.fuel > 0 && this.playerMoving) {
//       player.fuel -= 0.3;
//     }

//     if (player.fuel <= 0) {
//       gameState = 2;
//       this.gameOver();
//     }
//   }

//   handlePowerCoins(index) {
//     cars[index - 1].overlap(powerCoins, function(collector, collected) {
//       player.score += 21;
//       player.update();
//       //collected is the sprite in the group collectibles that triggered
//       //the event
//       collected.remove();
//     });
//   }

//   handleObstacleCollision(index) {
//     if (cars[index - 1].collide(obstacles)) {
//       if (this.leftKeyActive) {
//         player.positionX += 100;
//       } else {
//         player.positionX -= 100;
//       }

//       //Reducing Player Life
//       if (player.life > 0) {
//         player.life -= 185 / 4;
//       }

//       player.update();
//     }
//   }

//   handleCarACollisionWithCarB(index) {
//     if (index === 1) {
//       if (cars[index - 1].collide(cars[1])) {
//         if (this.leftKeyActive) {
//           player.positionX += 100;
//         } else {
//           player.positionX -= 100;
//         }

//         //Reducing Player Life
//         if (player.life > 0) {
//           player.life -= 185 / 4;
//         }

//         player.update();
//       }
//     }
//     if (index === 2) {
//       if (cars[index - 1].collide(cars[0])) {
//         if (this.leftKeyActive) {
//           player.positionX += 100;
//         } else {
//           player.positionX -= 100;
//         }

//         //Reducing Player Life
//         if (player.life > 0) {
//           player.life -= 185 / 4;
//         }

//         player.update();
//       }
//     }
//   }

//   showRank() {
//     swal({
//       title: `Awesome!${"\n"}Rank${"\n"}${player.rank}`,
//       text: "You reached the finish line successfully",
//       imageUrl:
//         "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
//       imageSize: "100x100",
//       confirmButtonText: "Ok"
//     });
//   }

//   gameOver() {
//     swal({
//       title: `Game Over`,
//       text: "Oops you lost the race....!!!",
//       imageUrl:
//         "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
//       imageSize: "100x100",
//       confirmButtonText: "Thanks For Playing"
//     });
//   }

//   end() {
//     console.log("Game Over");
//   
}
