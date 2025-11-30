type Listener = (...args: any[]) => void;

export class Vortex {
    private static instance: Vortex;
    private listeners: { [key: string]: Listener[] } = {};

    private constructor() { }

    public static getInstance(): Vortex {
        if (!Vortex.instance) {
            Vortex.instance = new Vortex();
        }
        return Vortex.instance;
    }

    public on(event: string, listener: Listener): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(listener);
    }

    public emit(event: string, ...args: any[]): void {
        if (this.listeners[event]) {
            this.listeners[event].forEach(listener => listener(...args));
        }
    }
}
