// Dynamically resize the canvas to be its CSS displayed size
(window.onresize = function(){
    const enemyPlane  = document.querySelector('#enemyPlane');
    enemyPlane.width  = enemyPlane.offsetWidth;
    enemyPlane.height = enemyPlane.offsetHeight;
})();


let requestID = undefined; //This global variable allows the animation to stop and start over
let carArray = [] //This will hold the car objects for display

//This function regulating the fps of the car image
function animationTiming(){
    characterTime.fps = 60;  //60fps is the ideal setting after some trial an error
    characterTime.fpsInterval = 1000/characterTime.fps;
    characterTime.then = window.performance.now();
};

//These global variables help make the animation more smooth
const characterTime = {
    frameCount: 0,
    fps: 0,
    fpsInterval: 0,
    startTime: 0,
    now: 0,
    then: 0,
    elapsed: 0
}

//Creating the car class that will be the prototype for all the cars that 
//will be displayed.  Each car will have a sensor that will detect if the 
//car hit the armadillo
class Cars{
    constructor(carImg, yPosition, speed){
        this.carImg = new Image();
        this.carImg.src = carImg;
        this.yPosition = yPosition;
        this.enemyPlane = document.getElementById("enemyPlane");
        this.ctx = this.enemyPlane.getContext("2d");
        this.xPosition = this.enemyPlane.width;
        this.speed = speed;  //This will change the speed of the car
    }
    //This create function will draw the cars onto the enemyPlane canvas.  It will
    //use the time object as reference for a better animation
    draw(){
        const ref = this;

        //requests another frame
        if(ref.xPosition > -50){
            //Sees if enough time has elapsed
            characterTime.now = window.performance.now();
            characterTime.elapsed = characterTime.now - characterTime.then;
            //if it did, we draw the frame
            if(characterTime.elapsed > characterTime.fpsInterval){
                //calculates then time stamp
                characterTime.then = characterTime.now - (characterTime.elapsed % characterTime.fpsInterval);
                //This clears the canvas so the cars seem to animate
                ref.enemyPlane.width = ref.enemyPlane.width;
                ref.ctx.drawImage(ref.carImg, ref.xPosition, ref.yPosition, 80, 80);
                ref.xPosition = ref.xPosition - ref.speed;
            } 
            requestID = requestAnimationFrame(function(){
                ref.draw();
            });   
        }else{
            cancelAnimationFrame(requestID);
            requestID = undefined;
            ref.xPosition = ref.enemyPlane.width
            requestID = requestAnimationFrame(function(){
                ref.draw();
            });
        }
    }
}
//this starts that animation clock
animationTiming();

function characterArray(){
    //These are the three road positions on which the cars can drive on
    //It creates the cars then puts them in an array for storage
    for(let i = 0; i < 3; i++){
        const roadPosition = [50, 150, 250];
        const source = "pic/enemy_car.png"; //The same car image is loaded
        const yPosition = 50; //every car starts in that position
        let speed = Math.floor(Math.random( )* 5 +1);

        //This creates the car
        const car = new Cars(source, yPosition, speed);

        //Then we push it into the array
        carArray.push(car);
    }
   
}
characterArray();
//const car = new Cars;
//car.draw(carArray[0]);
//Creating a new car 
const car = new Cars;
car.carImg.src = "pic/enemy_car.png";
car.yPosition = 50;
car.speed = 5;

car.draw();