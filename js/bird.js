export default class Bird {
  width = 50;
  height = this.width;
  speed = 500;
  top = 0;
  left = 0;
  w = 0;
  d = 0.1;
  up = 0;
  rotate = -20;
  acceleration = 0.3;
  velocity = 0;
  defautVelocity = 7;
  flyUpSound = new Audio('assets/audio/wing.wav');
  constructor() {
    this.bird = document.createElement('div');
    this.bird.animate([
      {
        backgroundPosition: `0px, ${this.width}px, ${this.width * 2}px`
      },
      {
        backgroundPosition: `${-this.width * 3}px, ${-this.width * 2}px, ${-this.width}px`
      }
    ], {
      iterations: 'Infinity',
      duration: this.speed,
      easing: 'steps(3)'
    });
  }

  getDOM() {
    return this.bird;
  }

  flyAnimation() {
    this.rotate -= (this.velocity + 6) * 10 / this.defautVelocity;
    if (this.rotate > 90) {
      this.rotate = 90;
    }
    if (this.rotate < -20) {
      this.rotate = -20;
    }
    this.velocity -= this.acceleration;
    this.top -= this.velocity;
  }

  flapping() {
    this.w += this.d;
    if (this.w > Math.PI) {
      this.d = - this.d;
    }
    this.top = 200 + 20 * Math.cos(this.w);
  }

  flyUp() {
    this.velocity = this.defautVelocity;
    this.flyUpSound.currentTime = 0;
    this.flyUpSound.play();
  }

  update() {
    this.bird.style.top = this.top + 'px';
    this.bird.style.backgroundImage = 'url(assets/sprites/bluebird-upflap.png), url(assets/sprites/bluebird-midflap.png), url(assets/sprites/bluebird-downflap.png)';
    this.bird.style.width = this.width + "px";
    this.bird.style.height = this.height + "px";
    this.bird.style.left = this.left + "px";
    this.bird.style.position = 'absolute';
    this.bird.style.backgroundRepeat = 'no-repeat, no-repeat, no-repeat';
    this.bird.style.backgroundSize = '100% 100%, 100% 100%, 100% 100%';
    this.bird.style.transform = `rotate(${this.rotate}deg)`;
  }
};