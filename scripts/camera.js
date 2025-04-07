import { Logger } from "./console.js";

export class Camera2D {
    constructor(app) {
        this.app = app;
        this.logger = new Logger("camera", "#caffbf");
        this.dragging = false;
        this.x = 0;
        this.y = 0;
        this.zoom = 1;
        this.startMouseX = 0;
        this.startMouseY = 0;
        this.startCamX = 0;
        this.startCamY = 0;
    }

    setup(ctx) {
        this.ctx = ctx;
        this.logger.info("Camera created");
    }

    apply() {
        const { ctx, zoom, x, y } = this;
        ctx.translate(-ctx.width / 2, -ctx.height / 2);
        ctx.translate(ctx.width / 2, ctx.height / 2);
        ctx.scale(zoom);
        ctx.translate(-x, -y);
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;

        this.app.renderer.reset();
    }

    setPosition(px, py) {
        [this.x, this.y] = [px, py];

        this.app.renderer.reset();
    }

    zoomAt(px, py, factor) {
        const { width, height } = this.ctx;
        const wx = (px - width / 2) / this.zoom + this.x;
        const wy = (py - height / 2) / this.zoom + this.y;

        this.zoom *= factor;
        this.x = wx - (px - width / 2) / this.zoom;
        this.y = wy - (py - height / 2) / this.zoom;

        this.app.renderer.reset();
    }

    startDrag(mx, my) {
        const { width, height } = this.ctx;

        this.dragging = true;
        this.startMouseX = mx / this.zoom + this.x - width / 2 / this.zoom;
        this.startMouseY = my / this.zoom + this.y - height / 2 / this.zoom;
        this.startCamX = this.x;
        this.startCamY = this.y;

        this.app.renderer.reset();
    }

    stopDrag() {
        this.dragging = false;

        this.app.renderer.reset();
    }

    drag(mx, my) {
        if (!this.dragging) return;

        const worldMouseX =
            mx / this.zoom + this.startCamX - this.ctx.width / 2 / this.zoom;
        const worldMouseY =
            my / this.zoom + this.startCamY - this.ctx.height / 2 / this.zoom;

        this.x = this.startMouseX - worldMouseX + this.startCamX;
        this.y = this.startMouseY - worldMouseY + this.startCamY;

        this.app.renderer.reset();
    }
}
