export class Logger {
    constructor(tag, color) {
        this.tag = tag;
        this.tagColor = `color: ${color}`;
    }

    getTime() {
        return new Date().toISOString();
    }

    log(message, level = "info") {
        const time = this.getTime();

        const styleMap = {
            info: "color: #a0c4ff; font-weight: normal;",
            warn: "color: #fdffb6; font-weight: bold;",
            error: "color: #ffadad; font-weight: bold;",
            verbose: "color: #ffc6ff; font-style: italic;",
        };

        const tagStyle = styleMap[level] || "color: black;";

        console.log(
            `[${time}] %c[${level
                .toUpperCase()
                .padEnd(8)}] %c[${this.tag.padEnd(10)}]%c: ${message}`,
            tagStyle,
            this.tagColor,
            ""
        );
    }

    info(message) {
        this.log(message, "info");
    }

    warn(message) {
        this.log(message, "warn");
    }

    error(message) {
        this.log(message, "error");
    }

    verbose(message) {
        this.log(message, "verbose");
    }
}
