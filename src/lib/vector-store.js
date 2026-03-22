/**
 * In-memory Vector Store for Scopiq
 * 
 * Concept:
 * - Stores vectors with metadata including scope_id.
 * - Simulates embedding-based retrieval using simple cosine similarity (mocked).
 * - Uses Global Singleton to persist across Next.js hot reloads.
 */

// Singleton Helper for Next.js
const globalForVectors = global;
if (!globalForVectors.vectorStoreInstance) {
    globalForVectors.vectorStoreInstance = {};
}

class VectorStore {
    constructor() {
        // Storage structure: { scope_id: [ { id, text, metadata, embedding? } ] }
        this.store = globalForVectors.vectorStoreInstance;
    }

    /**
     * Add documents to the store
     * @param {string} scope_id 
     * @param {Array<{text: string, metadata: object}>} documents 
     */
    async addDocuments(scope_id, documents) {
        if (!this.store[scope_id]) {
            this.store[scope_id] = [];
        }

        const processedDocs = documents.map((doc, index) => ({
            id: `${scope_id}_${Date.now()}_${index}`,
            text: doc.text,
            metadata: { ...doc.metadata, scope_id },
        }));

        this.store[scope_id].push(...processedDocs);
        console.log(`[VectorStore] Added ${processedDocs.length} docs to scope ${scope_id}`);
        return processedDocs;
    }

    /**
     * Search within a specific scope
     * @param {string} scope_id 
     * @param {string} query 
     * @param {number} topK 
     */
    async search(scope_id, query, topK = 3) {
        const scopeDocs = this.store[scope_id] || [];
        if (scopeDocs.length === 0) return [];

        // Simple similarity scoring based on keyword overlap (Mock implementation of Vector Search)
        const queryTerms = query.toLowerCase().split(/\s+/);

        const results = scopeDocs.map(doc => {
            const text = doc.text.toLowerCase();
            let score = 0;
            queryTerms.forEach(term => {
                if (text.includes(term)) score += 1;
            });
            return { ...doc, score };
        });

        // Sort by score descending
        results.sort((a, b) => b.score - a.score);

        // Filter out zero matches to simulate "threshold"
        const relevantResults = results.filter(r => r.score > 0);

        return relevantResults.slice(0, topK);
    }

    /**
     * Clear a scope
     */
    clearScope(scope_id) {
        delete this.store[scope_id];
    }
}

// Singleton instance
const vectorStore = new VectorStore();
export default vectorStore;
