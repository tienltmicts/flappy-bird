export default class Pipe {
  width = 100;
  height = 70;
  top = 0;
  left = 0;
  isTopPipe = false;
  speed = 1;
  w = 0;
  d = 0.01;
  amplitude = 50;
  acceleration = 0.003;
  velocity = 0;
  constructor(isTopPipe) {
    this.isTopPipe = isTopPipe;
    this.pipe = document.createElement('div');
  }

  getDOM() {
    return this.pipe;
  }

  moveLeft() {
    this.left -= this.speed;
  }

  // jump() {
  //   this.amplitude = 
  // }

  // verb() {
  //   // this.w += this.d;
  //   // if (this.w > Math.PI) {
  //   //   this.d = - this.d;
  //   // }
  //   // this.height = this.amplitude * Math.cos(this.w);
  //   this.velocity -= this.acceleration;
  //   if(this.height > 400 && this.height < 800) this.height -= this.velocity;
  //   this.height += this.velocity;
  // }

  update() {
    this.pipe.style.backgroundImage = 'url(assets/sprites/pipe-green.png)';
    this.pipe.style.width = this.width + 'px';
    this.pipe.style.height = this.height + 'px';
    this.pipe.style.top = this.top + 'px';
    this.pipe.style.left = this.left + 'px';
    this.pipe.style.position = 'absolute';
    this.pipe.style.backgroundRepeat = 'no-repeat';
    this.pipe.style.backgroundSize = 'cover';
    if (this.isTopPipe) {
      this.pipe.style.transform = 'rotate(180deg)';
    }
  }
}