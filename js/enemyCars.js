// Dynamically resize the canvas to be its CSS displayed size
(window.onresize = function(){
    const enemyPlane  = document.querySelector('#enemyPlane');
    enemyPlane.width  = enemyPlane.offsetWidth;
    enemyPlane.height = enemyPlane.offsetHeight;
})();


let requestID = undefined; //This global variable allows the animation to stop and start over
const carArray = [] //This will hold the car objects for display
const enemyPlain = document.getElementById("enemyPlane");
const ctx = enemyPlain.getContext("2d");

//These global variables help make the animation more smooth
const characterTime = {
    frameCount: 0,
    fps: 60,
    fpsInterval: 1000/60,
    startTime: 0,
    now: 0,
    then: window.performance.now(),
    elapsed: 0
}

//The car class will allow multiple cars to be on the canvas at the same time.
class Cars{
    constructor(carImg, yPosition, xPosition){
        this.carImg = new Image();
        this.carImg.src = carImg;
        this.yPosition = yPosition;
        this.xPosition = xPosition;
        //this.speed = speed;  //This will change the speed of the car
        this.speed = Math.floor(Math.random( )* 5 +1); //this creates a random speed for car
    }
}

//The create function will create the cars and push them in the carArray
(function createCars(){
    //These are the three road positions on which the cars can drive on
    //It creates the cars then puts them in an array for storage
    for(let i = 0; i < 10; i++){
        const roadPosition = [50, 150, 250];
        const source = "pic/enemy_car.png"; //The same car image is loaded
        //This creates the car
        const yPosition = roadPosition[i];
        xPosition = enemyPlain.width;
        const car = new Cars(source, yPosition, xPosition);
        car.xPosition = enemyPlain.width;

        //Then we push it into the array
        carArray.push(car);
    }
})();

//This function will animate all the cars in the carArray
function animate(){
    ctx.clearRect(0,0, enemyPlain.width, enemyPlain.height);

    //Sees if enough time has elapsed
    characterTime.now = window.performance.now();
    characterTime.elapsed = characterTime.now - characterTime.then;
            
    //if it did, we draw the frame
    if(characterTime.elapsed > characterTime.fpsInterval){
                
        //calculates then time stamp
        characterTime.then = characterTime.now - (characterTime.elapsed % characterTime.fpsInterval);
                
        //Draw each of the images
        for(let i = 0; i <carArray.length; i++){
            ctx.drawImage(carArray[i].carImg, carArray[i].xPosition, carArray[i].yPosition, 80, 80);
            if(carArray[i].xPosition > -50){
                carArray[i].xPosition = carArray[i].xPosition - carArray[i].speed;
            }else{
                carArray[i].xPosition = enemyPlain.width;
            }
            
            console.log(carArray[i]);
        }

        requestID = requestAnimationFrame(function(){
                    animate();
        });   
    }else{
        cancelAnimationFrame(requestID);
        requestID = undefined;
        xPosition = enemyPlane.width
        requestID = requestAnimationFrame(function(){
            animate();
        });
    }
}
animate();
