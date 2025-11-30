export type FnCtx = { origin: 'PiP' | 'PoP' | 'PeP'; ridEmit: Function };

export const FunctionLibrary = {
  addWidget: (ctx: FnCtx, widgetSpec: { id: string; slot: string }) => {
    ctx.ridEmit({
      type: 'rjinn:addWidget',
      payload: widgetSpec,
      compensatoryId: 'undo:addWidget'
    });
  },
  'undo:addWidget': (ctx: FnCtx, payload: { id: string }) => {
    ctx.ridEmit({
      type: 'rjinn:removeWidget',
      payload,
    });
  }
};

