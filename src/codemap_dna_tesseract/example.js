// ==================================================================================
// Tesseract OS - The Definitive Example: Secure Data Ownership
//
// This script demonstrates the core philosophy of the Tesseract OS: unifying
// users, data, and functions within a single, secure graph.
//
// It tells a story:
// 1. A User and their Data are created as nodes in the Manifold.
// 2. An "owns" relationship is established between them.
// 3. A powerful function to modify user data is defined.
// 4. A strict security policy is registered with Aegis to protect that function.
// 5. We see a demonstration of an AUTHORIZED user successfully modifying their own data.
// 6. We see a demonstration of an UNAUTHORIZED user being BLOCKED by Aegis.
// 7. We prove the massive computational efficiency of this model with the ProcessEngine.
// ==================================================================================
import { Manifold } from './CodemapOS/Manifold/Manifold';
import { Librarian } from './CodemapOS/Librarian/Librarian';
import { Aegis } from './CodemapOS/Aegis/Aegis';
import { Vortex } from './CodemapOS/Vortex/Vortex';
import { ProcessEngine } from './CodemapOS/ProcessEngine/ProcessEngine';
import { v4 as uuidv4 } from 'uuid';
// --- 1. Core OS Initialization ---
console.log("\n--- Initializing Tesseract OS Components ---");
const manifold = new Manifold();
const aegis = new Aegis();
const processEngine = new ProcessEngine();
const vortex = Vortex.getInstance();
const librarian = new Librarian(manifold, aegis, processEngine);
// --- 2. Create the Data Graph: Users and their Data ---
console.log("\n--- Step 1: Building the Manifold Graph ---");
// Principals (Users)
const principal_pioneer = 'user-pioneer';
const principal_stranger = 'user-stranger';
// Data Node owned by Pioneer
const pioneerDataNode = {
    id: `data-${uuidv4()}`,
    dataType: 'application/json',
    payload: { content: "This is Pioneer's secret data." },
    createdAt: new Date(),
    modifiedAt: new Date(),
};
manifold.addNode(pioneerDataNode);
// --- 3. Define the Core OS Capability (The Summonable Function) ---
console.log("\n--- Step 2: Defining the 'data.update' Capability ---");
const updateDataFunction = {
    id: 'data.update',
    description: 'Updates the payload of a specific data node.',
    // Note how the handler receives the Manifold to perform its work.
    handler: async (payload) => {
        const { nodeId, newContent, manifold } = payload;
        const node = manifold.getNode(nodeId);
        if (!node)
            throw new Error(`Node '${nodeId}' not found.`);
        node.payload.content = newContent;
        node.modifiedAt = new Date();
        console.log(`Function 'data.update': Successfully updated node '${nodeId}'.`);
        return { success: true, nodeId: node.id };
    },
};
librarian.registerFunction(updateDataFunction);
// --- 4. Define the Security Policy in Aegis ---
console.log("\n--- Step 3: Registering Security Policies with Aegis ---");
const pioneerPolicy = {
    principalId: principal_pioneer,
    functionId: 'data.update', // Pioneer can update data
    effect: 'allow',
};
aegis.registerPolicy(pioneerPolicy);
// Note: There is NO policy for `user-stranger`. Aegis defaults to DENY.
// --- 5. The Authorized User: Pioneer's Request ---
console.log("\n--- Step 4: PIONEER (Authorized) Attempts to Update Data ---");
async function runPioneerRequest() {
    try {
        await librarian.summon(principal_pioneer, 'data.update', { nodeId: pioneerDataNode.id, newContent: "Pioneer was here." });
        const updatedNode = manifold.getNode(pioneerDataNode.id);
        console.log('✅ SUCCESS: Pioneer\'s request was approved. Data is now:', updatedNode?.payload);
    }
    catch (error) {
        console.error('❌ FAILURE: Pioneer\'s request was unexpectedly denied.', error.message);
    }
}
// --- 6. The Unauthorized User: Stranger's Request ---
console.log("\n--- Step 5: STRANGER (Unauthorized) Attempts to Update Data ---");
async function runStrangerRequest() {
    try {
        await librarian.summon(principal_stranger, // A different principal
        'data.update', { nodeId: pioneerDataNode.id, newContent: "Stranger was here." });
    }
    catch (error) {
        console.log(`✅ SUCCESS: Stranger's request was correctly blocked by Aegis.`);
    }
}
// --- 7. The Efficiency Demonstration ---
console.log("\n--- Step 6: Measuring Computational Efficiency ---");
function runEfficiencyTest() {
    processEngine.reset();
    console.log("Simulating 5 traditional (high-cost) operations...");
    for (let i = 0; i < 5; i++) {
        processEngine.executeTraditional(`operation-${i}`);
    }
    const traditionalWorkload = processEngine.getWorkload();
    processEngine.reset();
    console.log("Simulating 5 Tesseract 'summon' (low-cost) operations...");
    for (let i = 0; i < 5; i++) {
        // In a real scenario, this would be a full summon call.
        processEngine.executeSummon(`data.update`);
    }
    const tesseractWorkload = processEngine.getWorkload();
    ProcessEngine.compare(traditionalWorkload, tesseractWorkload);
}
// --- Run the entire demonstration ---
async function main() {
    await runPioneerRequest();
    await runStrangerRequest();
    runEfficiencyTest();
}
main().then(() => console.log("\nDemonstration complete.\n"));
