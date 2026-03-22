import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import scopeManager from '@/lib/scope-manager';
import vectorStore from '@/lib/vector-store';

export async function POST(req) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "API Key is missing" }, { status: 500 });
        }

        let body;
        try {
            body = await req.json();
        } catch (e) {
            return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
        }

        const { message, scope_id, topic, mode, history } = body;

        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        // ---------------------------------------------------------
        // 2. ANSWER MODE SELECTION & SCOPE ENFORCEMENT
        // ---------------------------------------------------------
        const activeMode = mode || 'rag';
        const genAI = new GoogleGenerativeAI(apiKey);

        // --- SCOPIQ COGNITIVE IDENTITY ---
        let systemPrompt = `
You are SCOPIQ, a High-Fidelity Cognitive Engine engineered for extreme precision in data synthesis and logical reasoning. 
Your identity is centered around objective clarity, technical depth, and high-performance information retrieval.

## Operational Modes:
1. **Grounded Mode (RAG):** strictly limits responses to the provided scope.
2. **Cognitive Mode (General Reasoning):** general intelligence for complex problem-solving.

## Core Directives:
- **Resonance:** Your responses must resonate with the purpose of the current mode.
- **Precision:** Use technically accurate terminology.
- **Clarity:** Ensure every transmission is structural, utilizing Markdown for clear hierarchy.
- **Objective:** You are an analytical tool. Maintain a neutral, professional, and efficient tone.

Always refer to yourself as SCOPIQ.
`;

        // Enforcement: If in Grounded Mode, strictly fence the AI's knowledge.
        if (activeMode === 'rag' && topic && topic !== 'UNDEFINED' && topic !== 'global context') {
            systemPrompt += `
\n\n### CRITICAL GROUNDED MODE DIRECTIVE ###
The user has explicitly activated Grounded Mode (RAG) for the specific topic: "${topic}".
YOU MUST STRICTLY DECLINE TO ANSWER ANY QUERY THAT IS NOT DIRECTLY RELATED TO "${topic}".
If the user asks about a subject outside of "${topic}", you MUST NOT answer the question. Instead, respond with a professional error, formatted like this:
"### Scope Violation Detected\n\nThis query is strictly outside the defined scope boundaries of **${topic}**. Please return to the active topic."
Do NOT provide the answer to out-of-scope questions, no matter how simple or factual they are (for example: if scope is 'IPL' and user asks 'Who is Sunil Chhetri', you must reject). Your primary directive is absolute boundary enforcement.
`;
        }

        const finalPrompt = message;

        // ---------------------------------------------------------
        // 3. GENERATION
        // ---------------------------------------------------------
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: {
                role: "system",
                parts: [{ text: systemPrompt }]
            }
        });

        // Format history
        let cleanHistory = (history || [])
            .map((msg) => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.content || "" }]
            }));

        if (cleanHistory.length > 0 && cleanHistory[0].role === 'model') {
            cleanHistory.shift();
        }

        const chat = model.startChat({
            history: cleanHistory,
        });

        const result = await chat.sendMessage(finalPrompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ response: text });

    } catch (error) {
        console.error("❌ Chat API Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}