export default class End {
  width = 200;
  height = 100;
  top = 200;
  left = 300;
  constructor() {
    this.end = document.createElement('div');

  }

  getDOM() {
    return this.end;
  }

  update() {
    this.end.style.width = this.width + 'px';
    this.end.style.height = this.height + 'px';
    this.end.style.top = this.top + 'px';
    this.end.style.left = this.left + 'px';
    this.end.style.backgroundImage = 'url(assets/sprites/gameover.png)';
    this.end.style.position = 'absolute';
    this.end.style.backgroundRepeat = 'no-repeat';
  }
};