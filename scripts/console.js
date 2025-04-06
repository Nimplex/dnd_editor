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
            info: "color: blue; font-weight: normal;",
            warn: "color: orange; font-weight: bold;",
            error: "color: red; font-weight: bold;",
            verbose: "color: gray; font-style: italic;",
        };

        const tagStyle = styleMap[level] || "color: black;";

        console.log(
            `[${time}] %c[${this.tag}] %c[${level.toUpperCase()}]%c: ${message}`,
            this.tagColor,
            tagStyle,
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
