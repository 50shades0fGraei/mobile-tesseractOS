export const FunctionLibrary = {
    addWidget: (ctx, widgetSpec) => {
        ctx.ridEmit({
            type: 'rjinn:addWidget',
            payload: widgetSpec,
            compensatoryId: 'undo:addWidget'
        });
    },
    'undo:addWidget': (ctx, payload) => {
        ctx.ridEmit({
            type: 'rjinn:removeWidget',
            payload,
        });
    }
};
