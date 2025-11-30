# Codemap DNA Tesseract Indexer

## Overview

The Codemap DNA Tesseract Indexer is a tool that scans the project'''s codebase to identify and catalog every function definition. It creates a `processindex.json` file, which serves as a master index of all functions, their locations, and their programming languages. This index is a foundational component of the Codemap Tesseract system, enabling it to understand and navigate the project'''s structure.

## How it Works

The indexer is now implemented as a reusable `Indexer` class in the `personal_library.py` module. It operates in the following steps:

1.  **Initialization:** The `Indexer` class is initialized with the root directory of the project to be scanned.
2.  **File Discovery:** It recursively scans the project directory to find all source code files with recognized extensions (e.g., `.py`, `.ts`, `.go`).
3.  **Code Parsing:** For each discovered file, it uses the `tree-sitter` library to parse the code into an Abstract Syntax Tree (AST).
4.  **Function Extraction:** It queries the AST to identify all function declarations/definitions.
5.  **Index Generation:** It compiles a list of all found functions and assigns each one a unique numerical "address."
6.  **Output:** The final index is returned as a dictionary and can be written to a file.

## Supported Languages

The indexer currently supports the following languages:

*   Python (`.py`)
*   TypeScript (`.ts`)
*   Go (`.go`)

## Usage

### Running the Indexer

To run the indexer and generate a fresh `processindex.json` file, execute the following command from the root of the project:

```bash
python src/codemap_dna_tesseract/indexer/main.py
```

### Using the Indexer as a Library

The `Indexer` class can be imported and used in other Python scripts. This is useful for integrating the indexing functionality into other tools or workflows.

**Example:**

```python
from personal_library import Indexer

project_root = "/path/to/your/project"
indexer = Indexer(project_root)
process_index = indexer.generate_index()

# You can now use the process_index dictionary
print(process_index)

# Or write it to a file
indexer.write_index_to_file("my_index.json")
```

## Configuration

The `Indexer` class can be configured to support new languages or modify how it finds functions. This is done by passing a `language_config` dictionary to the constructor.

Each entry in the dictionary consists of:

*   **`language`**: The name of the tree-sitter language parser to use.
*   **`query`**: A tree-sitter query string that specifies how to find function nodes in the AST.

**Example:**

```python
from personal_library import Indexer

custom_config = {
    ".js": {
        "language": "javascript",
        "query": '''
        (function_declaration
          name: (identifier) @function.name)
        '''
    }
}

project_root = "/path/to/your/project"
indexer = Indexer(project_root, language_config=custom_config)
process_index = indexer.generate_index()
indexer.write_index_to_file("my_js_index.json")
```

## Output Format

The output file, `config/processindex.json`, is a JSON object where each key is a string representation of a floating-point number (the "address") and the value is an object containing information about the function at that address.

**Example `processindex.json` entry:**

```json
{
  "0.0001": {
    "name": "find_code_files",
    "file": "src/codemap_dna_tesseract/indexer/main.py",
    "language": "python"
  },
  "0.0002": {
    "name": "parse_functions_from_file",
    "file": "src/codemap_dna_tesseract/indexer/main.py",
    "language": "python"
  }
}
```
