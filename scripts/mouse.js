import { Logger } from "./console.js";
import { EventDispatcher } from "./events.js";

function itemsOverArea(x1, y1, x2, y2) {
    let temp = [];

    if (x1 > x2) [x1, x2] = [x2, x1];

    if (y1 > y2) [y1, y2] = [y2, y1];

    for (let x = x1; x <= x2; x++)
        for (let y = y1; y <= y2; y++) temp.push([x, y]);

    return temp;
}

export class MouseHandler extends EventDispatcher {
    constructor(app) {
        super();

        this.app = app;
        this.logger = new Logger("mouse", "#bdb2ff");

        this.dragStartX = 0;
        this.dragStartY = 0;
        this.dragEndX = 0;
        this.dragEndY = 0;

        this.mouseWheel = this.mouseWheel.bind(this);
        this.mousePressed = this.mousePressed.bind(this);
        this.mouseReleased = this.mouseReleased.bind(this);
        this.mouseDragged = this.mouseDragged.bind(this);
    }

    get tile() {
        const { mouseX, mouseY, width, height } = this.ctx;
        const worldX =
            (mouseX - width / 2) / this.app.camera.zoom + this.app.camera.x;
        const worldY =
            (mouseY - height / 2) / this.app.camera.zoom + this.app.camera.y;
        return [
            Math.floor(worldX / this.app.project.tileSize),
            Math.floor(worldY / this.app.project.tileSize),
        ];
    }

    setup(ctx) {
        this.ctx = ctx;
        ctx.mouseWheel = this.mouseWheel;
        ctx.mousePressed = this.mousePressed;
        ctx.mouseReleased = this.mouseReleased;
        ctx.mouseDragged = this.mouseDragged;
        this.logger.info("Mouse handler created");
    }

    update(ctx) {
        if (ctx.mouseIsPressed) {
            [this.dragEndX, this.dragEndY] = this.tile;
        }
    }

    mouseWheel(event) {
        this.app.camera.zoomAt(
            this.ctx.mouseX,
            this.ctx.mouseY,
            event.delta > 0 ? 0.95 : 1.05
        );
        this.logger.verbose(`zoom: ${this.app.camera.zoom}`);
    }

    mousePressed() {
        this.logger.verbose(`mouse button pressed: ${this.ctx.mouseButton}`);
        if (this.ctx.mouseButton == this.ctx.LEFT) this.leftPressed();
        if (this.ctx.mouseButton == this.ctx.RIGHT) this.rightPressed();
        if (this.ctx.mouseButton == this.ctx.CENTER) this.wheelPressed();
    }

    mouseReleased() {
        this.logger.verbose(`mouse button released: ${this.ctx.mouseButton}`);
        if (this.ctx.mouseButton == this.ctx.LEFT) this.leftReleased();
        if (this.ctx.mouseButton == this.ctx.RIGHT) this.rightReleased();
        if (this.ctx.mouseButton == this.ctx.CENTER) this.wheelReleased();
    }

    mouseDragged() {
        if (this.app.project.mode == "add") {
            [this.dragEndX, this.dragEndY] = [this.tile[0], this.tile[1]];
        }

        this.app.camera.drag(this.ctx.mouseX, this.ctx.mouseY);
    }

    // -------------------------------------------------------------------------

    leftPressed() {
        if (this.tile[0] < 0 || this.tile[0] >= this.app.project.size[0])
            return;
        if (this.tile[1] < 0 || this.tile[1] >= this.app.project.size[1])
            return;

        if (this.app.project.mode == "add") {
            [this.dragStartX, this.dragStartY] = [this.tile[0], this.tile[1]];
            this.app.renderer.renderSelection = true;
        }

        if (this.app.project.mode == "pointer")
            this.app.camera.startDrag(this.ctx.mouseX, this.ctx.mouseY);
    }

    wheelPressed() {
        this.app.camera.startDrag(this.ctx.mouseX, this.ctx.mouseY);
    }

    rightPressed() {}

    // -------------------------------------------------------------------------

    leftReleased() {
        if (this.app.project.mode == "add") {
            this.app.renderer.renderSelection = false;

            const selectedTiles = itemsOverArea(
                this.dragStartX,
                this.dragStartY,
                ...this.tile
            );

            for (const [x, y] of selectedTiles) {
                this.app.project.map[y][x] = "wall";
            }
        }

        if (this.app.project.mode == "pointer") this.app.camera.stopDrag();
    }

    wheelReleased() {
        this.app.camera.stopDrag();
    }

    rightReleased() {}
}
