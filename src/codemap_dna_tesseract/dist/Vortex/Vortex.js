"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vortex = void 0;
class Vortex {
    constructor() {
        this.listeners = [];
    } // Private constructor
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
exports.Vortex = Vortex;
