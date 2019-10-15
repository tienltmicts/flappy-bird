export default class Start {
  width = 200;
  height = 300;
  top = 100;
  left = 300;
  constructor() {
    this.start = document.createElement('div');
    this.update();
  }

  getDOM() {
    return this.start;
  }

  show() {
    this.start.style.display = 'block';
  }

  hide() {
    this.start.style.display = 'none';
  }

  update() {
    this.start.style.backgroundImage = 'url(assets/sprites/message.png)';
    this.start.style.width = this.width + 'px';
    this.start.style.height = this.height + 'px';
    this.start.style.top = this.top + 'px';
    this.start.style.left = this.left + 'px';
    this.start.style.position = 'absolute';
    this.start.style.backgroundRepeat = 'no-repeat';
  }
}