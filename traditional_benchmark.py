
import time

def run_benchmark():
    """
    This function simulates a traditional, inefficient data processing task.
    It performs a CPU-intensive calculation to serve as a baseline for comparison.
    """
    start_time = time.process_time()
    
    # Simulate a complex, unoptimized calculation.
    # We'll calculate a large number of Fibonacci numbers recursively.
    # This is notoriously inefficient and will consume significant CPU time.
    result = 0
    for i in range(30):
        result += fibonacci(i)

    end_time = time.process_time()
    
    return {
        "output": f"Traditional benchmark calculated result: {result}",
        "cpu_time": end_time - start_time
    }

def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)

if __name__ == "__main__":
    benchmark_result = run_benchmark()
    print(benchmark_result)
