// packages/core-state/src/store.ts
import { create } from 'zustand';

type Layer = 'PiP' | 'PoP' | 'PeP';

type Harmony = {
  corruptionLevel: 0 | 1 | 2; // 0 harmony, 1 active flaw, 2 stealth/collapse
  signalColor: '#17BEBB' | '#F28C28' | '#2E004F'; // teal, orange, deep purple
  luminosity: number; // 0..1
  annotation?: string;
};

type Action = {
  id: string;
  origin: Layer;
  type: string;
  payload?: unknown;
  timestamp: number;
  compensatoryId?: string; // points to registered Applicable Undo
};

type Store = {
  layer: Layer;
  harmony: Harmony;
  rid: Action[];
  setLayer: (l: Layer) => void;
  emitAction: (a: Omit<Action, 'id' | 'timestamp'>) => void;
  applyUndo: () => void; // forward correction
};

export const useCore = create<Store>((set, get) => ({
  layer: 'PoP',
  harmony: { corruptionLevel: 0, signalColor: '#17BEBB', luminosity: 0.8 },
  rid: [],
  setLayer: (layer) => set((s) => ({
    layer,
    harmony: {
      ...s.harmony,
      // retune luminosity on layer change for visual feedback
      luminosity: layer === 'PiP' ? 0.9 : layer === 'PoP' ? 0.8 : 0.85,
    }
  })),
  emitAction: (a) => {
    const act: Action = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      origin: get().layer,
      ...a
    };
    set((s) => ({ rid: [act, ...s.rid] }));
  },
  applyUndo: () => {
    const { rid } = get();
    const last = rid.find((r) => r.compensatoryId);
    if (!last) return;
    set((s) => ({ rid: [{ ...last, type: 'applicable-undo' }, ...s.rid] }));
  }
}));
