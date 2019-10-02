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

        this.pipes = Array.from({ length: 0 }, () => new Pipe());
        this.distancePipeTopBottom = 170;
        this.distanceBetweenPipe = 200;
        this.totalPipe = 6;
        this.pipeWidth = 100;

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
        this.scenery.appendChild(this.bird.getDOM());
    }

    movePipe() {
        this.pipes.forEach(pipe => {
            pipe.left--;
            if (pipe.left < -this.pipeWidth) {
                pipe.left += (this.pipeWidth + this.distanceBetweenPipe) * this.totalPipe ;
            }
        });
    }

    update() {
        if (this.bird.top + this.bird.height > this.ground.top) {
            this.bird.flyUp();
        }
        this.movePipe();
        this.ground.update();
        this.bird.update();
        this.sky.update();
        this.pipes.forEach(pipe => pipe.update());
    }
}