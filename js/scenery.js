import Ground from "./ground.js";
import Sky from "./sky.js";
import Bird from "./bird.js";
import Pipe from "./pipe.js";

export default class Scenery {
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


        window.onclick = () => {
            this.bird.flyUp();
        }

        this.distancePipeTopBottom = 200;
        this.distanceBetweenPipe = 200;
        this.totalPipe = 6;
        this.pipeWidth = 100;
        this.pipes = Array.from({ length: 0 }, () => new Pipe());
        for (let i = 0; i < this.totalPipe; i++) {
            const pipeHeight = 50 + ~~(Math.random() * 200);
            const pipeTop = new Pipe(true);
            pipeTop.width = this.pipeWidth;
            pipeTop.height = pipeHeight;
            pipeTop.left = (i + 1) * (this.pipeWidth + this.distanceBetweenPipe);
            this.scenery.appendChild(pipeTop.getDOM());

            const pipeBottom = new Pipe(false);
            pipeBottom.width = this.pipeWidth;
            pipeBottom.height = this.height - this.ground.height - pipeHeight - this.distancePipeTopBottom;
            pipeBottom.top = pipeHeight + this.distancePipeTopBottom;
            pipeBottom.left = (i + 1) * (this.pipeWidth + this.distanceBetweenPipe);
            this.scenery.appendChild(pipeBottom.getDOM());
            this.pipes.push(pipeTop, pipeBottom);
        }
        this.bird = new Bird();
        this.bird.left = 100;
        this.scenery.appendChild(this.bird.getDOM());
    }

    movePipe() {
        this.pipes.forEach((pipe, index, arr) => {
            pipe.left--;
            if (pipe.left < -this.pipeWidth) {
                pipe.height = index & 1 ? this.height - this.ground.height - arr[index - 1].height - this.distancePipeTopBottom : 50 + ~~(Math.random() * 200);
                pipe.top = index & 1 ? arr[index - 1].height + this.distancePipeTopBottom : 0;
                pipe.left += (this.pipeWidth + this.distanceBetweenPipe) * this.totalPipe;
            }
        });
    }

    restart() {
        this.bird.top = 0;
        this.bird.up = 0;
        this.bird.left = 100;
        this.bird.rotate = -20;
        this.pipes.forEach((pipe, index, arr) => {
            pipe.left = (1 + (index + 1) >> 1) * (this.pipeWidth + this.distanceBetweenPipe);
            pipe.height = index & 1 ? this.height - this.ground.height - arr[index - 1].height - this.distancePipeTopBottom : 50 + ~~(Math.random() * 200);
            pipe.top = index & 1 ? arr[index - 1].height + this.distancePipeTopBottom : 0;
        });
    }

    checkDied() {
        if (this.bird.top > (this.height - this.bird.height - this.ground.height)) {
            this.restart();
        }
        for (let i = 0; i < this.totalPipe; i++) {
            const pipe = this.pipes[i];
            if (pipe.left <= this.bird.left && this.bird.left <= pipe.left + pipe.width ||
                pipe.left <= this.bird.left + this.bird.width && (this.bird.left + this.bird.width) <= pipe.left + pipe.width) {
                if (!(i & 1) && this.bird.top <= pipe.height ||
                    (i & 1) && this.bird.top + this.bird.height >= pipe.top && pipe.top > 150) {
                    this.restart();
                }
            }
        }
    }

    update() {
        if (this.bird.top + this.bird.height > this.ground.top) {
            this.bird.flyUp();
        }
        this.checkDied();
        this.movePipe();
        this.ground.update();
        this.bird.update();
        this.sky.update();
        this.pipes.forEach(pipe => pipe.update());
    }
}