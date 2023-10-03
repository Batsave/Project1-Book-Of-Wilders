const display = document.querySelector(".option");
const button = document.querySelector(".lightdarkmode");
let i = 0;
let j = 0;
button.addEventListener("change", function() {
  i++;
  
  if (i===6) { console.log("101 109 232 104 116 032 101 100 032 116 110 101 109 101 103 110 097 104 099 032 101 100 032 110 111 116 117 111 098 032 101 108 032 114 117 115 032 115 105 111 102 032 048 050 032 122 101 121 117 112 112 065 032 124 032 103 103 069 032 114 101 116 115 097 069")
}
  if (i >6) {
    j++;
    console.log(j);
  }
  if (j === 20) {
    display.style.display = "flex";
  }
});


window.onload = function(){
    const div = document.querySelector('.optionUser');
    const canvasWidth = 900;
    const canvasHeight = 600;
    const blockSize = 30; // en pixels
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext('2d');
    const widthInBlocks = canvasWidth/blockSize; 
    const heightInBlocks = canvasHeight/blockSize;
    const centreX = canvasWidth / 2;
    const centreY = canvasHeight / 2;
    let delay; // en millisecondes
    let snakee;
    let applee;
    let score;
    let timeout;
  
    init();
  
    function init(){
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      canvas.style.border = "0px solid var(--color-purple)";
      canvas.style.margin = "50px auto";
      canvas.style.display = "block";
      canvas.style.backgroundColor = "var(--color-purple)";
      div.appendChild(canvas);
      launch();
    }
  
    function launch(){
      snakee = new Snake([[6,4],[5,4],[4,4],[3,4],[2,4]], "right");
      applee = new Apple([10, 10]);
      score = 0;
      clearTimeout(timeout);
      delay = 100;
      refreshCanvas();
    }
  
    function refreshCanvas(){
      snakee.advance();
      if(snakee.checkCollision()){
        gameOver();
      } else {
        if(snakee.isEatingApple(applee)) {
          score++;
          snakee.ateApple = true;
          do {
            applee.setNewPosition();
          } while(applee.isOnSnake(snakee))
            if(score % 5 == 0){
              speedUp();
            }
        }
        ctx.clearRect(0,0,canvasWidth, canvasHeight);
        drawScore();
        snakee.draw();
        applee.draw();
        timeout = setTimeout(refreshCanvas, delay);
      }
    }
  
    function gameOver(){
      ctx.save();
      ctx.font = "bold 70px sans-serif";
      ctx.fillStyle = "sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.strokeStyle = "#eaeaea";
      ctx.lineWidth = "5";
      ctx.strokeText("Game Over", centreX, centreY - 180);
      ctx.fillText("Game Over", centreX, centreY - 180);
      ctx.font = "bold 30px sans-serif";
      ctx.strokeText("Appuyer sur la touche espace pour rejouer", centreX, centreY - 120);
      ctx.fillText("Appuyer sur la touche espace pour rejouer", centreX, centreY - 120);
      ctx.restore();
    }
  
    function drawScore(){
      ctx.save();
      ctx.font = "bold 200px sans-serif";
      ctx.fillStyle = "#a9a9a9";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(score.toString(), centreX, centreY);
      ctx.restore();
    }
  
    function speedUp(){
      delay /= 1.1;
    }
  
    //Fonction de dessin d'un block du serpent
    function drawBlock(ctx, position){
      const x = position[0] * blockSize;
      const y = position[1] * blockSize;
      ctx.fillRect(x, y, blockSize, blockSize);
    }
  
    //Fonction constructrice du serpent
    function Snake(body, direction){
      this.body = body;
      this.direction = direction;
      this.ateApple = false;
      this.draw = function(){
        ctx.save();
        ctx.fillStyle = "#eaeaea";
        for(let i = 0; i < this.body.length;i++){
          drawBlock(ctx, this.body[i]);
        }
        ctx.restore();
      };
      this.advance = function(){
        const nextPosition = this.body[0].slice();
        switch(this.direction){
          case "left":
            nextPosition[0] -= 1;
            break;
          case "right":
            nextPosition[0] += 1;
            break;
          case "down":
            nextPosition[1] += 1;
            break;
          case "up":
            nextPosition[1] -= 1;
            break;
          default:
            throw("Invalid direction");
        }
        this.body.unshift(nextPosition);
        if(!this.ateApple)
          this.body.pop();
        else
          this.ateApple = false;
      };
      
      this.setDirection = function(newDirection){
        let allowedDirections;
        switch(this.direction){
          case "left":
          case "right":
            allowedDirections = ["up", "down"];
            break;
          case "down":
          case "up":
            allowedDirections = ["left", "right"];
            break;
          default:
            throw("Invalid direction");
        }
        if(allowedDirections.indexOf(newDirection) > -1){
          this.direction = newDirection;
        }
      };
      this.checkCollision = function(){
        let wallCollision = false;
        let snakeCollision = false;
        const head = this.body[0];
        const rest = this.body.slice(1);
        const snakeX = head[0];
        const snakeY = head[1];
        const minX = 0;
        const minY = 0;
        const maxX = widthInBlocks-1;
        const maxY = heightInBlocks-1;
        const isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
        const isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;
        if(isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls){
          wallCollision = true;
        }
        for(let i = 0;i < rest.length;i++){
          if(snakeX == rest[i][0] && snakeY == rest[i][1]){
            snakeCollision = true;
          }
        }
        return wallCollision || snakeCollision;
      };
      this.isEatingApple = function(appleToEat){
        const head = this.body[0];
        if(head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1])
          return true;
        else
          return false;
      };
    }
  
    //Fonction constructrice de la pomme
    function Apple(position){
      this.position = position;
      this.draw = function(){
        const radius = blockSize / 2;
        const x = this.position[0] * blockSize + radius;
        const y = this.position[1] * blockSize + radius;
        ctx.save();
        ctx.fillStyle = "#33cc33";
        ctx.beginPath();
        ctx.arc(x,y, radius, 0, Math.PI*2, true);
        ctx.fill();
        ctx.restore();
      };
      this.setNewPosition = function(){
        const newX = Math.round(Math.random() * (widthInBlocks - 1));
        const newY = Math.round(Math.random() * (heightInBlocks - 1));
        this.position = [newX,newY];
      };
      this.isOnSnake = function(snakeToCheck){
        let isOnSnake = false;
        for(let i = 0;i < snakeToCheck.body.length;i++){
          if(this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1]){
            isOnSnake = true;
          }
        }
        return isOnSnake;
      };
    }
  
  
    //Gestion des touches du clavier
    /*
    document.onkeydown = function handleKeyDown(e){
      const key = e.keyCode;
      let newDirection;
      switch(key){
        case 37:
          newDirection = "left";
          break;
        case 38:
          newDirection = "up";
          break;
        case 39:
          newDirection = "right";
          break;
        case 40:
          newDirection = "down";
          break;
        case 32:
          restart();
          return;
        default:
          return;
      }
      snakee.setDirection(newDirection);
    }
    */
