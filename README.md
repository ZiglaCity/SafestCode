# SafestCode

SafestCode is an AI-powered code analysis toolkit built for developers who care about clean, secure, and intelligent code. It's designed with scale in mind — starting as a simple web tool, and evolving into a full-blown collaborative platform for debugging, code review, education, and secure software development.

---

## What is SafestCode?

SafestCode helps developers analyze code by using cutting-edge AI models. Whether you're trying to debug, refactor, understand, or secure your code, SafestCode offers powerful assistance.

Currently, it supports:

- Pasting or writing code into an editor
- Selecting a language and a mode of operation (e.g. Debug, Explain, Optimize)
- Getting instant analysis via Gemini Pro

---

## Live Demo

Available at: [https://safest-code.vercel.app](https://safest-code.vercel.app)

---

## Tech Stack

| Layer            | Tech Stack                                   |
|------------------|----------------------------------------------|
| Frontend         | Vite, React, TypeScript, Tailwind CSS        |
| AI Engine        | Gemini API (Google Generative AI)            |
| Hosting          | Vercel                                        |
| Authentication   | Supabase, Auth.js, or Clerk (Planned)        |
| Backend (Planned)| Node.js, Express, Prisma, PostgreSQL         |
| AI Orchestration | Gemini, OpenAI, DeepSeek (Planned Ensemble)  |

---

## Project Structure

```

SafestCode/
│
├── frontend/       # Vite + React frontend (live on Vercel)
│   └── src/
│
├── backend/        # REST API (to be developed for scaling)
│   └── routes/
│
├── ai-engine/      # Shared AI logic, prompts, and fallback logic
│   └── prompt/
│
└── README.md       # Project overview and vision

````

---

## MVP Features (Current)

- Functional code editor
- Language and mode selection
- Prompt generation using `generatePrompt`
- AI-powered response using Gemini API
- Display of response on the frontend

---

## Upcoming Features

### v1.1
- Integrate Gemini through a secure backend route (via Edge Functions or Express)
- Loading states and improved user feedback
- Better syntax highlighting and language detection

### v1.2
- Store past results in local storage
- Introduce AI fallback system (e.g. OpenAI and DeepSeek)

### v2.0 - Auth and Collaboration
- Add user authentication
- User dashboard to manage history
- Multi-user collaboration via shared sessions or sockets

---

## Long-Term Vision

SafestCode is built to grow beyond a solo tool. Here’s where we’re taking it:

- Full AI-assisted secure code review for teams
- Smart debugging that explains issues and suggests solutions
- Collaborative code review features (multi-user editor, comments, shared sessions)
- VSCode plugin for in-editor analysis
- GitHub app for automated PR reviews
- Learning modules for DSA, clean code, and secure programming
- Enterprise-ready compliance scanning (PCI, GDPR, etc.)

---

## Getting Started (Dev Mode)

To run the frontend locally:

```bash
cd frontend
npm install
npm run dev
````

Make sure to add your `.env` file in `frontend/` with the Gemini API key:

```
VITE_GEMINI_API_KEY=your_api_key_here
```

The backend and AI engine logic will be modularized as the project expands.

---

## Contributing

We're actively building and not yet open to general contributions. Once the foundation is solid, contribution guidelines will be added and issues labeled accordingly.

If you're interested in collaborating, feel free to open a discussion or reach out directly.

---

## License

MIT License.

Attribution is appreciated if you plan to fork, remix, or use parts of this project in something public.

---

## Creator

**Zigla City**
Focused on shipping quality tools, learning in public, and building things that scale.
