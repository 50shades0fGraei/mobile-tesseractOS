// ==================================================================================
// Tesseract OS - Librarian Component
//
// The Librarian is the intelligent, AI-powered core of the Tesseract OS. It now
// orchestrates the ProcessEngine to track the computational cost of its actions.
// ==================================================================================
class FunctionLibrary {
    functions = new Map();
    register(func) {
        this.functions.set(func.id, func);
    }
    get(id) {
        return this.functions.get(id);
    }
}
// ==================================================================================
export class Librarian {
    manifold;
    aegis;
    processEngine;
    library;
    constructor(manifold, aegis, processEngine) {
        this.manifold = manifold;
        this.aegis = aegis;
        this.processEngine = processEngine;
        this.library = new FunctionLibrary();
        console.log("Librarian: Initialized and bound to Aegis and ProcessEngine.");
    }
    // --- AI Orchestration (The Summoning System) ---
    async summon(principalId, functionId, payload) {
        console.log(`Librarian: Received request from principal '${principalId}' to summon '${functionId}'.`);
        if (!this.aegis.canSummon(principalId, functionId)) {
            const errorMsg = `Librarian: Access Denied by Aegis.`;
            console.error(errorMsg);
            // NOTE: We do not log this to the process engine, as it was a failed action.
            throw new Error(errorMsg);
        }
        const func = this.library.get(functionId);
        if (!func) {
            const errorMsg = `Librarian: Function '${functionId}' not found.`;
            console.error(errorMsg);
            throw new Error(errorMsg);
        }
        // **Inform the ProcessEngine to log the efficient execution**
        this.processEngine.executeSummon(functionId);
        try {
            // We pass the core OS components to the handler, giving it context and capability.
            const result = await func.handler({ ...payload, manifold: this.manifold, aegis: this.aegis });
            return result;
        }
        catch (error) {
            console.error(`Librarian: Error during summoning of '${functionId}':`, error);
            throw error;
        }
    }
    // --- Manifold Querying ---
    findNodesByType(dataType) {
        return this.manifold.getAllNodes().filter(node => node.dataType === dataType);
    }
    // --- System Management ---
    registerFunction(func) {
        this.library.register(func);
    }
}
