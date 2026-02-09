# AscendQuiz Node.js Backend
Converted from Python to Node.js (Express) keeping same logic.

## Setup
1. Copy `.env.example` to `.env` and fill your API keys.
2. Install dependencies: `npm install`
3. Run dev: `npm run dev` or `npm start`

## API
- POST /api/question
  - form-data: file (pdf) OR JSON body { "document_text": "..." , "question": "..." }
