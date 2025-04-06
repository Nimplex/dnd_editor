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
        this.logger = new Logger("mouse", "#00FFFF");

        this.dragStartX = 0;
        this.dragStartY = 0;
        this.dragEndX = 0;
        this.dragEndY = 0;
        this.selectedTiles = [];

        this.mouseWheel = this.mouseWheel.bind(this);
        this.mousePressed = this.mousePressed.bind(this);
        this.mouseReleased = this.mouseReleased.bind(this);
        this.mouseDragged = this.mouseDragged.bind(this);
    }

    setup(ctx) {
        this.ctx = ctx;
        ctx.mouseWheel = this.mouseWheel;
        ctx.mousePressed = this.mousePressed;
        ctx.mouseReleased = this.mouseReleased;
        ctx.mouseDragged = this.mouseDragged;
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
        this.logger.verbose(
            `mouse button pressed: ${this.ctx.mouseButton}`
        );
        if (this.ctx.mouseButton == this.ctx.LEFT) this.leftPressed();
        if (this.ctx.mouseButton == this.ctx.RIGHT) this.rightPressed();
        if (this.ctx.mouseButton == this.ctx.CENTER)
            this.wheelPressed();
    }

    mouseReleased() {
        this.logger.verbose(
            `mouse button released: ${this.ctx.mouseButton}`
        );
        if (this.ctx.mouseButton == this.ctx.LEFT) this.leftReleased();
        if (this.ctx.mouseButton == this.ctx.RIGHT)
            this.rightReleased();
        if (this.ctx.mouseButton == this.ctx.CENTER)
            this.wheelReleased();
    }

    mouseDragged() {
        if (this.app.currentMode == "add") {
            const worldX =
                (this.ctx.mouseX - this.ctx.width / 2) /
                    this.app.camera.zoom +
                this.app.camera.x;
            const worldY =
                (this.ctx.mouseY - this.ctx.height / 2) /
                    this.app.camera.zoom +
                this.app.camera.y;
            const tileX = Math.floor(worldX / this.app.tileSize);
            const tileY = Math.floor(worldY / this.app.tileSize);
            [this.dragEndX, this.dragEndY] = [tileX, tileY];
        }

        this.app.camera.drag(this.ctx.mouseX, this.ctx.mouseY);
    }

    // -------------------------------------------------------------------------

    leftPressed() {
        const worldX =
            (this.ctx.mouseX - this.ctx.width / 2) /
                this.app.camera.zoom +
            this.app.camera.x;
        const worldY =
            (this.ctx.mouseY - this.ctx.height / 2) /
                this.app.camera.zoom +
            this.app.camera.y;
        const tileX = Math.floor(worldX / this.app.tileSize);
        const tileY = Math.floor(worldY / this.app.tileSize);

        if (tileX < 0 || tileX >= this.app.mapSize[0]) return;
        if (tileY < 0 || tileY >= this.app.mapSize[1]) return;

        if (this.app.currentMode == "add") {
            [this.dragStartX, this.dragStartY] = [tileX, tileY];
            this.app.renderer.renderSelection = true;
        }

        if (this.app.currentMode == "pointer")
            this.app.camera.startDrag(this.ctx.mouseX, this.ctx.mouseY);
    }

    wheelPressed() {
        this.app.camera.startDrag(this.ctx.mouseX, this.ctx.mouseY);
    }

    rightPressed() {}

    // -------------------------------------------------------------------------

    leftReleased() {
        if (this.app.currentMode == "add") {
            const worldX =
                (this.ctx.mouseX - this.ctx.width / 2) /
                    this.app.camera.zoom +
                this.app.camera.x;
            const worldY =
                (this.ctx.mouseY - this.ctx.height / 2) /
                    this.app.camera.zoom +
                this.app.camera.y;
            const tileX = Math.floor(worldX / this.app.tileSize);
            const tileY = Math.floor(worldY / this.app.tileSize);

            [this.dragEndX, this.dragEndY] = [tileX, tileY];

            // renderSelection = false;

            this.selectedTiles = itemsOverArea(
                this.dragStartX,
                this.dragStartY,
                tileX,
                tileY
            );
        }

        if (this.app.currentMode == "pointer") this.app.camera.stopDrag();
    }

    wheelReleased() {
        this.app.camera.stopDrag();
    }

    rightReleased() {}
}
