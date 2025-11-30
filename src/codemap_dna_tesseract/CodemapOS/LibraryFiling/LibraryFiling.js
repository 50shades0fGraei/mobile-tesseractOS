export class LibraryFiling {
    fileLegend = new Map();
    processSequences = new Map();
    userSortPreference = 'address';
    // The Manifold is now the conduit for all storage operations.
    manifold;
    // --- Address Generation Properties ---
    programLetterMap = new Map();
    programFunctionCounter = new Map();
    nextLetterCode = 65; // ASCII for 'A'
    constructor(manifold) {
        this.manifold = manifold;
        console.log("LibraryFiling: Initialized and connected to Manifold storage.");
    }
    /**
     * Registers a new function/file, writing its content to the Manifold's storage.
     * @param fileId Unique ID for the file.
     * @param programName The program this function belongs to.
     * @param functionName The name of the function.
     * @param content The actual content (e.g., source code) to be stored.
     */
    registerFile(fileId, programName, functionName, content) {
        if (this.fileLegend.has(fileId)) {
            console.warn(`File with ID '${fileId}' is already registered.`);
            return;
        }
        const address = this.generateAddress(programName);
        // The storage address is a unique key for the Manifold's disk.
        const storageAddress = `file://${programName}/${functionName}`;
        // 1. Write the file content to the physical storage via the Manifold.
        this.manifold.writeToStorage(storageAddress, content);
        // 2. Create a legend entry that points to the storage address.
        this.fileLegend.set(fileId, {
            id: fileId,
            address,
            functionName,
            programName,
            storageAddress, // The legend now stores the physical address.
            lastAccessed: new Date()
        });
        console.log(`LibraryFiling: Registered '${functionName}' at address '${address}'. Content stored at '${storageAddress}'.`);
    }
    /**
     * Retrieves a file's content by reading from the Manifold's storage.
     * @param fileId The unique ID of the file to retrieve.
     */
    getFileContent(fileId) {
        const legendEntry = this.fileLegend.get(fileId);
        if (!legendEntry) {
            console.error(`File with ID '${fileId}' not found.`);
            return null;
        }
        legendEntry.lastAccessed = new Date();
        // Read the file content directly from the physical storage via the Manifold.
        return this.manifold.readFromStorage(legendEntry.storageAddress);
    }
    // ... All other methods (getLibraryView, registerProcessSequence, etc.) remain the same ...
    // They operate on the fileLegend and do not need to change.
    setUserSortPreference(preference) {
        this.userSortPreference = preference;
    }
    getLibraryView(sortBy) {
        const preference = sortBy || this.userSortPreference;
        const allEntries = Array.from(this.fileLegend.values());
        allEntries.sort((a, b) => {
            switch (preference) {
                case 'functionName': return a.functionName.localeCompare(b.functionName);
                case 'lastAccessed': return (b.lastAccessed?.getTime() || 0) - (a.lastAccessed?.getTime() || 0);
                default: return a.address.localeCompare(b.address);
            }
        });
        const groupedView = new Map();
        for (const entry of allEntries) {
            if (!groupedView.has(entry.programName)) {
                groupedView.set(entry.programName, []);
            }
            groupedView.get(entry.programName).push(entry);
        }
        return groupedView;
    }
    registerProcessSequence(processName, programName, sequence) {
        this.processSequences.set(processName, { processName, programName, sequence });
    }
    getProcessSequences() {
        return Array.from(this.processSequences.values()).sort((a, b) => a.programName.localeCompare(b.programName));
    }
    generateAddress(programName) {
        if (!this.programLetterMap.has(programName)) {
            const letter = String.fromCharCode(this.nextLetterCode++);
            this.programLetterMap.set(programName, letter);
            this.programFunctionCounter.set(programName, 0);
        }
        const letter = this.programLetterMap.get(programName);
        const currentCount = this.programFunctionCounter.get(programName);
        const address = `${letter}${currentCount}`;
        this.programFunctionCounter.set(programName, currentCount + 1);
        return address;
    }
}
