// There will only be one instance of this class. This instance will contain the
// data and methods related to the burger that moves at the bottom of your screen
class Player {
  // The constructor takes one parameter. This parameter refers to the parent DOM node.
  // We will be adding a DOM element to this parent DOM node.
  constructor(root) {
    // The x position starts off in the middle of the screen. Since this data is needed every time we move the player, we
    // store the data in a property of the instance. It represents the distance from the left margin of the browsing area to
    // the leftmost x position of the image.
    this.x = document.documentElement.clientWidth*.5;

    // The y position never changes, so we don't need to store it in a property. It represents the y position of the top of the
    // hamburger. The y position is the distance from the top margin of the browsing area.
    const y = document.documentElement.clientHeight*.5;
    this.y = y;
    this.root = root;
    this.loc = 96;
    this.angle;
    this.speed = [0, 0];
    this.keyPresses = [];
    this.shoot;
    this.root = root;
    this.lasers = [];
    this.active = true;
    this.finalAngle;
    this.killCount = 0;
    this.interval = 150;

    // We create a DOM node. We will be updating the DOM node every time we move the player, so we store a reference to the
    // DOM node in a property.
    this.domElement = document.createElement('div');
    this.domElement.style.background = "url('images/playerSprites.png') 0px 0px";
    this.domElement.style.width = '111.66666px';
    this.domElement.style.height = '137px';
    this.domElement.style.position = 'absolute';
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = ` ${y}px`;
    this.domElement.style.zIndex = '10';

    root.appendChild(this.domElement);
    
    this.laserSFX = document.createElement('audio');
    this.laserSFX.src = 'images/laser.mp3';
    this.laserSFX.setAttribute('preload', 'auto');

    this.deadSFX = document.createElement('audio');
    this.deadSFX.src = 'images/playerExpl.mp3';
    this.deadSFX.setAttribute('preload', 'auto');

    this.powerSFX = document.createElement('audio');
    this.powerSFX.src = 'images/powerUp.mp3';
    this.powerSFX.setAttribute('preload', 'auto');

  }

  projectile(loc) {
    if (this.active) {
    let proj = {};
    let laser = document.createElement('div');
    laser.style.height = '15px';
    laser.style.width = '4px';
    laser.style.background = 'red';
    laser.style.boxShadow = '0px 0px 10px 2px red';
    laser.style.position = 'absolute';
    laser.style.transform = `rotate(${this.angle}rad)`;
    laser.style.userSelect = 'none';
    if (Math.floor(loc) === 111) {
      proj.x = this.x + 55.8 + 75*Math.sin(this.angle+.593);
      laser.style.left = `${proj.x}px`;
      proj.y = this.y + 68 - 75*Math.cos(this.angle+.593);
      laser.style.top = `${proj.y}px`;
    }
    if (Math.floor(loc) === 223) {
      proj.x = this.x + 55.8 + 75*Math.sin(this.angle-.593);
      laser.style.left = `${proj.x}px`;
      proj.y = this.y + 68 - 75*Math.cos(this.angle-.593);
      laser.style.top = `${proj.y}px`;
    }
    proj.angle = this.angle;
    proj.laser = laser;
    proj.active = true;
    this.root.appendChild(laser);
    this.lasers.push(proj);
  }
  }

  updateProjectiles() {
    this.lasers.forEach(proj => {
      proj.x -= Math.sin(-proj.angle)*20;
      proj.y -= Math.cos(-proj.angle)*20;
      proj.laser.style.left = `${proj.x}px`;
      proj.laser.style.top = `${proj.y}px`;
      if (proj.x > document.documentElement.clientWidth+20 || proj.x < -20 || proj.y > document.documentElement.clientHeight+20 || proj.y < -20 || proj.active === false) {
        proj.active = false;
        this.root.removeChild(proj.laser);
      }
    });
    this.lasers = this.lasers.filter(proj => {
      if (proj.active === true) return proj;
    });
    
    
  }
  
  shootAnimation(bool) {
    if (this.active) {
    let loc = 111.6666666666666;
    if (bool) {
      this.shoot = setInterval( () => {
        let sound = this.laserSFX.cloneNode();
        sound.volume = 0.5;
        if (this.active) sound.play();
        this.projectile(loc);
        this.domElement.style.backgroundPositionX = `-${loc}px`;
        loc < 223 ? loc += 111.666666666 : loc = 111.6666666666666;
      }, this.interval);
    } 
    if (!bool) {
      clearInterval(this.shoot);
      this.domElement.style.backgroundPositionX = 0;
    }
    
  }
    }

  point(angle) {
    if (this.active) {
      this.domElement.style.transform = `rotate(${angle}rad)`;
      this.angle = angle;
  }
  }

  position() {
    if (this.keyPresses['KeyW']) this.speed[1] += 0.2;
    if (this.keyPresses['KeyA']) this.speed[0] -= 0.2;
    if (this.keyPresses['KeyS']) this.speed[1] -= 0.2;
    if (this.keyPresses['KeyD']) this.speed[0] += 0.2;
    


  

    if (this.x < 0) this.x = 0;
    if (this.y < 0) this.y = 0;
    if (this.x > document.documentElement.clientWidth-120) this.x = document.documentElement.clientWidth-120;
    if (this.y > document.documentElement.clientHeight-137) this.y = document.documentElement.clientHeight-137;

    if (this.x <= 0 && this.speed[0] < 0) this.speed[0] = 0;
    if (this.y <= 0 && this.speed[1] > 0) this.speed[1] = 0;
    if (this.x >= document.documentElement.clientWidth-120 && this.speed[0] > 0) this.speed[0] = 0;
    if (this.y >= document.documentElement.clientHeight-137 && this.speed[1] < 0) this.speed[1] = 0;


    this.domElement.style.top = `${this.y}px`;
    this.domElement.style.left = `${this.x}px`;
    if (this.speed[0] > 0)  this.speed[0] -= 0.05;
    if (this.speed[0] < 0)  this.speed[0] += 0.05;
    if (this.speed[1] > 0)  this.speed[1] -= 0.05;
    if (this.speed[1] < 0)  this.speed[1] += 0.05;

    if (this.speed[0] > 0.1 && this.keyPresses['KeyA'])  this.speed[0] -= 0.05;
    if (this.speed[0] < -0.1 && this.keyPresses['KeyD'])  this.speed[0] += 0.05;
    if (this.speed[1] > 0.1 && this.keyPresses['KeyS'])  this.speed[1] -= 0.05;
    if (this.speed[1] < -0.1 && this.keyPresses['KeyW'])  this.speed[1] += 0.05;

    if (this.speed[0] > 0)  this.speed[0] -= 0.001;
    if (this.speed[0] < 0)  this.speed[0] += 0.001;
    if (this.speed[1] > 0)  this.speed[1] -= 0.001;
    if (this.speed[1] < 0)  this.speed[1] += 0.001;


    this.x += this.speed[0];
    this.y -= this.speed[1];
    
    //console.log(document.documentElement.clientHeight);
  }
}
