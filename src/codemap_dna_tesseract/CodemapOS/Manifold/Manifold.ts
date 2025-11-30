import { Vortex } from '../Vortex/Vortex.js';

export interface ManifoldNode {
    id: string;
    dataType: string;
    payload: any;
    createdAt: Date;
    modifiedAt: Date;
}

export interface ManifoldEdge {
    id: string;
    sourceNodeId: string;
    targetNodeId: string;
    relationshipType: string;
    createdAt: Date;
}

export class Manifold {
    private nodes: Map<string, ManifoldNode> = new Map();
    private edges: Map<string, ManifoldEdge> = new Map();
    private vortex: Vortex;

    constructor() {
        this.vortex = Vortex.getInstance();
        // In a real implementation, we might load from a persistent store here.
    }

    addNode(node: ManifoldNode): void {
        this.nodes.set(node.id, node);
        this.vortex.emit('nodeAdded', node);
    }

    getNode(nodeId: string): ManifoldNode | undefined {
        return this.nodes.get(nodeId);
    }

    getAllNodes(): ManifoldNode[] {
        return Array.from(this.nodes.values());
    }

    addEdge(edge: ManifoldEdge): void {
        if (!this.nodes.has(edge.sourceNodeId) || !this.nodes.has(edge.targetNodeId)) {
            throw new Error('Cannot create an edge between non-existent nodes.');
        }
        this.edges.set(edge.id, edge);
        this.vortex.emit('edgeAdded', edge);
    }

    getEdge(edgeId: string): ManifoldEdge | undefined {
        return this.edges.get(edgeId);
    }

    findEdges(sourceNodeId: string, relationshipType: string): ManifoldEdge[] {
        const results: ManifoldEdge[] = [];
        for (const edge of this.edges.values()) {
            if (edge.sourceNodeId === sourceNodeId && edge.relationshipType === relationshipType) {
                results.push(edge);
            }
        }
        return results;
    }
}
