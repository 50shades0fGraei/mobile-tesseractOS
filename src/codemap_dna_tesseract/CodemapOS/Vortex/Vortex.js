// ==================================================================================
// Tesseract OS - Vortex Component (Data Processing & Event Bus)
//
// The Vortex is the central nervous system of the Tesseract OS. It is a highly
// efficient, asynchronous event bus that allows all other components to
// communicate and react to system events without being tightly coupled.
//
// When a significant event occurs (e.g., a node is created in the Manifold),
// the Vortex is responsible for publishing that event to any subscribed listeners.
// ==================================================================================
// ==================================================================================
export class Vortex {
    // The registry of all listeners, keyed by event type.
    listeners = new Map();
    static instance;
    /**
     * The Vortex is a singleton. This ensures that there is only one event
     * bus for the entire OS, providing a single source of truth for all events.
     */
    static getInstance() {
        if (!Vortex.instance) {
            Vortex.instance = new Vortex();
            console.log("Vortex (Central Event Bus): Singleton instance created.");
        }
        return Vortex.instance;
    }
    constructor() {
        console.log("Vortex: Initialized.");
    }
    /**
     * Subscribes a listener to a specific event type.
     * @param eventType The type of event to listen for.
     * @param listener The callback function to execute when the event is published.
     */
    subscribe(eventType, listener) {
        if (!this.listeners.has(eventType)) {
            this.listeners.set(eventType, []);
        }
        this.listeners.get(eventType).push(listener);
        console.log(`Vortex: A new listener has subscribed to the '${eventType}' event.`);
    }
    /**
     * Publishes an event to all subscribed listeners.
     * @param eventType The type of event to publish.
     * @param payload The data to send with the event.
     */
    publish(eventType, payload) {
        console.log(`Vortex: Publishing event '${eventType}'...`);
        const event = {
            type: eventType,
            payload: payload,
            timestamp: new Date(),
        };
        const eventListeners = this.listeners.get(eventType);
        if (eventListeners) {
            // Notify all listeners for this specific event type.
            eventListeners.forEach(listener => {
                try {
                    listener(event);
                }
                catch (error) {
                    console.error(`Vortex: Error in a listener for event '${eventType}':`, error);
                }
            });
        }
        // Also notify any wildcard listeners.
        const wildcardListeners = this.listeners.get('*');
        if (wildcardListeners) {
            wildcardListeners.forEach(listener => {
                try {
                    listener(event);
                }
                catch (error) {
                    console.error(`Vortex: Error in a wildcard listener for event '${eventType}':`, error);
                }
            });
        }
    }
}
