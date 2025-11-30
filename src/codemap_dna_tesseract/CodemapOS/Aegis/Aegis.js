// ==================================================================================
// Tesseract OS - Aegis Component (Security & Protection)
//
// Aegis is the security and permissions layer of the Tesseract OS. It is the
// single source of truth for determining who is allowed to do what.
// It manages access control for the Librarian's `summon` command and provides
// other security services like network quarantine.
// ==================================================================================
// ==================================================================================
export class Aegis {
    // --- Access Control Store ---
    // A simple list of policies. In a real system, this would be a more
    // sophisticated, indexed, and persistent data structure.
    policies = [];
    // --- Network Quarantine (Existing Feature) ---
    isQuarantineActive = false;
    quarantinedSources = new Map();
    constructor() {
        console.log("Aegis (Security & Protection): Initialized.");
    }
    // --- Core Permission-Checking Method ---
    /**
     * Checks if a given principal is authorized to summon a specific function.
     * Policies are checked in order. The first matching policy determines the outcome.
     * Default is to deny if no policy matches.
     * @param principalId The ID of the user or service making the request.
     * @param functionId The ID of the function they are trying to summon.
     * @returns True if the action is permitted, false otherwise.
     */
    canSummon(principalId, functionId) {
        console.log(`Aegis: Checking if principal '${principalId}' can summon '${functionId}'...`);
        // Find the first policy that matches both the principal and the function.
        const policy = this.policies.find(p => (p.principalId === principalId || p.principalId === '*') && // Wildcard for any principal
            (p.functionId === functionId || p.functionId === '*') // Wildcard for any function
        );
        if (policy) {
            const result = policy.effect === 'allow';
            console.log(`Aegis: Policy found. Effect: ${policy.effect.toUpperCase()}. Permission granted: ${result}`);
            return result;
        }
        // Default deny: If no specific policy is found, deny access.
        console.log("Aegis: No matching policy found. Defaulting to DENY.");
        return false;
    }
    /**
     * Adds a new access control policy to the system.
     * @param policy The policy to add.
     */
    registerPolicy(policy) {
        this.policies.push(policy);
        console.log(`Aegis: Registered new policy for principal '${policy.principalId}' on function '${policy.functionId}' with effect '${policy.effect}'.`);
    }
    // --- Network Quarantine Methods (retasked for simplicity) ---
    activateQuarantine(source) {
        this.isQuarantineActive = true;
        console.log(`Aegis: Network Quarantine ACTIVATED. Source: ${source}`);
    }
    deactivateQuarantine() {
        this.isQuarantineActive = false;
        console.log("Aegis: Network Quarantine DEACTIVATED.");
    }
}
