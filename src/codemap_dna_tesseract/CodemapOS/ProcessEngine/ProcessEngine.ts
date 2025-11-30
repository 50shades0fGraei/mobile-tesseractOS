
// ==================================================================================
// Tesseract OS - ProcessEngine (Simulated Hardware Layer)
//
// The ProcessEngine is a simulated hardware component designed to measure and
// demonstrate the computational efficiency of the Tesseract OS architecture.
//
// It tracks a "workload" metric to contrast the high cost of traditional,
// interpretive execution with the low cost of the Tesseract's pre-compiled,
// `summon`-based execution model.
// ==================================================================================

/**
 * Represents a simulated CPU that can track computational workload.
 */
export class ProcessEngine {

    private workload: number = 0;

    // --- Constants for Simulation ---
    // These represent the abstract "cost" of different execution models.
    public static readonly TRADITIONAL_EXECUTION_COST = 10;
    public static readonly SUMMON_EXECUTION_COST = 2; // Represents an ~80% reduction for this example

    constructor() {
        console.log("ProcessEngine (Simulated Hardware): Initialized.");
    }

    /**
     * Simulates executing a command using a traditional, high-cost model.
     * @param operationName The name of the operation for logging purposes.
     */
    public executeTraditional(operationName: string): void {
        console.log(`ProcessEngine: Executing '${operationName}' (Traditional Model)...`);
        this.workload += ProcessEngine.TRADITIONAL_EXECUTION_COST;
        console.log(` -> Cost: ${ProcessEngine.TRADITIONAL_EXECUTION_COST}. Current Workload: ${this.workload}`);
    }

    /**
     * Simulates executing a command using the optimized, low-cost `summon` model.
     * @param functionId The ID of the summoned function for logging purposes.
     */
    public executeSummon(functionId: string): void {
        console.log(`ProcessEngine: Executing '${functionId}' (Tesseract 'Summon' Model)...`);
        this.workload += ProcessEngine.SUMMON_EXECUTION_COST;
        console.log(` -> Cost: ${ProcessEngine.SUMMON_EXECUTION_COST}. Current Workload: ${this.workload}`);

    }

    /**
     * Retrieves the current total workload accumulated by the engine.
     */
    public getWorkload(): number {
        return this.workload;
    }

    /**
     * Resets the workload counter to zero for a new simulation.
     */
    public reset(): void {
        console.log("ProcessEngine: Workload reset.");
        this.workload = 0;
    }

    /**
     * A utility to compare two workloads and calculate the efficiency gain.
     * @param traditionalWorkload The total cost from the traditional model.
     * @param tesseractWorkload The total cost from the Tesseract model.
     */
    public static compare(traditionalWorkload: number, tesseractWorkload: number): void {
        console.log("\n--- Efficiency Comparison ---");
        console.log(`Traditional Model Workload: ${traditionalWorkload}`);
        console.log(`Tesseract Model Workload:   ${tesseractWorkload}`);

        if (traditionalWorkload > 0) {
            const reduction = ((traditionalWorkload - tesseractWorkload) / traditionalWorkload) * 100;
            console.log(`Efficiency Gain: ${reduction.toFixed(2)}% reduction in computational cost.`);
        }
        console.log("---------------------------\n");
    }
}
