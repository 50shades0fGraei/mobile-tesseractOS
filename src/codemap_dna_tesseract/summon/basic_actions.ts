import { Librarian, SummonableFunction } from '../CodemapOS/Librarian/Librarian.js';

const helloWorldFunction: SummonableFunction = {
    id: 'hello_world',
    description: 'A simple test function that returns a greeting.',
    handler: async (payload: any) => {
        console.log('Handler for hello_world called with payload:', payload);
        return { message: 'Hello, world from the Librarian!' };
    }
};

export function register(librarian: Librarian): void {
    librarian.registerFunction(helloWorldFunction);
    console.log(`Registered function: ${helloWorldFunction.id}`);
}
