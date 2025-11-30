export class Vortex {
    static instance;
    listeners = [];
    constructor() { } // Private constructor
    static getInstance() {
        if (!Vortex.instance) {
            Vortex.instance = new Vortex();
        }
        return Vortex.instance;
    }
    addListener(listener) {
        this.listeners.push(listener);
    }
    sendMessage(message) {
        this.listeners.forEach(listener => listener(message));
    }
}
