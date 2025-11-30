// packages/core-state/src/store.ts
import { create } from 'zustand';
export const useCore = create((set, get) => ({
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
        const act = {
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
        if (!last)
            return;
        set((s) => ({ rid: [{ ...last, type: 'applicable-undo' }, ...s.rid] }));
    }
}));
