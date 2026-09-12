# Summarize AI

A full-stack AI-powered app that turns long text into a short, tone-matched summary. Paste an article, transcript, or notes, pick a tone (Human, Professor, Architect, or Founder), and get back a clean, structured summary you can save for later. Free accounts get 5 summaries a month; Pro accounts get unlimited.

**Live app:** https://live-app-url.com

## Tech Stack
**Frontend:** Next.js, Context API, Tailwind CSS, Axios
**Backend:** Next.js API routes, MongoDB (Mongoose)
**Auth:** JWT, bcrypt
**Payments:** Stripe (Checkout + Webhooks)
**AI:** Groq API (openai/gpt-oss-20b)

## Features
- Signup/login with hashed passwords and JWT-based sessions
- AI summarization with four selectable tones
- Prompt-level guardrails against the model being used as a general chatbot — tested against adversarial inputs (disguised questions, prompt injection) with 5/5 correctly refused
- Free tier (5 summaries/month, resets automatically) and unlimited Pro tier via Stripe subscription
- Save, browse, and delete summaries, all scoped and ownership-checked per user
- Public landing page (SSG) and a live usage-stats page (ISR, revalidates every 60s)

## Architecture Decisions

**Groq instead of Gemini or OpenAI directly.**
Originally built against Google's Gemini API, but new-account free-tier access was unexpectedly restricted (a 0-quota limit across multiple models, confirmed via testing and Google's own developer forums). Pivoted to Groq, which offers a genuinely accessible free tier with no billing card required. Diagnosed this by testing multiple model names directly against the API rather than assuming the code was at fault — a useful reminder that "my code is broken" and "the platform changed" aren't the same failure mode.

**Model swap from `llama-3.1-8b-instant` to `openai/gpt-oss-20b`.**
The original model occasionally failed to follow the app's guardrail instructions — one adversarial test case (an injected instruction appended to real content) was only partially handled. Swapping to `gpt-oss-20b`, a larger and more instruction-tuned model, resolved this: the same 5-test adversarial suite passed 5/5 afterward, with no regression on legitimate summarization requests.

**JWT stored in localStorage, not an httpOnly cookie.**
httpOnly cookies are more resistant to XSS-based token theft, but require cookie-based CORS handling, CSRF protection, and middleware changes. For this project's scope, localStorage was a deliberate tradeoff. In a production app with sensitive data, I'd use httpOnly cookies with CSRF protection instead.

**`/api/auth/me` instead of caching user data client-side.**
Only the JWT persists in localStorage. On load, the app fetches the current user's full state (including plan and usage count) from the server, rather than trusting a stale client-side copy.

**Stripe webhook as the single source of truth for plan upgrades — never the checkout redirect.**
The browser redirect after checkout is UX-only; a user could visit the success URL directly without ever paying. The actual plan upgrade only happens inside a signature-verified webhook handler, confirming the event genuinely came from Stripe before touching the database.

**Usage limits tracked with a lazy reset, not a scheduled job.**
Each user has a `summarizeCount` and `periodStart`. On each summarize request, the app checks whether 30 days have passed since `periodStart` and resets the count in-line if so — avoiding the need for a cron job or scheduled task for a portfolio-scale app.

## Known Limitations
- Free-tier usage limit resets on a rolling 30-day window per user, not a fixed calendar month
- No Stripe subscription management (cancel, downgrade, or plan changes) — only the initial Free-to-Pro upgrade
- No automated tests; all testing was done manually via Thunder Client and browser testing
- Groq's free-tier models, while much improved after the model swap, are not guaranteed to be as reliable as a paid GPT-4/Claude-class model at strictly following meta-instructions

## Run Locally

\`\`\`bash
npm install
# create a .env.local file and copy the contents of .env.local.template into it, filling in your own values
npm run dev
\`\`\`