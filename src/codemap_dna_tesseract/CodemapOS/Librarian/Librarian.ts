
import { Manifold, ManifoldNode } from '../Manifold/Manifold.js';
import { Aegis } from '../Aegis/Aegis.js';
import { ProcessEngine } from '../ProcessEngine/ProcessEngine.js';

// --- Core Summoning & Library Interfaces ---

export interface SummonableFunction {
    id: string;
    description: string;
    handler: (payload: any) => Promise<any>;
}

// ==================================================================================

export class Librarian {
    private manifold: Manifold;
    private aegis: Aegis;
    private processEngine: ProcessEngine;
    private functions: Map<string, SummonableFunction> = new Map();

    constructor(manifold: Manifold, aegis: Aegis, processEngine: ProcessEngine) {
        this.manifold = manifold;
        this.aegis = aegis;
        this.processEngine = processEngine;
        console.log("Librarian: Initialized and bound to Aegis and ProcessEngine.");
    }

    // --- AI Orchestration (The Summoning System) ---

    public async summon(principalId: string, functionId: string, payload: any): Promise<any> {
        console.log(`Librarian: Received request from principal '${principalId}' to summon '${functionId}'.`);
        
        if (!this.aegis.canSummon(principalId, functionId)) {
            const errorMsg = `Librarian: Access Denied by Aegis.`;
            console.error(errorMsg);
            throw new Error(errorMsg);
        }

        const func = this.functions.get(functionId);
        if (!func) {
            const errorMsg = `Librarian: Function '${functionId}' not found.`;
            console.error(errorMsg);
            throw new Error(errorMsg);
        }

        this.processEngine.executeSummon(functionId);

        try {
            const result = await func.handler({ ...payload, manifold: this.manifold, aegis: this.aegis });
            return result;
        } catch (error) {
            console.error(`Librarian: Error during summoning of '${functionId}':`, error);
            throw error;
        }
    }

    public findNodesByType(dataType: string): ManifoldNode[] {
        return this.manifold.getAllNodes().filter((node: ManifoldNode) => node.dataType === dataType);
    }

    public registerFunction(func: SummonableFunction): void {
        this.functions.set(func.id, func);
    }
}