const upButton = document.getElementById("up");
const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");
const downButton = document.getElementById("down");
const spaceButton = document.getElementById("space");

upButton.addEventListener("touchstart", function(event) {
  event.preventDefault();
  let newDirection = "up";
  snakee.setDirection(newDirection);
});

leftButton.addEventListener("touchstart", function(event) {
  event.preventDefault();
  let newDirection = "left";
  snakee.setDirection(newDirection);
});

rightButton.addEventListener("touchstart", function(event) {
  event.preventDefault();
  let newDirection = "right";
  snakee.setDirection(newDirection);
});

downButton.addEventListener("touchstart", function(event) {
  event.preventDefault();
  let newDirection = "down";
  snakee.setDirection(newDirection);
});

spaceButton.addEventListener("touchstart", function(event) {
  event.preventDefault();
  launch();
});

  
    const map = {}; // You could also use an array
    onkeydown = onkeyup = function(e){
      e = e || event; // to deal with IE
      map[e.keyCode] = e.type == 'keydown';
      let newDirection;
      if(map[37]){
        newDirection = "left";
      } else if(map[38]){
        newDirection = "up";
      } else if(map[39]){
        newDirection = "right";
      } else if(map[40]){
        newDirection = "down";
      } else if(map[32]){
        launch();
      }
      snakee.setDirection(newDirection);
    }
  
    window.addEventListener('keydown', onkeyup);
  window.addEventListener('keyup', onkeydown);
  }

