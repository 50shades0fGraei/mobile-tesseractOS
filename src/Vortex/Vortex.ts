export class Vortex {
  private static instance: Vortex;
  private listeners: Function[] = [];

  private constructor() {} // Private constructor

  public static getInstance(): Vortex {
    if (!Vortex.instance) {
      Vortex.instance = new Vortex();
    }
    return Vortex.instance;
  }

  addListener(listener: Function) {
    this.listeners.push(listener);
  }

  sendMessage(message: VortexMessage) {
    this.listeners.forEach(listener => listener(message));
  }
}

export interface VortexMessage {
  segment: string;
  strand: string;
  traits: any;
  cyclone: any;
}
