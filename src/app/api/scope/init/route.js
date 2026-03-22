import { NextResponse } from 'next/server';
import scopeManager from '@/lib/scope-manager';
import vectorStore from '@/lib/vector-store';
import FirecrawlApp from '@mendable/firecrawl-js';

export async function POST(req) {
    try {
        const { description, documents, exclusions } = await req.json();

        if (!description && (!documents || documents.length === 0)) {
            return NextResponse.json({ error: 'Description or documents required' }, { status: 400 });
        }

        // 1. Create Scope
        // We pass exclusions to scope manager for the strict validator
        const scopeId = scopeManager.createScope({
            description,
            exclusions
        });

        const FIRECRAWL_API_KEY = process.env.Firecrawl_API_KEY;

        // 2. Process and Store Documents
        if (documents && documents.length > 0) {
            const chunks = [];

            // Iterate through provided "documents" (could be text or URLs)
            for (let i = 0; i < documents.length; i++) {
                let docContent = typeof documents[i] === 'string' ? documents[i] : documents[i].text;
                let source = `doc_${i}`;

                // --- FIRECRAWL INTEGRATION ---
                // Simple URL detection
                const isUrl = /^(http|https):\/\/[^ "]+$/.test(docContent.trim());

                if (isUrl && FIRECRAWL_API_KEY) {
                    try {
                        console.log(`[ScopeInit] 🕷️ Detected URL: ${docContent}. Initiating Firecrawl...`);
                        const app = new FirecrawlApp({ apiKey: FIRECRAWL_API_KEY });

                        // Scrape URL
                        const scrapeResult = await app.scrapeUrl(docContent, {
                            formats: ['markdown'],
                            // Optional: pageOptions: { onlyMainContent: true } 
                        });

                        if (scrapeResult.success) {
                            console.log(`[ScopeInit] ✅ Firecrawl Success for ${docContent}`);
                            // Replace URL with scraped content for vector storage
                            docContent = scrapeResult.markdown;
                            source = `url_${docContent.substring(0, 30)}...`; // Track source
                        } else {
                            console.warn(`[ScopeInit] ⚠️ Firecrawl Failed: ${scrapeResult.error}`);
                            // Fallback: We store the URL itself or error? 
                            // Let's store a placeholder error so RAG knows it failed.
                            docContent = `[SYSTEM ERROR] Failed to retrieve content from URL: ${docContent}. Error: ${scrapeResult.error}`;
                        }
                    } catch (fcErr) {
                        console.error(`[ScopeInit] ❌ Firecrawl Exception:`, fcErr);
                        docContent = `[SYSTEM ERROR] Firecrawl Exception for URL: ${docContent}`;
                    }
                }

                // Chunking (Mock)
                const rawChunks = docContent.match(/.{1,500}/g) || [docContent];

                rawChunks.forEach((chunkText, chunkIndex) => {
                    chunks.push({
                        text: chunkText,
                        metadata: {
                            source: source,
                            chunkIndex
                        }
                    });
                });
            }

            await vectorStore.addDocuments(scopeId, chunks);
        }

        return NextResponse.json({
            scopeId,
            message: 'Scope initialized successfully',
            stats: {
                documentCount: documents ? documents.length : 0
            }
        });

    } catch (error) {
        console.error('Scope init error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
