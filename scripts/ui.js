export class UIHandler {
    constructor(app) {
        this.app = app;

        this.setActiveMode = this.setActiveMode.bind(this);
    }

    setActiveMode({ target }) {
        document
            .querySelectorAll(".mode-icon")
            .forEach((icon) => icon.classList.remove("active"));

        this.app.currentMode = target.dataset.mode;
        target.classList.add("active");
    }

    setup() {
        this.leftContainerText = document.getElementById("left-container-text");

        document
            .querySelectorAll(".mode-icon")
            .forEach((icon) => icon.addEventListener("click", this.setActiveMode));
    }

    update(ctx) {
        if (!this.leftContainerText)
            return console.warn("leftContainerText doesn't exist");

        const worldX = (ctx.mouseX - ctx.width / 2) / this.app.camera.zoom + this.app.camera.x;
        const worldY = (ctx.mouseY - ctx.height / 2) / this.app.camera.zoom + this.app.camera.y;
        const tileX = Math.floor(worldX / this.app.tileSize);
        const tileY = Math.floor(worldY / this.app.tileSize);

        this.leftContainerText.innerHTML = `x = ${tileX} <span style="margin: 0 6px; color:rgb(83, 83, 83)">|</span> y = ${tileY}`;
    }
}