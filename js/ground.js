export default class Ground {
    height = 0;
    top = 0;
    width = 0;
    constructor() {
        this.ground = document.createElement('div');
    }

    getDOM() {
        return this.ground;
    }
    
    update() {
        this.ground.style.top = this.top + 'px';
        this.ground.style.backgroundImage = 'url(assets/sprites/base.png)';
        this.ground.style.height = this.height + 'px';
        this.ground.style.position = 'absolute';
        this.ground.style.backgroundRepeat = 'repeat-x';
        this.ground.style.backgroundSize = 'contain';
        this.ground.style.width = this.width + 'px';
    }
}