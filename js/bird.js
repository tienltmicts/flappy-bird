export default class Bird {
    BIRD_SIZE = 80;
    speed = 500;
    w = 0;
    d = 0.1;
    top = 0;
    constructor() {
        this.bird = document.createElement('div');
        this.bird.animate([
            {
                backgroundPosition: `0px, ${this.BIRD_SIZE}px, ${this.BIRD_SIZE * 2}px`
            },
            {
                backgroundPosition: `${-this.BIRD_SIZE * 3}px, ${-this.BIRD_SIZE * 2}px, ${-this.BIRD_SIZE}px`
            }
        ], {
            iterations: 'Infinity',
            duration: this.speed,
            easing: 'steps(3)'
        });
    }

    getDOM() {
        return this.bird;
    }

    flapping() {
        this.top = 180 + 100 * Math.cos(this.w);
        this.w += this.d;
        if (this.w > Math.PI) {
            this.d = -this.d;
        }
    }

    update() {
        this.flapping();    
        this.bird.style.top = this.top + 'px';
        this.bird.style.backgroundImage = 'url(assets/sprites/bluebird-upflap.png), url(assets/sprites/bluebird-midflap.png), url(assets/sprites/bluebird-downflap.png)';
        this.bird.style.width = this.BIRD_SIZE + "px";
        this.bird.style.height = (this.BIRD_SIZE * 24 / 34) + "px";
        this.bird.style.position = 'absolute';
        this.bird.style.backgroundRepeat = 'no-repeat, no-repeat, no-repeat';
        this.bird.style.backgroundSize = 'contain, contain, contain';
    }
};