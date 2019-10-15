export default class Score {
  width = 24;
  height = this.width * 36 / 24;
  top = 100;
  left = 400;
  increasePointSound = new Audio('assets/audio/point.wav');

  constructor(value = 0) {
    this.score = document.createElement('div');
    this.value = value;
  }

  getDOM() {
    return this.score;
  }

  increase(value = 1) {
    this.value += value;
    this.increasePointSound.currentTime = 0;
    this.increasePointSound.play();
  }

  update() {
    const nums = this.value.toString().split('');
    this.score.style.backgroundImage = nums.map(i => `url(assets/sprites/${i}.png)`).join(", ");
    this.score.style.backgroundPosition = nums.map((i, index) => (index * this.width) + 'px').join(", ");
    this.score.style.backgroundSize = nums.map(i => 'contain').join(",");
    this.score.style.width = (this.width * nums.length) + 'px';
    this.score.style.height = this.height + 'px';
    this.score.style.top = this.top + 'px';
    this.score.style.left = (this.left - this.width * nums.length / 2) + 'px';
    this.score.style.position = 'absolute';
    this.score.style.backgroundRepeat = 'no-repeat';
  }
}