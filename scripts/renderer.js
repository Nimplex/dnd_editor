import { Logger } from "./console.js";

export class Renderer {
    constructor(app) {
        this.app = app;
        this.logger = new Logger("renderer", "#FF00FF");
        this.renderSelection = false;
    }

    draw(ctx) {
        ctx.background(10, 10, 10);
        ctx.stroke(30, 30, 30);
        ctx.strokeWeight(1);
        ctx.fill("red");

        this.app.camera.apply();

        // Grid cols
        for (let x = 0; x <= this.app.mapSize[0]; x++) {
            ctx.line(x * this.app.tileSize, 0, x * this.app.tileSize, this.app.mapSize[1] * this.app.tileSize);
        }

        // Grid rows
        for (let y = 0; y <= this.app.mapSize[1]; y++) {
            ctx.line(0, y * this.app.tileSize, this.app.mapSize[0] * this.app.tileSize, y * this.app.tileSize);
        }

        if (this.renderSelection) {
            if (ctx.mouseIsPressed) {
                const worldX = (ctx.mouseX - ctx.width / 2) / this.app.camera.zoom + this.app.camera.x;
                const worldY = (ctx.mouseY - ctx.height / 2) / this.app.camera.zoom + this.app.camera.y;
                const tileX = Math.floor(worldX / this.app.tileSize);
                const tileY = Math.floor(worldY / this.app.tileSize);
                [this.app.mouse.dragEndX, this.app.mouse.dragEndY] = [tileX, tileY];
            }
    
            const startX = Math.min(this.app.mouse.dragStartX, this.app.mouse.dragEndX);
            const startY = Math.min(this.app.mouse.dragStartY, this.app.mouse.dragEndY);
            const endX = Math.max(this.app.mouse.dragStartX, this.app.mouse.dragEndX);
            const endY = Math.max(this.app.mouse.dragStartY, this.app.mouse.dragEndY);
            const rectX = startX * this.app.tileSize;
            const rectY = startY * this.app.tileSize;
            const rectWidth = (endX - startX + 1) * this.app.tileSize;
            const rectHeight = (endY - startY + 1) * this.app.tileSize;
    
            ctx.rect(rectX, rectY, rectWidth, rectHeight);
        }
    }
}