import { Logger } from "./console.js";

export class Renderer {
    constructor(app) {
        this.app = app;
        this.logger = new Logger("renderer", "#ffadad");
        this.renderSelection = false;
    }

    draw(ctx) {
        ctx.background(10, 10, 10);
        ctx.stroke(30, 30, 30);
        ctx.strokeWeight(1);
        ctx.fill("red");

        this.app.camera.apply();

        // Grid cols
        for (let x = 0; x <= this.app.project.size[0]; x++) {
            ctx.line(
                x * this.app.project.tileSize,
                0,
                x * this.app.project.tileSize,
                this.app.project.size[1] * this.app.project.tileSize
            );
        }

        // Grid rows
        for (let y = 0; y <= this.app.project.size[1]; y++) {
            ctx.line(
                0,
                y * this.app.project.tileSize,
                this.app.project.size[0] * this.app.project.tileSize,
                y * this.app.project.tileSize
            );
        }

        if (this.renderSelection) {
            this.logger.verbose(`Rendering selection: x1=${this.app.mouse.dragStartX}, y1=${this.app.mouse.dragStartY}, x2=${this.app.mouse.dragEndX}, y2=${this.app.mouse.dragEndY}`);
            const startX = Math.min(
                this.app.mouse.dragStartX,
                this.app.mouse.dragEndX
            );
            const startY = Math.min(
                this.app.mouse.dragStartY,
                this.app.mouse.dragEndY
            );
            const endX = Math.max(
                this.app.mouse.dragStartX,
                this.app.mouse.dragEndX
            );
            const endY = Math.max(
                this.app.mouse.dragStartY,
                this.app.mouse.dragEndY
            );

            const rectX = startX * this.app.project.tileSize;
            const rectY = startY * this.app.project.tileSize;
            const rectWidth = (endX - startX + 1) * this.app.project.tileSize;
            const rectHeight = (endY - startY + 1) * this.app.project.tileSize;

            ctx.rect(rectX, rectY, rectWidth, rectHeight);
        }
    }
}
