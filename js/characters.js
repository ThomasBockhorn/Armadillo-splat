// Dynamically resize the canvas to be its CSS displayed size
(window.onresize = function(){
    const protagonistPlane  = document.querySelector('#protagonistPlane');
    protagonistPlane.width  = protagonistPlane.offsetWidth;
    protagonistPlane.height = protagonistPlane.offsetHeight;
})();

//global variables
const protagonistPlane = document.getElementById("protagonistPlane");
const protagonistCtx = protagonistPlane.getContext("2d");

//Protagonist object
const protagonist = {
    xPosition : 500,
    yPosition : 400,
    press: 0, //indicator if a key was pressed
    keyPress: 0, //holds the value after a key was pressed
    img: new Image()
}

//keyMove is a function that will allow the user to move the armadillo with the arrow keys
function keyMove(){
    //loads the image and initial position 
    protagonist.img.src = "pic/armadillo.png", //The image of the armadillo
    protagonist.img.onload = function() {
        protagonistCtx.drawImage(protagonist.img, protagonist.xPosition, protagonist.yPosition, 75, 75);
    }
    //This gets the value of the keyPress when a key is pressed
    document.onkeydown = function(e){
        protagonist.press = 1;
        protagonist.keyPress = window.event?e.keyCode:e.which;
    }
    //if the key is released it will change the value of press
    document.onkeyup = function(e){
        protagonist.press = 0;
    }
    //This will determine what key is pressed and if it is a arrow key, move the character according
    setInterval(function(){
        if(protagonist.press === 0){
            return;  // if the key is released do nothing
        }
        else if ((protagonist.keyPress === 37) && (protagonist.xPosition > 0)){
            protagonist.xPosition -= 4;  //if the left arrow key is pressed
        }
        else if ((protagonist.keyPress === 38) && (protagonist.yPosition > 0)){
            protagonist.yPosition -= 4;  //if up arrow key is pressed
        }
        else if ((protagonist.keyPress === 39) && (protagonist.xPosition < protagonistPlane.width - 75)){
            protagonist.xPosition += 4;  //if right arrow key is pressed
        }
        else if ((protagonist.keyPress === 40) && (protagonist.yPosition < protagonistPlane.height - 75)){
            protagonist.yPosition += 4; //if down arrow key is pressed
        }

        //clears canvas then redraws image
        protagonistCtx.clearRect(0,0, protagonistPlane.width, protagonistPlane.height);
        protagonistCtx.drawImage(protagonist.img, protagonist.xPosition, protagonist.yPosition, 75, 75);

        //winning function checks to see if player reaches home
        winning();

        //checks to see if the carArray has any collision = true
        carArray.some(function(car){
            if(car.collision === true){
                protagonist.xPosition = 500;
                protagonist.yPosition = 400;
                car.collision = false;   //Then we return it to false
            }
        })
    }, 20);
}
keyMove();


//When the armadillo reaches the yPosition = 0 then the player wins
//the game and the armadillo goes back to its initial position
function winning(){
    //needed for winning message
    const modalMessage = document.querySelector(".modal");
    const spanModal = document.querySelector(".close");
    
    if(protagonist.yPosition === 0){
        protagonist.xPosition = 500;
        protagonist.yPosition = 400;

        //Display when armadillo reaches other side
        modalMessage.style.display = "block";

        //When user clicks on close button
        //When user clicks on the close button
        spanModal.addEventListener("click", function(){
            modalMessage.style.display = "none";
        });
    }
}
