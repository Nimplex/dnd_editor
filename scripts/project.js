export class Project {
    constructor(app) {
        this.app = app;
        this.size = [100, 100];  // map size
        this.tileSize = 70;
        this.mode = "pointer";
        this.map = [];
    }

    load() {
        for (let y = 0; y < this.size[0]; y++) {
            this.map[y] = "0".repeat(this.size[1]).split("").map(chr => parseInt(chr));
        }

        this.app.logger.info("Map has loaded");
    }
}