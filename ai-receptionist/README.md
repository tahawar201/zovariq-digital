# ZOVARIQ AI Receptionist — Free Tier Backend (staging only)

This folder contains an **undeployed** Cloudflare Worker for Google Gemini's free-tier API. It does not automatically connect to the public chat demo. Do not advertise live AI until end-to-end tests pass.

## Setup
1. Create a Cloudflare Workers Free account and deploy `worker.js` as a Worker.
2. In Worker settings, add `GEMINI_API_KEY` as an encrypted **secret** obtained from Google AI Studio. Add `TURNSTILE_SECRET_KEY` as a separate encrypted secret and configure a Cloudflare Turnstile site key for the approved website. Every chat POST must include a freshly issued `turnstileToken`; the Worker verifies it server-side before calling Gemini. Never commit it to GitHub, put it in HTML or send it in chat.
3. Confirm an eligible free-tier Gemini model and configure `GEMINI_MODEL` if the default is unavailable.
4. The current public guided-demo frontend does **not** send Turnstile tokens or connect to the Worker. Build and test a consent-aware frontend integration, including a fresh Turnstile challenge for each AI request, before switching on live AI. Test valid chat, unavailable API, abusive volume, malformed requests, mobile UI, privacy and human handover **before** connecting the homepage.
5. Turnstile is required in the backend, but it is not a substitute for IP-aware rate limits, WAF protections, quotas and privacy disclosure before public exposure. CORS/origin checks are **not** authentication or sufficient bot protection. This prototype has no durable per-user rate limiting.
6. Only then update the frontend to use the deployed Worker URL and clearly disclose AI processing by Google. Free-tier Gemini content may be used to improve Google's products; do not submit sensitive personal data.

No visitor messages are stored by this Worker code, but the AI provider processes submitted text and platform logs may exist. Do not claim compliance without review.

## Free-tier launch checklist

- [x] Backend prototype with server-side Gemini key and Turnstile token validation
- [x] Reject wrong-origin requests and invalid chat message order
- [ ] User creates/connects Cloudflare account and Turnstile widget (site key + secret)
- [ ] User creates Gemini API key in Google AI Studio with eligible free-tier model
- [ ] Deploy Worker and supply its public URL (not any secret) for frontend integration
- [ ] Implement explicit consent and privacy update before sending text to Gemini
- [ ] Add effective per-client rate limits and usage monitoring; set an operational stop condition
- [ ] Verify end-to-end responses, mobile, lead handover and fallback before launch

**Security note:** The site key is public, but the Turnstile secret and Gemini API key must only be entered in the Cloudflare dashboard. Never share secrets in GitHub or chat. Public live AI remains disabled until checks pass.
