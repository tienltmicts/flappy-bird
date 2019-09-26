import Ground from "./ground.js";
import Sky from "./sky.js";
import Bird from "./bird.js";

export default class Scenery {
    constructor (width, height) {
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
    }
    
    update() {
        this.ground.update();
        this.bird.update();
        this.sky.update();
    }
}