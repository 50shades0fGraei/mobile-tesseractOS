# tesseract_os_examples/user_management.py

# This program is designed to be summoned by the Tesseract OS.
# Its functions operate directly on the shared_data_store.

import json

def get_user_name(data_store, user_id):
    """Retrieves a user's name from the data store."""
    user = data_store.get('users', {}).get(user_id)
    if user:
        print(f"  -> RETRIEVED: {user['name']}")
        return user['name']
    else:
        print(f"  -> INFO: User '{user_id}' not found.")
        return None

def add_contact(data_store, user_id, contact_id):
    """Adds a contact to a user's contact list in the data store."""
    users = data_store.get('users', {})
    if user_id in users and contact_id in users:
        users[user_id]['contacts'][contact_id] = True
        print(f"  -> MODIFIED: Added '{contact_id}' to '{user_id}\'s contacts.")
    else:
        print(f"  -> INFO: User '{user_id}' or '{contact_id}' not found.")

def remove_contact(data_store, user_id, contact_id):
    """Removes a contact from a user's contact list in the data store."""
    users = data_store.get('users', {})
    if user_id in users and contact_id in users[user_id]['contacts']:
        del users[user_id]['contacts'][contact_id]
        print(f"  -> MODIFIED: Removed '{contact_id}' from '{user_id}\'s contacts.")
    else:
        print(f"  -> INFO: Contact '{contact_id}' not found for user '{user_id}'.")
