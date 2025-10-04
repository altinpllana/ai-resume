# Resume Builder

A minimalist resume builder with a Vue 3 + Vite frontend and a lightweight Express API that leverages OpenAI for content improvements.

## Features
- Real-time two-column resume preview with six minimalist templates plus custom text, heading, and divider colors.
- Repeatable experience and education entries, skill tag rendering, and optional target job description.
- AI-assisted improvements for summary, experience bullet points, and skill suggestions.
- Local JSON save/load plus download/upload support.
- Light/Dark theme toggle with persistence and print-friendly layout for PDF export.

## Setup

```bash
# root
cd resume-builder
npm install
npm run dev  # runs Vite and the Express server together

# server (for environment configuration or standalone use)
cd server
cp ../.env.example .env
# edit .env to add OPENAI_API_KEY
npm install
npm run dev
```

## Environment Variables
Create a `.env` file inside `server/` with:

```
OPENAI_API_KEY=your_key_here
```

The server will return a helpful error if the key is missing.

## Scripts
- `npm run dev`: Starts Vite and the Express API concurrently.
- `npm run build`: Builds the Vue application for production.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Type-checks the project with `vue-tsc`.

Within `server/`:
- `npm run dev`: Starts the API with hot reload (`ts-node-dev`).
- `npm run build`: Builds the server to JavaScript.
- `npm start`: Runs the built server.

## Printing to PDF
Use the **Print / Export PDF** button to open the browser print dialog. Choose “Save as PDF” for an A4-friendly export. Controls are hidden and layout is optimized during printing.

## Rate Limiting
The `/api/generate` endpoint uses a simple in-memory limiter allowing up to 30 requests per hour per IP.

