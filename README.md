# **SafestCode**

SafestCode is an AI-powered code analysis toolkit for developers who want clean, secure, and maintainable code. It provides instant debugging, refactoring, security insights, and explanations across multiple languages.

---

## **Live Demo**

[https://safest-code.vercel.app](https://safest-code.vercel.app)

---

## **About**

SafestCode analyzes code using advanced AI models and returns structured, actionable feedback. It supports multiple modes such as debugging, explanation, optimization, and security scanning.

Designed to grow from a simple web tool into a scalable platform for AI-assisted development.

---

## **Screenshots**
<img width="1845" height="840" alt="image" src="https://github.com/user-attachments/assets/fb3ccb7c-ba54-40c3-8230-7ff647e43dab" />
<img width="1855" height="915" alt="image" src="https://github.com/user-attachments/assets/f4fca4f6-9986-420d-b44a-b1fdd22dd2f7" />

---

## **Tech Stack**

| Layer             | Technologies                                |
| ----------------- | ------------------------------------------- |
| Frontend          | React, TypeScript, Vite, Tailwind CSS       |
| AI Engine         | Gemini API                                  |
| Hosting           | Vercel                                      |
| Authentication    | Planned (Supabase / Auth.js / Clerk)        |
| Backend (Planned) | Node.js, Express, Prisma, PostgreSQL        |
| AI Orchestration  | Gemini, OpenAI, DeepSeek (Planned Ensemble) |

---

## **Current Features (MVP)**

* Code editor with syntax highlighting
* Multi-language support (JS, TS, Python)
* Analysis modes (debug, explain, optimize, secure)
* Clean and consistent prompt generation
* AI-powered response parsing
* Error handling, loading states, and improved feedback

---

## **Project Structure**

```
SafestCode/
│
├── frontend/           # React frontend (live on Vercel)
│   └── src/
│
├── backend/           # Upcoming backend for secure AI routing
│   └── routes/
│
├── ai-engine/        # Shared prompts, parsing, and fallback logic (future)
│   └── prompt/
│
└── README.md
```

---

## **Roadmap**

### **v1.1**

* Secure backend routing for Gemini
* Improved syntax highlighting
* Enhanced UI feedback and loading states

### **v1.2**

* Local storage for analysis history
* AI fallback system (OpenAI, DeepSeek)

### **v2.0** — Collaboration & Auth

* User accounts
* Dashboard and history tracking
* Real-time shared sessions

### **Long-Term**

* VSCode extension
* GitHub PR review bot
* Enterprise-grade security scanning
* AI-assisted learning modules (DSA, clean code, secure coding)

---

## **Local Development**

Run the frontend:

```bash
cd frontend
npm install
npm run dev
```

Add your `.env`:

```
VITE_GEMINI_API_KEY=your_api_key_here
```

Backend and AI engine modules will be integrated as the platform scales.

---

## **Contributing**

Contributions will open once the core is stable.
For now, discussions and suggestions are welcome.

---

## **License**

MIT License.
Attribution appreciated when using or extending the project.

---

## **Creator**

**Zigla City**
Building tools that scale with clarity, intention, and precision.
