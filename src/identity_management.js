
// Import the Firebase Admin SDK
const admin = require('firebase-admin');

// Initialize the app (assuming this is done in your main application file)
// admin.initializeApp();

/**
 * Grants a specific role to a user by setting a custom claim.
 * This is the foundation of our role-based access control system.
 *
 * @param {string} uid The user's ID to set the claim for.
 * @param {string} role The role to grant (e.g., 'admin', 'developer', 'advocate').
 */
async function grantRole(uid, role) {
  try {
    const user = await admin.auth().getUser(uid);
    const currentCustomClaims = user.customClaims || {};

    // Add the new role. We can define a hierarchy later.
    const newClaims = {
      ...currentCustomClaims,
      roles: {
        ...(currentCustomClaims.roles || {}),
        [role]: true,
      },
    };

    // Set the custom claims for the user.
    await admin.auth().setCustomUserClaims(uid, newClaims);

    console.log(`Successfully granted role '${role}' to user ${uid}.`);
    
    // You could trigger other actions here, like sending a welcome email for their new role.

  } catch (error) {
    console.error('Error in grantRole:', error);
  }
}

/**
 * Example of how to use the grantRole function.
 * In a real application, you would call this based on some trigger,
 * e.g., a user being verified, or an admin promoting them.
 */
async function exampleUsage(uid) {
  // Example: Promote a user to an 'admin'
  await grantRole(uid, 'admin');

  // Example: Grant a developer role
  await grantRole(uid, 'developer');
}
