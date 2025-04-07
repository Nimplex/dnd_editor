export class Project {
    constructor(app) {
        this.app = app;
        this.size = [100, 100]; // map size
        this.tileSize = 70;
        this.mode = "pointer";
        this.map = [];

        for (let y = 0; y < this.size[0]; y++) {
            this.map[y] = "0"
                .repeat(this.size[1])
                .split("")
                .map((chr) => parseInt(chr));
        }
    }

    load(payload) {
        const data = payload.split(";");
        this.map = JSON.parse(atob(data[0]));
        this.size = [parseInt(data[1]), parseInt(data[2])];
        this.tileSize = parseInt(data[2]);
    }

    save() {
        const payload = `${btoa(JSON.stringify(this.map))};${this.size[0]};${
            this.size[1]
        };${this.tileSize}`;
    }
}
