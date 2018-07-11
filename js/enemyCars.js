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
    constructor(carImg, yPosition, xPosition, collision){
        this.carImg = new Image();
        this.carImg.src = carImg;
        this.yPosition = yPosition;
        this.xPosition = xPosition;
        //this.speed = speed;  //This will change the speed of the car
        this.speed = Math.floor(Math.random( )* 10 +1); //this creates a random speed for car
        //this property checks for collision
        this.collision = collision;
        this.collision = false;
    }
    //This method checks to see if a car splats the armadillo
    splat(){
        const ref = this;

        if(ref.xPosition < protagonist.xPosition + 75 && ref.xPosition + 80
            > protagonist.xPosition && ref.yPosition < protagonist.yPosition + 75 && 80 + 
            ref.yPosition > protagonist.yPosition){ 
                ref.collision = true;
        }

    }
}

//The create function will create the cars and push them in the carArray
(function createCars(){
    //These are the three road positions on which the cars can drive on
    //It creates the cars then puts them in an array for storage
    const roadPosition = [50, 150, 250];
    const source = "pic/enemy_car.png"; //The same car image is loaded
    
    //We push the new cars in the carArray
    for(let i = 0; i < 25; i++){
         //We shuffle the roadPositions by calling randomLocation
         randomLocation(roadPosition);

         //This creates the car
         const yPosition = roadPosition[0];
         xPosition = enemyPlain.width;
         const car = new Cars(source, yPosition, xPosition);
         car.xPosition = enemyPlain.width;
        
         //Then we push it into the array
         carArray.push(car);
    }    
})();

//This will randomly shuffle the three roads in the array
function randomLocation(roadPosition){
    let length = roadPosition.length
    let i //index of the roadPosition
    let transElement  //transfer variable that holds the element in roadPosition

    //While there are remaining elements we shuffle the road locations
    while(length){
        //This picks an element from roadPosition
        i = Math.floor(Math.random() * length--);

        //We swap it with the current element
        transElement = roadPosition[length];
        roadPosition[length] = roadPosition[i];
        roadPosition[i] = transElement;
    }
    return roadPosition;
}
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
            carArray[i].splat();
            if(carArray[i].xPosition > -10){
                carArray[i].xPosition = carArray[i].xPosition - carArray[i].speed;
            }else{
                carArray[i].xPosition = enemyPlain.width;
            }
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
