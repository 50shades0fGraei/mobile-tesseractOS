
import os
from library import Indexer

if __name__ == "__main__":
    # We start from the parent directory of this script to scan the whole project
    project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    index_output_file = os.path.join(project_root, "config/processindex.json")

    # Initialize and run the indexer
    indexer = Indexer(project_root)
    process_index = indexer.generate_index()
    indexer.write_index_to_file(index_output_file)
