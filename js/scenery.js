import Ground from "./ground.js";
import Sky from "./sky.js";
import Bird from "./bird.js";
import Pipe from "./pipe.js";
import Score from "./score.js";
import GameOverScreen from "./game-over-screen.js";
import Start from "./start.js";
import RetryScreen from "./retry-screen.js";

export default class Scenery {
  isGameOver = true;
  isHitPipe = true;
  hitPipes = new Audio('assets/audio/hit.wav');
  hitGround = new Audio('assets/audio/hit.wav');
  downDied = new Audio('assets/audio/die.wav')

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.scenery = document.getElementById("scenery");

    this.ground = new Ground();
    this.ground.width = this.width;
    this.ground.height = 80;
    this.ground.top = this.height - 80;
    this.scenery.appendChild(this.ground.getDOM());

    this.sky = new Sky();
    this.sky.width = this.width;
    this.sky.height = this.height - 80;
    this.scenery.appendChild(this.sky.getDOM());
    this.start = false;
    this.starts = new Start();
    this.retryScreen = new RetryScreen();
    this.retryScreen.hide();
    this.retryScreen.onClick(() => this.restart());
    this.scenery.appendChild(this.retryScreen.getDOM());

    window.onclick = () => {
      if (!this.isGameOver && !this.isHitPipe) {
        this.bird.flyUp();
      } else {
        if (!this.start) {
          this.restart();
          this.bird.flyUp();
        }
      }
    }

    window.onkeydown = (e) => {
      if (!this.isGameOver && !this.isHitPipe) {
        this.bird.flyUp();
      } else {
        if (e.key == 'Enter') {
          this.restart();
          this.bird.flyUp();
        }
      }
    }

    this.distancePipeTopBottom = 200;
    this.distanceBetweenPipe = 200;
    this.totalPipe = 2 * 6;
    this.pipeWidth = 100;
    this.pipeSpeed = 2;
    this.pipes = Array.from({ length: 0 }, () => new Pipe());
    for (let i = 0; i < this.totalPipe >> 1; i++) {
      const pipeHeight = 50 + ~~(Math.random() * 200);
      const pipeTop = new Pipe(true);
      pipeTop.speed = this.pipeSpeed;
      pipeTop.width = this.pipeWidth;
      pipeTop.height = pipeHeight;
      pipeTop.left = this.width + i * (this.pipeWidth + this.distanceBetweenPipe);
      this.scenery.appendChild(pipeTop.getDOM());

      const pipeBottom = new Pipe(false);
      pipeBottom.speed = this.pipeSpeed;
      pipeBottom.width = this.pipeWidth;
      pipeBottom.height = this.height - this.ground.height - pipeHeight - this.distancePipeTopBottom;
      pipeBottom.top = pipeHeight + this.distancePipeTopBottom;
      pipeBottom.left = this.width + i * (this.pipeWidth + this.distanceBetweenPipe);
      this.scenery.appendChild(pipeBottom.getDOM());
      this.pipes.push(pipeTop, pipeBottom);
    }
    this.bird = new Bird();
    this.bird.top = 100;
    this.bird.left = 100;
    this.scenery.appendChild(this.bird.getDOM());
    this.score = new Score();
    this.score.left = this.width / 2;
    this.scenery.appendChild(this.score.getDOM());
    this.gameOverScreen = new GameOverScreen();
    this.gameOverScreen.hide();
    this.scenery.appendChild(this.gameOverScreen.getDOM());
    this.scenery.appendChild(this.starts.getDOM());
  }

  movePipe() {
    this.pipes.forEach((pipe, index, arr) => {
      pipe.moveLeft();
      
      if (index & 1) {
        pipe.height = this.height - this.ground.height - arr[index - 1].height - this.distancePipeTopBottom;
        pipe.top = arr[index - 1].height + this.distancePipeTopBottom;
      } else {
        //pipe.verb();
      }

      if (pipe.left < -this.pipeWidth) {
        if (index & 1) { // is Pipe bottom
          pipe.height = this.height - this.ground.height - arr[index - 1].height - this.distancePipeTopBottom;
          pipe.top = arr[index - 1].height + this.distancePipeTopBottom;
          pipe.left += (this.pipeWidth + this.distanceBetweenPipe) * (this.totalPipe >> 1);
        } else {
          pipe.height = 50 + ~~(Math.random() * 200);
          pipe.top = 0;
          pipe.left += (this.pipeWidth + this.distanceBetweenPipe) * (this.totalPipe >> 1);
        }

      }
    });
  }

  restart() {
    this.starts.hide();
    this.start = true;
    this.gameOverScreen.hide();
    this.retryScreen.hide();
    this.gameOverScreen.update();
    this.isGameOver = false;
    this.isHitPipe = false;
    this.score.value = 0;
    this.bird.top = 100;
    this.bird.up = 0;
    this.bird.left = 100;
    this.bird.rotate = -20;
    this.pipes.forEach((pipe, index, arr) => {
      pipe.left = this.width + ((1 + (index + 1) >> 1) - 1) * (this.pipeWidth + this.distanceBetweenPipe);
      pipe.height = index & 1 ? this.height - this.ground.height - arr[index - 1].height - this.distancePipeTopBottom : 50 + ~~(Math.random() * 200);
      pipe.top = index & 1 ? arr[index - 1].height + this.distancePipeTopBottom : 0;
    });
  }

  checkDied() {
    if (this.bird.top > (this.ground.top - this.bird.height)) {
      this.bird.top = this.ground.top - this.bird.height;
      if (!this.isHitPipe) {
        this.hitGround.play();
      }
      this.isGameOver = true;
      this.gameOverScreen.show();
      this.retryScreen.show();
      return true;
    }
    for (let i = 0; i < this.totalPipe; i++) {
      const pipe = this.pipes[i];
      if (pipe.left <= this.bird.left && this.bird.left <= pipe.left + pipe.width ||
        pipe.left <= this.bird.left + this.bird.width && (this.bird.left + this.bird.width) <= pipe.left + pipe.width) {
        if (!(i & 1) && this.bird.top <= pipe.height ||
          (i & 1) && this.bird.top + this.bird.height >= pipe.top && pipe.top > 150) {
          this.bird.up = 0;
          if (!this.isHitPipe) {
            this.isHitPipe = true;
            this.hitPipes.currentTime = 0;
            this.hitPipes.play();
            this.downDied.currentTime = 0;
            this.downDied.play();
            this.gameOverScreen.show();
            this.retryScreen.show();
          }
          return true;

        }
      }

    }
    return false;

  }

  checkScore() {
    for (let i = 0; i + i < this.totalPipe; i++) {
      const pipe = this.pipes[2 * i];
      const denta = this.bird.left + this.bird.width - pipe.left - pipe.width;
      if (denta <= this.pipeSpeed && denta > 0) {
        this.score.increase();
      }
    }
  }

  update() {
    this.ground.update();
    this.sky.update();

    if (!this.start) {
      this.bird.flapping();
      this.bird.update();
    }
    else {
      this.score.update();
      if (!this.isGameOver) {
        this.bird.flyAnimation();
        this.checkDied();
        this.bird.update();
        if (!this.isHitPipe) {
          this.movePipe();
          this.pipes.forEach(pipe => pipe.update());
          this.checkScore();
        }
      }
    }
  }
}