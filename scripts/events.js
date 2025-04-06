export class EventDispatcher {
    constructor() {
        this.listeners = new Map();
    }

    getEvent(eventName) {
        if (!this.listeners.get(eventName)) this.listeners.set(eventName, []);

        return this.listeners.get(eventName);
    }

    on(eventName, handler) {
        return this.getEvent(eventName).push(handler);
    }

    dispatch(eventName, ...data) {
        for (const handler of this.getEvent(eventName)) handler(...data);
    }
}
