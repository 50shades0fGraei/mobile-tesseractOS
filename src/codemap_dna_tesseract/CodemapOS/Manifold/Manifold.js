// ==================================================================================
// Tesseract OS - Manifold Component
//
// The Manifold is the core data topology engine. It now integrates with the
// Vortex to publish events when the data graph is modified.
// ==================================================================================
import { Vortex } from "../Vortex/Vortex";
// ==================================================================================
export class Manifold {
    // --- Core Graph Storage ---
    nodes = new Map();
    adjacency = new Map();
    vortex;
    // --- Active Context ---
    activeContextNodeId = null;
    constructor() {
        this.vortex = Vortex.getInstance();
        console.log("Manifold: Core graph initialized and connected to Vortex.");
    }
    // --- Context Management ---
    setActiveContext(nodeId) {
        if (!this.nodes.has(nodeId)) {
            console.error(`Manifold: Cannot set active context. Node '${nodeId}' not found.`);
            return false;
        }
        this.activeContextNodeId = nodeId;
        console.log(`Manifold: Active context set to node '${nodeId}'.`);
        return true;
    }
    // --- Graph API ---
    addNode(node) {
        if (this.nodes.has(node.id)) {
            console.warn(`Manifold: Node with ID '${node.id}' already exists.`);
            return false;
        }
        this.nodes.set(node.id, node);
        this.adjacency.set(node.id, []);
        console.log(`Manifold: Created node '${node.id}' of type '${node.dataType}'.`);
        // ** Publish an event to the Vortex **
        this.vortex.publish('manifold.node.created', { nodeId: node.id, dataType: node.dataType });
        return true;
    }
    addEdge(edge) {
        if (!this.nodes.has(edge.sourceNodeId) || !this.nodes.has(edge.targetNodeId)) {
            console.error(`Manifold: Cannot create edge. Source or target node does not exist.`);
            return false;
        }
        this.adjacency.get(edge.sourceNodeId).push(edge);
        console.log(`Manifold: Created edge from '${edge.sourceNodeId}' to '${edge.targetNodeId}' with relation '${edge.relation}'.`);
        // ** Publish an event to the Vortex **
        this.vortex.publish('manifold.edge.created', { edgeId: edge.id, source: edge.sourceNodeId, target: edge.targetNodeId });
        return true;
    }
    getNode(id) {
        return this.nodes.get(id);
    }
    getAllNodes() {
        return Array.from(this.nodes.values());
    }
    getOutgoingEdges(nodeId) {
        return this.adjacency.get(nodeId) || [];
    }
    // --- Input Processing & Graph Interaction ---
    simulateKeyPress(key) {
        if (!this.activeContextNodeId) {
            console.warn("Manifold: Key press ignored. No active context is set.");
            return;
        }
        const contextNode = this.getNode(this.activeContextNodeId);
        if (contextNode) {
            if (typeof contextNode.payload === 'string') {
                contextNode.payload += key;
                contextNode.modifiedAt = new Date();
            }
            else {
                console.error(`Manifold: Cannot append key. The active context node's payload is not a string.`);
            }
        }
    }
}
