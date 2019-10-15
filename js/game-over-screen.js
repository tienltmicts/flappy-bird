export default class GameOverScreen {
  width = 200;
  height = 100;
  top = 200;
  left = 300;
  constructor() {
    this.end = document.createElement('div');
    this.update();
  }

  getDOM() {
    return this.end;
  }

  show() {
    this.end.style.display = 'block';
  }

  hide() {
    this.end.style.display = 'none';
  }

  update() {
    this.end.style.width = this.width + 'px';
    this.end.style.height = this.height + 'px';
    this.end.style.top = this.top + 'px';
    this.end.style.left = this.left + 'px';
    this.end.style.backgroundImage = 'url(assets/sprites/gameover.png)';
    this.end.style.position = 'absolute';
    this.end.style.backgroundRepeat = 'no-repeat';
    this.end.style.zIndex = 1;
  }
};