import { Librarian } from '../Librarian/Librarian.js';
import * as fs from 'fs/promises';
import * as path from 'path';
import { pathToFileURL } from 'url';

export class LibraryFiling {
    private librarian: Librarian;

    constructor(librarian: Librarian) {
        this.librarian = librarian;
    }

    public async registerFunctionsFromDirectory(directoryPath: string): Promise<void> {
        console.log(`LibraryFiling: Attempting to register functions from '${directoryPath}'`);
        try {
            const absolutePath = path.resolve(directoryPath);
            
            // Check if directory exists
            try {
                await fs.access(absolutePath);
            } catch (e) {
                console.warn(`LibraryFiling: Directory not found at '${absolutePath}', skipping registration.`);
                return;
            }

            const files = await fs.readdir(absolutePath);

            for (const file of files) {
                if (file.endsWith('.js')) {
                    try {
                        const filePath = path.join(absolutePath, file);
                        const fileUrl = pathToFileURL(filePath).href;
                        const functionModule = await import(fileUrl);
                        
                        if (functionModule && typeof functionModule.register === 'function') {
                            functionModule.register(this.librarian);
                            console.log(`LibraryFiling: Successfully registered functions from ${file}`);
                        } else {
                            // This is a warning, not an error, because some .js files in the directory may not be function modules.
                            // console.warn(`LibraryFiling: No 'register' function exported from ${file}.`);
                        }
                    } catch (error) {
                        console.error(`LibraryFiling: Error importing or registering module ${file}:`, error);
                    }
                }
            }
        } catch (error) {
            console.error(`LibraryFiling: A critical error occurred while registering functions from '${directoryPath}':`, error);
        }
    }
}
