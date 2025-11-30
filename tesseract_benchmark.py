
import time
from src.codemap_dna_tesseract.codemap_tesseract import CodemapTesseract

def run_benchmark():
    """
    This function leverages the Tesseract architecture to perform a complex task.
    It creates and invokes a chain of Tesseract entities, demonstrating the
    efficiency of direct function invocation via the Codemap.
    """
    start_time = time.process_time()

    # Simulate a complex, multi-step process using the Tesseract model.
    # We create a chain of Tesseracts and invoke their actions.
    # The dictionary lookup method is designed to be far more efficient
    # than traditional script interpretation or recursive calls.
    tesseract_chain = [CodemapTesseract(generation=i) for i in range(30)]
    
    for tesseract in tesseract_chain:
        tesseract.invoke()

    end_time = time.process_time()
    
    return {
        "output": f"Tesseract benchmark invoked {len(tesseract_chain)} entities.",
        "cpu_time": end_time - start_time
    }

if __name__ == "__main__":
    benchmark_result = run_benchmark()
    print(benchmark_result)
