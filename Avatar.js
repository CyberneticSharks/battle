class Avatar extends drawPixel{
        constructor({position, velocity, canvas, ctx, floor, scale, 
          frames, imgsrc, sprites, offset1}, name, dx, dy, dw, dh){
        super({
          scale,
          imgsrc,
          frames,
          sprites,
          offset1
        });
        this.position = position;
        this.velocity = velocity;
        this.canvas = canvas;
        this.ctx = ctx;
        this.playerGravity = 0.1;
        this.lastKey = "";
        this.name = name
        this.attacking = false;
        this.attack = {
          position: {
            x: this.position.x,
            y: this.position.y
          },
          width: 60,
          height: 60,
          offset1: offset1
        }
        this.floor = floor;
        this.frameNumber = 0;
        this.framesLap = 0;
        this.framesHold = 15;
        this.sprites = sprites;
        this.dx = dx 
        this.dy = dy
        this.dw = dw
        this.dh = dh
        this.health = 100;
        this.end = false;

        for(const sprite in this.sprites){
          sprites[sprite].image = new Image();
          sprites[sprite].image.src = sprites[sprite].imgsrc
        }
        //console.log(this.sprites);
    };
    update(object){
        if(this.end != true){
          this.animatedFrames();
          this.drawItems();
        }
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if(this.position.y + this.floor + this.velocity.y >= this.canvas.height - this.floor){
            this.velocity.y = 0;
        } 
        else{this.velocity.y += this.playerGravity;}
        this.attack.position.x = this.position.x - this.offset1.x
        this.attack.position.y = this.position.y - this.offset1.y
        /*
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(this.attack.position.x, this.attack.position.y, this.attack.width, this.attack.height)
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.position.x + this.dx, this.position.y + this.dy, this.dw, this.dh)
        */
        if(object.attack.position.x < this.position.x + this.dx + this.dw &&
          object.attack.position.x + object.attack.width > this.position.x + this.dx &&
          object.attack.position.y < this.position.y + this.dy + this.dh &&
          object.attack.position.y + object.attack.height >  this.position.y + this.dy &&
          this.attacking == true){
              this.attacking = false;
              object.health -= 4;
              document.getElementById(`${object.name}Health`).style.width = `${object.health}%`
          }
        this.animatedFrames()
        if(object.health <= 0){
          this.framesHold = 30;
          object.switchSprite('death');
        }
    }
    attack1(num){//object for possible multi version attack
      if(num == 1){
      this.switchSprite('attack3')
      }
        this.attacking = true;
        setTimeout(() => {
          this.attacking = false;
        }, 50);
    }
    switchSprite(sprite){//Creates greater sprite down.
      if(this.image == this.sprites.death.image && this.frameNumber == 5){
        this.end = true;
      }
      if(this.image == this.sprites.attack3.image && this.frameNumber < 7)
      return
      switch(sprite){
        case 'idle':
          if(this.image != this.sprites.idle.image){
            this.image = this.sprites.idle.image;
            this.framesHold = 20;
            this.frames = 4;
          }
          break
        case 'run':
          if(this.image != this.sprites.run.image  && this.velocity.y <=0){
            this.image = this.sprites.run.image;
            this.framesHold = 6;
            this.frames = 6;
          }
          else if(this.velocity.y > 0){
            this.switchSprite('jump')
          }
          break
        case 'jump':
          if(this.image != this.sprites.jump.image){
            this.image = this.sprites.jump.image;
            this.framesHold = 12;
            this.frames = 6;
          }
          break
        case 'attack3':
          if(this.image != this.sprites.attack3.image){
              this.image = this.sprites.attack3.image;
              this.framesHold = 10;
              this.frames = 8;
          }
          break
        case 'death':
          if(this.image != this.sprites.death.image){
              this.image = this.sprites.death.image;
              this.framesHold = 15;
              this.frames = 6;
          }
          break
      }
    };
};