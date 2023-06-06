const canvas = document.getElementById('interface')
const ctx = canvas.getContext('2d')
canvas.width = 1056 * 1.5;
canvas.height = 576 * 1.5;
    ctx.fillRect(document.getElementById('industry').src,0, 0, canvas.width, canvas.height);
    ctx.font = "40px Arial";
    ctx.fillStyle = "gold";
    ctx.textAlign = "center";
    ctx.fillText("Player1:AWD + Z", canvas.width/2, canvas.height/2 -60);
    ctx.fillText("Click to Begin", canvas.width/2, canvas.height/2);
    ctx.fillText("Player2:<^> + 'Enter'", canvas.width/2, canvas.height/2+60);

function Begin (){
  document.getElementById('gameMusic').play();
  document.getElementById('properties').style.display = 'flex';//Always put it in brackets
  const PvPtimer = new Timer(100,1);//Max time, rate it decreases
  document.getElementById('timer').innerHTML = PvPtimer.timeStart;
  guard = 1;

  //Player1 stats
  const player1 = new Avatar({
    position:{x:150,y:400}, 
    velocity:{x:0,y:0}, 
    offset:{x:0,y:0}, 
    canvas: canvas, 
    ctx: ctx, 
    floor: 100,
    scale: 3,
    frames: 4,
    imgsrc: 'Cyborg/Cyborg_idle.png',
    sprites:{
      attack3:{
        imgsrc: 'Cyborg/Cyborg_attack3.png',
        frames: 8
      },
      idle:{
        imgsrc: 'Cyborg/Cyborg_idle.png',
        frames: 4
      },
      run:{
        imgsrc: 'Cyborg/Cyborg_run.png',
        frames: 6
      },
      jump:{
        imgsrc: 'Cyborg/Cyborg_doublejump.png',
        frames: 4
      },
      death:{
        imgsrc: 'Cyborg/Cyborg_death.png',
        frames: 6
      }
    }, offset1:{x:-40, y:-50}}, "player1",
    20, 40, 60, 105);
 
  const player2 = new Avatar(
    {position:{x:canvas.width - 300,y:400}, 
    velocity:{x:0,y:0}, 
    canvas: canvas, 
    ctx: ctx, 
    floor: 100,
    scale: 3,
    imgsrc: 'Punk/Punk_idle.png',
    frames: 4,
    sprites:{
      attack3:{
        imgsrc: 'Punk/Punk_attack3.png',
        frames: 8
      },
      idle:{
        imgsrc: 'Punk/Punk_idle.png',
        frames: 4
      },
      run:{
        imgsrc: 'Punk/Punk_run.png',
        frames: 6
      },
      jump:{
        imgsrc: 'Punk/Punk_doublejump.png',
        frames: 8
      },
      death:{
        imgsrc: 'Punk/Punk_death.png',
        frames: 2
      }
    },
    offset1:{x:-50, y:-60}}, "player2",
    70, 40, 60, 100);
  
  const keySet = {
    a:{pressed: false},
    d:{pressed: false},
    arrowleft:{pressed: false},
    arrowright:{pressed: false}
  };
  let lastKey = "";
  const industry = new drawPixel({
    position:{x:0,y:0}, 
    canvas: canvas, ctx: ctx, 
    scale: 1, frames: 0, imgsrc: "Background/industry.png"});
  /*
  const screens = new drawPixel({
    position:{x:canvas.width/2,y:canvas.height - 135}, 
    canvas: canvas, ctx: ctx, 
    scale: 2, frames: 4, imgsrc: "Screen2.png"});
  const hScreen = new drawPixel({
    position:{x:canvas.width/2 + 575,y:canvas.height - 800}, 
    canvas: canvas, ctx: ctx, 
    scale: 5, frames: 4, imgsrc: "Screen1.png"});
  const hScreenR = new drawPixel({
    position:{x:canvas.width/2 - 775,y:canvas.height - 800}, 
    canvas: canvas, ctx: ctx, 
    scale: 5, frames: 4, imgsrc: "Screen1R.png"});
//an be taken out if needed
*/
function animate(){
    window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    industry.drawBackground();
    /*
    screens.drawItems();
    hScreen.drawItems();
    hScreenR.drawItems();
    */
    //Player 1's movements
    player1.update(player2);
    if(keySet.d.pressed == true && player1.lastKey == 'd' && player1.position.x < 1440){
      player1.switchSprite('run');
      player1.velocity.x = 5;}
    else if(keySet.a.pressed == true && player1.lastKey == 'a' && player1.position.x > 0){
      player1.switchSprite('run');
      player1.velocity.x = -5;}
    else{
      player1.velocity.x = 0;
      player1.switchSprite('idle');
    }
    if(player1.velocity.y < 0){
      player1.switchSprite('jump')
    }

    //Player 2's movements
    
    player2.update(player1);
    if(keySet.arrowright.pressed == true && player2.lastKey == 'arrowright' && player2.position.x < 1440){
      player2.switchSprite('run');
      player2.velocity.x = 5;}
    else if(keySet.arrowleft.pressed == true && player2.lastKey == 'arrowleft' && player2.position.x > 0){
      player2.switchSprite('run');
      player2.velocity.x = -5;}
    else{
      player2.velocity.x = 0;
      player2.switchSprite('idle');
    }
    if(player2.velocity.y < 0){
      player2.switchSprite('jump')
    }
    //Game End Conditions
    if(player1.health <= 0 || player2.health <= 0 || PvPtimer.time == 0){
      document.getElementById("gameEnd").style.display = 'flex';
      if(player1.health == 0 && player2.health == 0){ 
      document.getElementById("gameEnd").innerHTML = 'Tie';
      } else if(player1.health > player2.health){
      document.getElementById("gameEnd").innerHTML = 'Player 1 wins';
      } else if(player1.health < player2.health){
      document.getElementById("gameEnd").innerHTML = 'Player 2 wins';
      }
      PvPtimer.changeBy = 0;
    };
  };
animate();
//player1
window.addEventListener('keydown', (e) => {
  console.log((e.key).toLowerCase());
  switch((e.key).toLowerCase()){
  case 'w':
    if(player1.position.y > 70){
      player1.velocity.y = -5;
    }
    break
  case 'd':
    keySet.d.pressed = true;
    player1.lastKey = 'd';
    player1.velocity.x = 5
  break
  case 'a':
    keySet.a.pressed = true;
    player1.lastKey = 'a';
    player1.velocity.x = -5
  break
  case 'z':
    player1.attack1(1 , player2);
    player1.velocity.x = 0
    player1.velocity.y = 0
  break
  //player2
  case 'arrowup':
    if(player2.position.y > 70){
      player2.velocity.y = -5;
    }
    break
  case 'arrowright':
    keySet.arrowright.pressed = true;
    player2.lastKey = 'arrowright';
  break
  case 'arrowleft':
    keySet.arrowleft.pressed = true;
    player2.lastKey = 'arrowleft';
  break
  case 'enter':
    player2.attack1(1 , player1)
  break
  }});

window.addEventListener('keyup', (e) => {
  switch((e.key).toLowerCase()){
  //Player1
  case 'd':
    keySet.d.pressed = false;
    break
  case 'a':
    keySet.a.pressed = false;
    break
  //Player2
  case 'arrowright':
    keySet.arrowright.pressed = false;
    break
  case 'arrowleft':
    keySet.arrowleft.pressed = false;
    break
  }});
  //Timer check
    setInterval(() => {
      PvPtimer.displayTimerDown();
      if(PvPtimer.timeStart <= 0){
        document.getElementById("gameEnd").style.display = 'flex';
        if(player1.health == player2.health){
          document.getElementById("gameEnd").innerHTML = 'Tie';
        } else if(player1.health > player2.health){
          document.getElementById("gameEnd").innerHTML = 'Player 1 Wins';
        } else if(player1.health < player2.health){
          document.getElementById("gameEnd").innerHTML = 'Player 2 Wins';
        }
      };
    }, 1000);
  };
