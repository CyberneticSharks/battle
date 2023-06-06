class drawPixel{
    constructor({position, canvas, ctx, scale, imgsrc, frames, sprites, offset1 = {x:0, y:0}}){
        this.position = position;
        this.canvas = canvas;
        this.ctx = ctx;
        this.image = new Image();
        this.image.src = imgsrc;
        this.scale = scale;
        this.frames = frames;
        this.frameNumber = 0;
        this.framesLap = 0;
        this.framesHold = 10;
        this.offset1 = offset1;
        this.sprites = sprites;
    }
    drawBackground(){
        this.ctx.drawImage(
            this.image, 
            this.position.x, 
            this.position.y, 
            this.canvas.width * this.scale, 
            this.canvas.height * this.scale
        );
    };
    drawItems(){
        this.ctx.drawImage(
            this.image,
            this.frameNumber * (this.image.width/this.frames),
            0,
            this.image.width/this.frames,
            this.image.height,
            this.position.x,
            this.position.y,
            (this.image.width/this.frames) * this.scale,
            this.image.height * this.scale,
        );
    };
    animatedFrames(){
        this.framesLap += 1;
        if(this.framesLap % this.framesHold == 0){
            if(this.frameNumber < this.frames - 1){
                this.frameNumber += 1;
            } else {
                this.frameNumber = 0;
            }
        }
    }
};
    /*drawFloor(){
        this.ctx.drawImage(
            this.image, 
            this.position.x, 
            this.position.y, 
            this.canvas.width * this.scale,
            this.image.height * this.scale
        );
    };*/