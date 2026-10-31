# ZOVARIQ AI Receptionist — Free Tier Backend (staging only)

This folder contains an **undeployed** Cloudflare Worker for Google Gemini's free-tier API. It does not automatically connect to the public chat demo. Do not advertise live AI until end-to-end tests pass.

## Setup
1. Create a Cloudflare Workers Free account and deploy `worker.js` as a Worker.
2. In Worker settings, add `GEMINI_API_KEY` as an encrypted **secret** obtained from Google AI Studio. Never commit it to GitHub, put it in HTML or send it in chat.
3. Confirm an eligible free-tier Gemini model and configure `GEMINI_MODEL` if the default is unavailable.
4. Test valid chat, unavailable API, abusive volume, malformed requests, mobile UI, privacy and human handover **before** connecting the homepage.
5. Add abuse controls such as Cloudflare WAF/rate limits or Turnstile, strict quotas, and appropriate privacy disclosure before public exposure. CORS/origin checks are **not** authentication or sufficient bot protection. This prototype has no durable per-user rate limiting.
6. Only then update the frontend to use the deployed Worker URL and clearly disclose AI processing by Google. Free-tier Gemini content may be used to improve Google's products; do not submit sensitive personal data.

No visitor messages are stored by this Worker code, but the AI provider processes submitted text and platform logs may exist. Do not claim compliance without review.
