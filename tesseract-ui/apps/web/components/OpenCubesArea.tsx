'use client';
import { useState } from 'react';
import { useCore } from '@tesseract/core-state';

export function OpenCubesArea() {
  const [open, setOpen] = useState(false);
  const { rid } = useCore();

  return (
    <>
      <button
        className="fixed top-4 right-4 h-10 w-10 grid place-items-center rounded-md bg-white/10 text-white border border-white/10"
        onClick={() => setOpen(!open)}
      >
        ■
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm p-8">
          <div className="grid grid-cols-3 gap-6">
            {rid.slice(0, 9).map((entry) => (
              <div key={entry.id} className="aspect-square rounded-lg border border-white/20 p-3 text-white/80">
                <div className="text-xs">{entry.type}</div>
                <div className="text-[11px] opacity-70">{new Date(entry.timestamp).toLocaleTimeString()}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

