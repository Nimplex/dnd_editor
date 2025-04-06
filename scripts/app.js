import { Camera2D } from "./camera.js";
import { Logger } from "./console.js";
import { MouseHandler } from "./mouse.js";
import { Project } from "./project.js";
import { Renderer } from "./renderer.js";
import { UIHandler } from "./ui.js";

export class MapEditor {
    constructor() {
        this.logger = new Logger("app", "#a0c4ff");
        this.renderer = new Renderer(this);
        this.camera = new Camera2D(this);
        this.mouse = new MouseHandler(this);
        this.ui = new UIHandler(this);

        this.project = new Project();

        this.windowResize = this.windowResize.bind(this);
    }

    setup(ctx) {
        this.ctx = ctx;
        this.ctx.windowResized = this.windowResize;

        this.logger.log("Map editor starting");
        this.logger.verbose("Creating WEBGL canvas");

        this.ctx.createCanvas(ctx.windowWidth, ctx.windowHeight, ctx.WEBGL);

        this.camera.setup(ctx);
        this.mouse.setup(ctx);
        this.ui.setup();

        this.camera.setPosition(
            (this.project.size[0] / 2) * this.project.tileSize,
            (this.project.size[1] / 2) * this.project.tileSize
        );
    }

    update() {
        this.renderer.draw(this.ctx);
        this.mouse.update(this.ctx);
        this.ui.update(this.ctx);
    }

    windowResize() {
        this.ctx.resizeCanvas(this.ctx.windowWidth, this.ctx.windowHeight);
    }
}
