//Creating a road object which will be drawn in the background canvas
class Road{
    constructor(img, xPosition, background, ctx,){
        //background image
        this.img = img;
        this.img = new Image();
        //xPosition and yPosition
        this.xPosition = xPosition;
        //background and ctx
        this.background = background;
        this.background = document.getElementById("background");
        this.ctx = this.background.getContext("2d");
    }
    //This will draw the road in three places while the page is loading
    build(yPosition){
        const ref = this;
        ref.ctx.drawImage(ref.img, ref.xPosition, yPosition, 30, 30);
        ref.xPosition ++;
        requestAnimationFrame(function(){
            ref.build(yPosition);
        });
    }
}

//creates three instances of the road then draws them
(function(){
    const road = new Road;
    road.xPosition = -10;
    road.yPosition = [20, 50, 80];
    road.img.src = "pic/road.png";
    road.yPosition.map(position => road.build(position));
})();


