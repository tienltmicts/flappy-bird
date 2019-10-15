import Scenery from "./scenery.js";

const scenery = new Scenery(800, 600);
setInterval(() => {
  scenery.update();
}, 13);