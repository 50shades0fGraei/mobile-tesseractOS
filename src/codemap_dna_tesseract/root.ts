
// Copyright ©️ Randall Lujan, Emurica co GRAEI integrations

import { Manifold } from './CodemapOS/Manifold/Manifold.js';
import { Aegis } from './CodemapOS/Aegis/Aegis.js';
import { ProcessEngine } from './CodemapOS/ProcessEngine/ProcessEngine.js';
import { Librarian } from './CodemapOS/Librarian/Librarian.js';
import { LibraryFiling } from './CodemapOS/LibraryFiling/LibraryFiling.js';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function initializeAndRun() {
    console.log("Starting CodemapOS Initialization...");

    // 1. Initialize Core Components
    const manifold = new Manifold();
    const aegis = new Aegis();
    const processEngine = new ProcessEngine();

    // 2. Initialize the Librarian
    const librarian = new Librarian(manifold, aegis, processEngine);

    // 3. Initialize the Library Filing and Register Functions
    const libraryFiling = new LibraryFiling(librarian);
    const summonDirectory = path.join(__dirname, 'summon');
    await libraryFiling.registerFunctionsFromDirectory(summonDirectory);

    // 4. Create a root principal for initial operations
    const rootPrincipalId = "codemap-os-root";
    aegis.registerPrincipal(rootPrincipalId, ["*"]); // Grant root all permissions for now

    console.log("CodemapOS Initialized. Ready to Summon.");

    // 5. Example Summon:
    try {
        console.log("Attempting to summon 'hello_world' for root principal...");
        const result = await librarian.summon(rootPrincipalId, "hello_world", { test: "payload" });
        console.log("Summon successful. Result:", result);
    } catch (error) {
        if (error instanceof Error) {
            console.error("Summoning failed:", error.message);
        } else {
            console.error("An unknown error occurred during summoning.");
        }
    }
}

initializeAndRun();
