// The Enemy class will contain information about the enemy such as
// its position on screen. It will also provide methods for updating
// and destroying the enemy.
class Enemy {
  // The constructor takes 2 arguments.
  // - theRoot refers to the parent DOM element.
  //   We need a way to add the DOM element we create in this constructor to our DOM.
  // - enemySpot is the position of the enemy (either 0, 1, 2, 3 or 4)
  // Since the constructor takes 2 parameters
  // and the 2 parameters provide important information, we must supply 2 arguments to "new" every time we
  // create an instance of this class.
  constructor(theRoot, enemySpot) {
    // When we create an Enemy instance, for example, new Enemy(someRoot, 3)
    // A new object is created and the constructor of the Enemy class is called. The context (the \`this\` keyword) is going
    // to be the new object. In these lines of code we see how to add 2 properties to this object: spot, root and gameHeight.
    // We do this because we want to access this data in the other methods of the class.
    // - We need the root DOM element so that we can remove the enemy when it is no longer needed. This will be done at a later time.
    // - We need to keep track of the enemy spot so that we don't place two enemies in the same spot.
    this.root = theRoot;
    this.spot = enemySpot;

    // The x position of the enemy is determined by its width and its spot. We need this information for the lifetime
    // of the instance, so we make it a property of the instance. (Why is this information needed for the lifetime of the instance?)
    this.x = enemySpot.x;

    // The y position is initially less than 0 so that the enemies fall from the top. This data is stored as a property
    // of the instance since it is needed throughout its lifetime. The destroyed property will indicate whether this enemy
    // is still in play. It is set to true whenever the enemy goes past the bottom of the screen.
    // It is used in the Engine to determine whether or not an enemy is in a particular column.
    this.y = enemySpot.y;
    this.animate;
    this.angle = enemySpot.angle;
    this.destroyed = false;
    this.active = true;
    this.health = 2;

    // We create a new DOM element. The tag of this DOM element is img. It is the DOM node that will display the enemy image
    // to the user. When the enemy is no longer needed, we will use a reference to this DOM node to remove it from the game. This
    // is why we create a property that refers to it.
    this.domElement = document.createElement('div');

    // We give it a src attribute to specify which image to display.
    this.domElement.style.background = "url('./images/enemy.png')";
    // We modify the CSS style of the DOM node.
    this.domElement.style.height = '156px';
    this.domElement.style.width = '75px';
    this.domElement.style.position = 'absolute';
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = `${this.y}px`;
    this.domElement.style.transform = `rotate(${this.angle}rad)`;
    this.domElement.style.zIndex = 5;
    this.domElement.style.userSelect = 'none';

    if (this.angle < Math.PI) {
      this.domElement.style.transform = `scaleX(-1) rotate(-${this.angle}rad)`;
    }

    // Show that the user can actually see the img DOM node, we append it to the root DOM node.
    theRoot.appendChild(this.domElement);
    this.speed = Math.random() / 3 + 0.25;

    this.soundSFX = document.createElement('audio');
    this.soundSFX.src = 'images/enemyExpl.mp3';
    this.soundSFX.setAttribute('preload', 'auto');
  }

  // We set the speed property of the enemy. This determines how fast it moves down the screen.
  // To make sure that every enemy has a different speed, we use Math.random()
  // this method will be called on the enemy instance every few milliseconds. The parameter
  // timeDiff refers to the number of milliseconds since the last update was called.
  update(timeDiff) {
    // We update the y property of the instance in proportion of the amount of time
    // since the last call to update. We also update the top css property so that the image
    // is updated on screen
    this.y += Math.cos(this.angle) * timeDiff * this.speed;
    this.x -= Math.sin(this.angle) *timeDiff * this.speed;
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = `${this.y}px`;

  
    // If the y position of the DOM element is greater than the GAME_HEIGHT then the enemy is at the bottom
    // of the screen and should be removed. We remove the DOM element from the root DOM element and we set
    // the destroyed property to indicate that the enemy should no longer be in play
    if (this.x > document.documentElement.clientWidth+360 || this.x < -360 || this.y > document.documentElement.clientHeight+360 || this.y < -360) {
      this.root.removeChild(this.domElement);

      this.destroyed = true;
    }

    gameEngine.player.lasers.forEach(proj => {
      if (proj.x >= this.x-50 && proj.x <= this.x + 50 && this.active === true) {
        if (proj.y >= this.y-50 && proj.y <= this.y + 50) {
          gameEngine.player.killCount++;
          proj.active = false;
          this.active = false;
          this.domElement.style.background = "url(./images/Explosion.png)";
          this.domElement.style.height = '96px';
          this.domElement.style.width = '96px';
          let sound = this.soundSFX.cloneNode();
          sound.play();

          let loc = 0;
          this.animate = setInterval( () => {
            this.domElement.style.backgroundPositionX = `-${loc}px`;
            this.domElement.style.transform = 'scale(2)';
            loc < 1056 ? loc += 96 : this.domElement.style.background = 'none';
          }, 40);
          if (loc === 1056) clearInterval(this.animate);
          
        }
      }
    });

  

    
    
    //if (this.y > document.documentElement.clientHeight) {
     // this.root.removeChild(this.domElement);

      //this.destroyed = true;
    //}
  }
}
