// Dynamically resize the canvas to be its CSS displayed size
(window.onresize = function(){
    const background  = document.querySelector("#background");
    background.width  = background.offsetWidth;
    background.height = background.offsetHeight;
})();

//Creating a road object which will be drawn in the background canvas
class Road{
    constructor(img, xPosition, background, ctx){
        //background image
        this.img = img;
        this.img = new Image();
        //xPosition and yPosition
        this.xPosition = xPosition;
        //background and ctx
        this.background = background;
        this.background = document.getElementById("background");
        this.ctx = ctx;
        this.ctx = this.background.getContext("2d");
    }
    //This will draw the road in three places while the page is loading
    build(yPosition){
        const ref = this;
        ref.ctx.drawImage(ref.img, ref.xPosition, yPosition, 80, 80);
        ref.xPosition ++;
        requestAnimationFrame(function(){
            ref.build(yPosition);
        });
    }
}
const road = new Road;
road.xPosition = -10;
yPosition = [50, 150, 250];
road.img.src = "pic/road.png";
yPosition.map(position => road.build(position));


