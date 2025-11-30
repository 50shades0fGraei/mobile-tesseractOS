'use client';
import { useCore } from '@tesseract/core-state';

export function SwitchBar() {
  const { layer, setLayer, harmony } = useCore();
  const tabs: Layer[] = ['PiP', 'PoP', 'PeP'];

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 backdrop-blur-md rounded-full p-2 border border-white/10">
      {tabs.map(t => (
        <button
          key={t}
          onClick={() => setLayer(t)}
          className={`px-4 py-2 rounded-full text-sm transition
          ${layer === t ? 'bg-white/10 text-white' : 'text-gray-300 hover:text-white'}`}
          style={{ boxShadow: `0 0 12px ${harmony.signalColor}80` }}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

