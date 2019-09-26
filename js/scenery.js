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

        this.bird = new Bird();
        this.scenery.appendChild(this.bird.getDOM());

        window.onclick = () => {
            this.bird.flyUp();
        }
        this.pipes = [];
        for (let i = 0; i < 6; i++) {
            const distance = 150;
            const pipeHeight = 50 + ~~(Math.random() * 200);
            const pipeTop = new Pipe(true);
            pipeTop.height = pipeHeight;
            pipeTop.left = (i + 1) * 200;
            this.scenery.appendChild(pipeTop.getDOM());

            const pipeBottom = new Pipe(false);
            pipeBottom.height = this.height - this.ground.height - pipeHeight - distance;
            pipeBottom.top = pipeHeight + distance;
            pipeBottom.left = (i + 1) * 200;
            this.scenery.appendChild(pipeBottom.getDOM());
            this.pipes.push(pipeTop, pipeBottom);
        }

    }

    update() {
        if (this.bird.top + this.bird.height > this.ground.top) {
            this.bird.flyUp();
        }
        this.ground.update();
        this.bird.update();
        this.sky.update();
        this.pipes.forEach(pipe => pipe.update());
    }
}