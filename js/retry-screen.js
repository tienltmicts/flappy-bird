export default class RetryScreen {
  width = 215;
  height = 72;
  top = 300;
  left = 290;
  constructor() {
    this.retryScreen = document.createElement('div');
    this.update();
  }

  getDOM() {
    return this.retryScreen;
  }
  show() {
    this.retryScreen.style.display = 'block';
  }

  hide() {
    this.retryScreen.style.display = 'none';
  }

  onClick(func){
    this.retryScreen.onclick = func;
  }

  update() {
    this.retryScreen.style.backgroundImage = 'url(https://flappybird.io/img/restart.png)';
    this.retryScreen.style.width = this.width + 'px';
    this.retryScreen.style.height = this.height + 'px';
    this.retryScreen.style.top = this.top + 'px';
    this.retryScreen.style.left = this.left + 'px';
    this.retryScreen.style.position = 'absolute';
    this.retryScreen.style.backgroundRepeat = 'no-repeat';
    this.retryScreen.style.zIndex = 1;
  }
}