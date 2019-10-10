export default class Pipe {
    width = 100;
    height = 70;
    top = 0;
    left = 0;
    isTopPipe = false;
    speed = 2;
    constructor(isTopPipe) {
        this.isTopPipe = isTopPipe;
        this.pipe = document.createElement('div');
    }

    getDOM() {
        return this.pipe;
    }

    moveLeft(){
        this.left -= this.speed;
    }

    update() {
        this.pipe.style.backgroundImage = 'url(assets/sprites/pipe-green.png)';
        this.pipe.style.width = this.width + 'px';
        this.pipe.style.height = this.height + 'px';
        this.pipe.style.top = this.top + 'px';
        this.pipe.style.left = this.left + 'px';
        this.pipe.style.position = 'absolute';
        this.pipe.style.backgroundRepeat = 'no-repeat';
        this.pipe.style.backgroundSize = 'cover';
        if (this.isTopPipe) {
            this.pipe.style.transform = 'rotate(180deg)';
        }
    }
}