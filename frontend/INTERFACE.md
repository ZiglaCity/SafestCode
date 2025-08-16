# SafestCode Frontend

This is the frontend application for **SafestCode** — a developer-first AI tool that helps with secure code review, debugging, and refactoring. Built using **Vite**, **React**, **TypeScript**, and **Tailwind CSS**.

Currently deployed on Vercel as a work-in-progress (WIP).  
Live URL: [https://safest-code.vercel.app](https://safest-code.vercel.app)

---

## Overview

This frontend serves as the main interface where users:

- Paste or write code into an editor
- Select language (e.g., JavaScript, Python, TypeScript, etc.)
- Select mode (e.g., Debug, Explain, Optimize)
- Hit "Analyze" and get an AI-generated response using **Gemini Pro**

---

## Features

### Core Working Features

- AI-powered prompt generation
- Code editor with copy, cut, and clear options
- Language and mode dropdowns
- Gemini API integration via `fetch` (no Axios dependency)
- Gemini prompt builder abstracted via `utils/generatePrompt.ts`
- Response output area for displaying Gemini results

### Recently Added (Logic Focus First)

- Copy code to clipboard
- Cut selected code
- Clear editor
- Save current code state
- **[WIP]** Remove comments from code based on language

> Comment stripping is currently in development — handling `//`, `#`, and `/* */` across multiple languages is underway.

---

## Planned UI Enhancements

- Style buttons and toolbars (responsive + keyboard accessible)
- Add icon feedback (e.g., tooltip on copy success)
- Use Monaco Editor or CodeMirror for syntax highlighting
- Add dark/light mode toggle
- Add loading indicators for AI requests
- Improve output display panel (scroll, copy, save output)

---

## Project Setup (Local Dev)

```bash
cd frontend
npm install
npm run dev
```

Create a `.env` file in `/frontend` and add your Gemini API key:

```
VITE_GEMINI_API_KEY=your_api_key_here
```

The app uses `fetch` to call the Gemini API directly. Backend proxy integration is planned for production use.

---

## File Structure (Simplified)

```
frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   │   └── generatePrompt.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

---

## WIP Notes

This repo is under rapid iteration. Current priorities:

- Finalizing comment-removal logic with language support
- Cleaning UI elements before styling
- Preparing for Gemini proxying through a secure API route (Vercel Functions or backend)

---

## License

MIT

---

## Author

**Zigla City**
Learning in public. Building with purpose.
