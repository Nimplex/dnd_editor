export class Camera2D {
    constructor(app) {
        this.app = app;

        this.x = 0;
        this.y = 0;
        this.zoom = 1;
        this.dragging = false;

        this.startMouseX = 0;
        this.startMouseY = 0;
        this.startCamX = 0;
        this.startCamY = 0;
    }

    setup(ctx) {
        this.ctx = ctx;
    }

    apply() {
        this.ctx.translate(-this.ctx.width / 2, -this.ctx.height / 2);
        this.ctx.translate(this.ctx.width / 2, this.ctx.height / 2);
        this.ctx.scale(this.zoom);
        this.ctx.translate(-this.x, -this.y);
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    setPosition(px, py) {
        this.x = px;
        this.y = py;
    }

    zoomAt(px, py, factor) {
        const wx = (px - this.ctx.width / 2) / this.zoom + this.x;
        const wy = (py - this.ctx.height / 2) / this.zoom + this.y;

        this.zoom *= factor;
        this.x = wx - (px - this.ctx.width / 2) / this.zoom;
        this.y = wy - (py - this.ctx.height / 2) / this.zoom;
    }

    startDrag(mx, my) {
        this.dragging = true;

        this.startMouseX = mx / this.zoom + this.x - this.ctx.width / 2 / this.zoom;
        this.startMouseY = my / this.zoom + this.y - this.ctx.height / 2 / this.zoom;

        this.startCamX = this.x;
        this.startCamY = this.y;
    }

    stopDrag() {
        this.dragging = false;
    }

    drag(mx, my) {
        if (!this.dragging) return;

        const worldMouseX =
            mx / this.zoom + this.startCamX - this.ctx.width / 2 / this.zoom;
        const worldMouseY =
            my / this.zoom + this.startCamY - this.ctx.height / 2 / this.zoom;

        this.x = this.startMouseX - worldMouseX + this.startCamX;
        this.y = this.startMouseY - worldMouseY + this.startCamY;
    }
}
