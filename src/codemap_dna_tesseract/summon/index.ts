import { Vortex, VortexMessage } from '../../Vortex/Vortex.js';

// Get the singleton instance of the Vortex
const vortex = Vortex.getInstance();

// Define the summon function
export const summon = (actionName: string) => {
  console.log(`Summoning action: ${actionName}`);

  // Create a message to send through the Vortex
  const message: VortexMessage = {
    segment: 'user_action',
    strand: actionName,
    traits: {},
    cyclone: 'summon'
  };

  // Send the message
  vortex.sendMessage(message);
};

vortex.addListener((message: VortexMessage) => {
  const { segment, strand, traits, cyclone } = message;

  console.log('Received message in summon/index.ts:', message);
  // Process the message if needed
});
