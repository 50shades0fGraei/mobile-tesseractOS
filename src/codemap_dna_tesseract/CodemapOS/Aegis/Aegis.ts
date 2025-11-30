export class Aegis {
    private principals: Map<string, string[]> = new Map();

    public registerPrincipal(principalId: string, permissions: string[]): void {
        this.principals.set(principalId, permissions);
        console.log(`Aegis: Registered principal '${principalId}' with permissions: ${permissions.join(', ')}`);
    }

    public checkPermission(principalId: string, requiredPermission: string): boolean {
        const permissions = this.principals.get(principalId);
        if (!permissions) {
            console.warn(`Aegis: Principal '${principalId}' not found.`);
            return false;
        }

        // Check for wildcard permission
        if (permissions.includes('*')) {
            return true;
        }

        return permissions.includes(requiredPermission);
    }

    public canSummon(principalId: string, functionId: string): boolean {
        // For now, we'll use the generic checkPermission. 
        // This can be expanded with more specific logic later.
        return this.checkPermission(principalId, functionId);
    }
}
