# Scopiq Repository Analysis

I have completed a thorough walkthrough of the **Scopiq** repository. Below is a detailed breakdown of the technical architecture, core components, and implementation patterns.

## 🏗️ Technical Architecture

Scopiq is a high-performance cognitive engine built with **Next.js 15 (App Router)** and **Tailwind CSS**. It follows a clean, modular structure:

- **Frontend**: Focused on "Cinematic UI" using **Framer Motion** and **GSAP** for smooth, premium transitions.
- **Backend API**: Edge-compatible API routes in `src/app/api` for chat and scope management.
- **Cognitive Layer**: Interfaces with **Google Gemini 2.5 Flash** using a custom "Grounded Mode" prompt system.
- **Memory/Store**: Uses a singleton pattern for in-memory scope management and a mock vector store.

---

## 🧠 Core Intelligence: Grounded Mode (RAG)

The standout feature of Scopiq is its **"Grounded Mode"**. This is implemented via:

1.  **System Prompting**: In [route.js](file:///c:/Users/rudra/Desktop/Sco/Scopiq/src/app/api/chat/route.js), the AI is instructed to strictly enforce topic boundaries.
2.  **Scope Management**: [scope-manager.js](file:///c:/Users/rudra/Desktop/Sco/Scopiq/src/lib/scope-manager.js) handles session-specific topic definitions.
3.  **Vector Store Mock**: [vector-store.js](file:///c:/Users/rudra/Desktop/Sco/Scopiq/src/lib/vector-store.js) simulates semantic retrieval using keyword overlap, ensuring queries stay within the defined context.

---

## ✨ Premium UI Components

The frontend is designed to feel like a "High-End intelligence terminal":

- **[NeuralSphere.jsx](file:///c:/Users/rudra/Desktop/Sco/Scopiq/src/components/chat/NeuralSphere.jsx)**: A masterpiece 3D-like neon orb that serves as the empty state for the chat workspace.
- **[ThinkingIndicator.jsx](file:///c:/Users/rudra/Desktop/Sco/Scopiq/src/components/chat/ThinkingIndicator.jsx)**: A custom indicator that pulses with the processing state.
- **[ScopeHUD.jsx](file:///c:/Users/rudra/Desktop/Sco/Scopiq/src/components/chat/ScopeHUD.jsx)**: A sleek HUD element that keeps the user informed of the active "Fenced" topic.

---

## 🚦 Key Routes

- **`/` (Landing)**: Features a cinematic `Hero` section and `ParticleField` background.
- **`/chat` (Workspace)**: The main interaction hub, featuring a sidebar, message list, and the "Protocol Suggestions Dock".

---

## 🛠️ Summary of Findings

| Feature | Implementation |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router) |
| **AI Model** | Gemini 2.5 Flash |
| **Styling** | Tailwind CSS + Vanilla Overrides |
| **Animation** | Framer Motion & GSAP |
| **RAG/Grounded** | System Prompting + In-memory Vector Mock |

Scopiq succeeds in being more than just a "chat wrapper" by providing a deeply immersive, mission-oriented interface for logical reasoning.
