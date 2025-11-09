
# api_bridge.py

from flask import Flask, jsonify
import subprocess
import os

# Import the benchmark functions we just created
from traditional_benchmark import run_benchmark as run_traditional_benchmark
from tesseract_benchmark import run_benchmark as run_tesseract_benchmark

# Ensure the script is run from the project root
if not os.path.exists('CodemapAndroidHost'):
    print("Error: This script must be run from the project's root directory.")
    exit(1)

app = Flask(__name__)

@app.route('/run/<action_id>', methods=['GET'])
def run_action(action_id):
    """
    This endpoint receives an action ID, executes it, and returns the output.
    It now includes special handling for the benchmark tests.
    """
    print(f"API Bridge: Received request to run action: {action_id}")

    # --- PROOF OF CONCEPT BENCHMARK DEMO ---
    # Check if the requested action is one of our new benchmark tests.
    if action_id == 'run_standard_benchmark':
        print("API Bridge: Running standard benchmark.")
        result = run_traditional_benchmark()
        return jsonify({
            "status": "success",
            "action_id": action_id,
            "output": result["output"],
            "cpu_time": f'{result["cpu_time"]:.4f}s' # Format for display
        })

    elif action_id == 'run_tesseract_benchmark':
        print("API Bridge: Running Tesseract benchmark.")
        result = run_tesseract_benchmark()
        return jsonify({
            "status": "success",
            "action_id": action_id,
            "output": result["output"],
            "cpu_time": f'{result["cpu_time"]:.4f}s' # Format for display
        })
    # --- END OF POC ---

    # Fallback to the original 'jin run' command for any other action
    command = ["jin", "run", action_id]
    
    try:
        result = subprocess.run(
            command,
            capture_output=True,
            text=True,
            check=True
        )
        
        print(f"API Bridge: Successfully executed '{action_id}'.")
        return jsonify({
            "status": "success",
            "action_id": action_id,
            "output": result.stdout
        })

    except subprocess.CalledProcessError as e:
        print(f"API Bridge: Error executing '{action_id}'.")
        return jsonify({
            "status": "error",
            "action_id": action_id,
            "output": e.stdout,
            "error": e.stderr
        }), 500
    except FileNotFoundError:
        print("API Bridge: Error - 'jin' command not found. Is the environment loaded?")
        return jsonify({
            "status": "error",
            "message": "'jin' command not found. The server environment is not set up correctly."
        }), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=port)
