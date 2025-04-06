import { Logger } from "./console.js";

export class Renderer {
    constructor(app) {
        this.app = app;
        this.logger = new Logger("renderer", "#ffadad");
        this.renderSelection = false;
    }

    setup(ctx) {
        this.ctx = ctx;
        this.wallTexture = ctx.loadImage("assets/wall.png");
    }

    draw(ctx) {
        ctx.background(10, 10, 10);
        ctx.stroke(30, 30, 30);
        ctx.strokeWeight(1);
        ctx.fill("red");

        const { map, size, tileSize } = this.app.project;

        this.app.camera.apply();

        // Grid cols
        for (let x = 0; x <= size[0]; x++) {
            ctx.line(x * tileSize, 0, x * tileSize, size[1] * tileSize);
        }

        // Grid rows
        for (let y = 0; y <= size[1]; y++) {
            ctx.line(0, y * tileSize, size[0] * tileSize, y * tileSize);
        }

        for (const [y, row] of Object.entries(map)) {
            for (const [x, col] of Object.entries(row)) {
                if (col == "wall")
                    ctx.image(
                        this.wallTexture,
                        x * tileSize,
                        y * tileSize,
                        tileSize,
                        tileSize
                    );
            }
        }

        if (this.renderSelection) {
            this.logger.verbose(
                `Rendering selection: x1=${this.app.mouse.dragStartX}, y1=${this.app.mouse.dragStartY}, x2=${this.app.mouse.dragEndX}, y2=${this.app.mouse.dragEndY}`
            );
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
