import { Camera2D } from "./camera.js";
import { Logger } from "./console.js";
import { MouseHandler } from "./mouse.js";
import { Renderer } from "./renderer.js";
import { UIHandler } from "./ui.js";

export class MapEditor {
    constructor() {
        this.logger = new Logger("app", "#660066");
        this.camera = new Camera2D(this);
        this.mouse = new MouseHandler(this);
        this.renderer = new Renderer(this);
        this.ui = new UIHandler(this);

        this.currentMode = "pointer";
        this.tileSize = 70;
        this.mapSize = [100, 100];

        this.windowResize = this.windowResize.bind(this);
    }

    setup(ctx) {
        this.ctx = ctx;

        this.logger.log("Map editor starting");
        this.logger.verbose("Creating WEBGL canvas");

        this.ctx.createCanvas(
            ctx.windowWidth,
            ctx.windowHeight,
            ctx.WEBGL
        );

        this.ui.setup();
        this.camera.setup(ctx);
        this.mouse.setup(ctx);

        this.ctx.windowResized = this.windowResize;

        this.camera.setPosition(
            (this.mapSize[0] / 2) * this.tileSize,
            (this.mapSize[1] / 2) * this.tileSize
        );
    }

    update() {
        this.renderer.draw(this.ctx);
        this.ui.update(this.ctx);
    }

    windowResize() {
        this.ctx.resizeCanvas(this.ctx.windowWidth, this.ctx.windowHeight);
    }
}
