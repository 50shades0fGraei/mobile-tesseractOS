
import os
import ast

class FunctionVisitor(ast.NodeVisitor):
    """A simple visitor to find function definitions."""
    def __init__(self):
        self.functions = []

    def visit_FunctionDef(self, node):
        self.functions.append(node.name)
        self.generic_visit(node) # continue visiting children

def main():
    """
    Parses this own file to find function definitions using the built-in ast module
    and creates a dummy index file.
    """
    output_file = 'config/processindex.json'

    try:
        # Read the source code of this file
        with open(__file__, 'r') as f:
            source_code = f.read()

        # Parse the source code into an AST
        tree = ast.parse(source_code)

        # Find all function definitions
        visitor = FunctionVisitor()
        visitor.visit(tree)

        # Create the output directory if it doesn't exist
        os.makedirs(os.path.dirname(output_file), exist_ok=True)

        # Write a dummy JSON file demonstrating the functions we found
        with open(output_file, 'w') as f:
            f.write(f'{{"functions_found": {visitor.functions}}}')

        print(f"Successfully created dummy index file at {output_file}")
        print(f"Found functions: {visitor.functions}")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == '__main__':
    main()
