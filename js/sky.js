export default class Sky {
    top = 0;
    height = 0;
    width = 0;
    constructor() {
        this.sky = document.createElement('div');
    }

    getDOM() {
        return this.sky;
    }

    update() {
        this.sky.style.top = this.top + 'px';
        this.sky.style.backgroundImage = 'url(assets/sprites/background-day.png)';
        this.sky.style.position = 'absolute';
        this.sky.style.backgroundRepeat = 'repeat-x';
        this.sky.style.backgroundSize = 'contain';
        this.sky.style.width = this.width + 'px';
        this.sky.style.height = this.height + 'px';
    }
}