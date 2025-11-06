
import os
import pty
import eventlet
from flask import Flask, send_from_directory, request
from flask_socketio import SocketIO, emit

# We need to monkey-patch the standard library for flask-socketio to work with eventlet
eventlet.monkey_patch()

STATIC_DIR = '.'

app = Flask(__name__, static_folder=STATIC_DIR)
socketio = SocketIO(app)

# A dictionary to store the PTY file descriptor and process ID for each session
sessions = {}

@app.route('/')
def serve_index():
    return send_from_directory(STATIC_DIR, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(STATIC_DIR, path)

@socketio.on('connect')
def handle_connect():
    """A new client has connected."""
    sid = request.sid
    print(f"Client connected: {sid}")

    # Fork a new pseudo-terminal for this session
    pid, fd = pty.fork()

    if pid == 0:  # This is the child process
        # Start a new shell session. This will replace the Python process.
        shell = os.environ.get('SHELL', 'bash')
        os.execv(shell, [shell])
    else:  # This is the parent process
        # Store the process ID and file descriptor for this session
        sessions[sid] = {'pid': pid, 'fd': fd}
        print(f"Started shell for session {sid} with PID {pid}")

        # Start a background task to read output from the PTY
        socketio.start_background_task(target=read_and_forward_pty_output, sid=sid)

    emit('pty-output', {'output': 'Welcome to the interactive Tesseract OS terminal!\r\n'})

@socketio.on('disconnect')
def handle_disconnect():
    """A client has disconnected."""
    sid = request.sid
    print(f"Client disconnected: {sid}")

    if sid in sessions:
        # Terminate the shell process
        os.kill(sessions[sid]['pid'], 15)
        # Close the file descriptor
        os.close(sessions[sid]['fd'])
        # Remove the session from our dictionary
        del sessions[sid]
        print(f"Cleaned up session {sid}")

@socketio.on('pty-input')
def handle_pty_input(data):
    """Handle input from the client's terminal."""
    sid = request.sid
    if sid in sessions:
        # Write the input to the pseudo-terminal of the correct session
        os.write(sessions[sid]['fd'], data['input'].encode())

def read_and_forward_pty_output(sid):
    """Read output from the PTY and forward it to the client."""
    fd = sessions[sid]['fd']
    while True:
        try:
            output = os.read(fd, 1024)
            if output:
                socketio.emit('pty-output', {'output': output.decode()}, room=sid)
            else:
                # PTY has been closed (e.g., user typed 'exit')
                break
        except OSError:
            break

if __name__ == "__main__":
    # Get the port from the environment, defaulting to 8080
    port = int(os.environ.get('PORT', 8080))
    print(f"Starting Tesseract OS server on port {port}...")
    socketio.run(app, host='0.0.0.0', port=port, debug=False)
