# api_bridge.py

from flask import Flask, jsonify
import subprocess
import os

# We need to make sure the script is run from the project root
# so that the jin command can find all the project files.
# This is a simple way to ensure that.
if not os.path.exists('Codemap-DNA-tesseract'):
    print("Error: This script must be run from the project's root directory.")
    exit(1)

app = Flask(__name__)

@app.route('/run/<action_id>', methods=['GET'])
def run_action(action_id):
    """
    This endpoint receives an action ID, executes it using the jin command,
    and returns the output.
    """
    print(f"API Bridge: Received request to run action: {action_id}")
    
    # The command to execute. We use `jin` directly, which is available in the PATH
    # thanks to our Nix configuration.
    command = ["jin", "run", action_id]
    
    try:
        # We use subprocess.run to execute the command.
        # `capture_output=True` and `text=True` ensure we get the stdout/stderr as a string.
        result = subprocess.run(
            command,
            capture_output=True,
            text=True,
            check=True # This will raise a CalledProcessError if the command returns a non-zero exit code
        )
        
        print(f"API Bridge: Successfully executed '{action_id}'.")
        # We return the output from the command as a JSON response.
        return jsonify({
            "status": "success",
            "action_id": action_id,
            "output": result.stdout
        })

    except subprocess.CalledProcessError as e:
        # This block runs if the jin command fails for any reason.
        print(f"API Bridge: Error executing '{action_id}'.")
        return jsonify({
            "status": "error",
            "action_id": action_id,
            "output": e.stdout,
            "error": e.stderr
        }), 500
    except FileNotFoundError:
        # This block runs if the `jin` command itself is not found.
        print("API Bridge: Error - 'jin' command not found. Is the environment loaded?")
        return jsonify({
            "status": "error",
            "message": "'jin' command not found. The server environment is not set up correctly."
        }), 500

if __name__ == '__main__':
    # The server will listen on all interfaces (0.0.0.0) so it can be accessed
    # from the Android emulator or other devices on the same network.
    # The port is dynamically assigned by Firebase Studio via the $PORT environment variable.
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=port)
