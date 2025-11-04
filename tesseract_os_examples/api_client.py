# tesseract_os_examples/api_client.py

# This program demonstrates a function with an external dependency (requests).
# It is designed to be summoned by the Tesseract OS.

import json
import requests # This dependency is provided by the Nix environment via requirements.txt

def fetch_and_store_data(data_store, url):
    """Fetches data from a URL and stores a piece of it."""
    print(f"  -> TRAIT: Accessing network via requests library.")
    try:
        response = requests.get(url)
        response.raise_for_status() # Raises an exception for bad status codes
        remote_data = response.json()
        
        # For this example, let's assume the API returns a list and we store the first item's title.
        if remote_data and isinstance(remote_data, list) and 'title' in remote_data[0]:
            retrieved_title = remote_data[0]['title']
            # Create a new key in the data store for our remote data
            data_store['last_fetched_title'] = retrieved_title
            print(f"  -> MODIFIED: Stored title '{retrieved_title}' in data store.")
        else:
            print(f"  -> INFO: Remote data format not as expected.")

    except requests.exceptions.RequestException as e:
        print(f"  -> FAILED: Could not fetch data: {e}")
