// We create an instance of the Engine class. Looking at our index.html,
// we see that it has a div with an id of `"app"`
let gameEngine = new Engine(document.getElementById('app'));
let start = document.querySelector('#start');
let startScreen = document.querySelector('.startScreen');
let reset = document.querySelector('#reset');
start.addEventListener('click', () => {
  //gameEngine = new Engine(document.getElementById('app'));
  gameEngine.gameLoop();
  startScreen.style.visibility = 'hidden';
} );

reset.addEventListener('click', () => {
  location.reload();
});

// keydownHandler is a variable that refers to a function. The function has one parameter
// (does the parameter name matter?) which is called event. As we will see below, this function
// will be called every time the user presses a key. The argument of the function call will be an object.
// The object will contain information about the key press, such as which key was pressed.

const animatePlayer = (event) => {
  if (event.button === 0) {
    let bool = false;
    if (event.type === 'mousedown') bool = true;
    //if (event.type === 'mouseup') bool = false;
    gameEngine.player.shootAnimation(bool);
  }
}

const accelerate = (event) => {
  gameEngine.player.keyPresses[event.code] = event.type == 'keydown';
}

const moveAngle = (event) => {
  let mouseX = event.clientX;
  let mouseY = event.clientY;
  let angle = -Math.atan((mouseX - gameEngine.player.x - 56) / (mouseY - gameEngine.player.y - 70));
  if (mouseY >= gameEngine.player.y + 70) angle += Math.PI;
  gameEngine.player.point(angle);
}
// We add an event listener to document. document the ancestor of all DOM nodes in the DOM.
document.addEventListener('keydown', accelerate);
document.addEventListener('keyup', accelerate);
//document.addEventListener('keydown', moveRightHandler);
//document.addEventListener('keydown', moveUpHandler);
//document.addEventListener('keydown', moveDownHandler);
document.addEventListener('mousemove', moveAngle);
//document.addEventListener('mousedown', playerAnimate);
document.addEventListener('mousedown', animatePlayer);
document.addEventListener('mouseup', animatePlayer);

document.addEventListener('contextmenu', event => {
  event.preventDefault();
  //return false;
  //animatePlayer;
}, false);

// We call the gameLoop method to start the game

//gameEngine.gameLoop();
