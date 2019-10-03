export default class Bird {
    width = 50;
    height = this.width * 24 / 34;
    speed = 500;
    w = 0;
    d = 0.1;
    top = 0;
    up = 0;
    left = 0;
    rotate = -20;
    constructor() {
        this.bird = document.createElement('div');
        this.bird.animate([
            {
                backgroundPosition: `0px, ${this.width}px, ${this.width * 2}px`
            },
            {
                backgroundPosition: `${-this.width * 3}px, ${-this.width * 2}px, ${-this.width}px`
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
        // this.top = 20 * (1 + Math.cos(this.w));
        this.w += this.d;
        if (this.w > Math.PI) {
            this.d = -this.d;
        }
    }

    flyAnimation() {
        if (this.up > 0) {
            this.up -= 9;
            this.top -= this.up < 0 ? this.up + 9 : 9;
            if (this.rotate > -20) {
                this.rotate -= 10;
            }
        } else {
            this.top += 7;
            if (this.rotate < 90) {
                this.rotate += 3;
            }
        }
    }

    flyUp() {
        this.up = 80;
    }

    update() {
        this.flyAnimation();
        this.flapping();
        this.bird.style.top = this.top + 'px';
        this.bird.style.backgroundImage = 'url(assets/sprites/bluebird-upflap.png), url(assets/sprites/bluebird-midflap.png), url(assets/sprites/bluebird-downflap.png)';
        this.bird.style.width = this.width + "px";
        this.bird.style.height = this.height + "px";
        this.bird.style.left = this.left + "px";
        this.bird.style.position = 'absolute';
        this.bird.style.backgroundRepeat = 'no-repeat, no-repeat, no-repeat';
        this.bird.style.backgroundSize = 'contain, contain, contain';
        this.bird.style.transform = `rotate(${this.rotate}deg)`;
    }
};