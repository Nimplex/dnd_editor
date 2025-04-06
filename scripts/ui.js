import { Logger } from "./console.js";

export class UIHandler {
    constructor(app) {
        this.app = app;
        this.logger = new Logger("ui", "#ffd6a5");

        this.setActiveMode = this.setActiveMode.bind(this);
    }

    setActiveMode({ target }) {
        document
            .querySelectorAll(".mode-icon")
            .forEach((icon) => icon.classList.remove("active"));

        this.app.project.mode = target.dataset.mode;
        target.classList.add("active");
    }

    setup() {
        this.logger.info("UI handler created");

        this.leftContainerText = document.getElementById("left-container-text");

        document
            .querySelectorAll(".mode-icon")
            .forEach((icon) =>
                icon.addEventListener("click", this.setActiveMode)
            );
    }

    update() {
        if (!this.leftContainerText)
            return console.warn("leftContainerText doesn't exist");

        const [tileX, tileY] = this.app.mouse.tile;

        this.leftContainerText.innerHTML = `x = ${tileX} <span style="margin: 0 6px; color:rgb(83, 83, 83)">|</span> y = ${tileY}`;
    }
}
