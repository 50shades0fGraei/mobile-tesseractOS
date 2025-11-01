export class Vortex {
  addListener(callback: (message: any) => void) {}
}

export interface VortexMessage {
  segment: any;
  strand: any;
  traits: any;
  cyclone: any;
}
