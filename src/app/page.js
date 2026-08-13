import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#05070d] text-white">
      {/* ========================================================= */}
      {/* BACKGROUND                                                */}
      {/* ========================================================= */}

      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-[-350px] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/[0.10] blur-[150px]" />

        <div className="absolute right-[-250px] top-[500px] h-[500px] w-[500px] rounded-full bg-indigo-600/[0.05] blur-[140px]" />

        <div className="absolute left-[-250px] top-[900px] h-[500px] w-[500px] rounded-full bg-violet-600/[0.04] blur-[140px]" />
      </div>

      {/* ========================================================= */}
      {/* NAVBAR                                                     */}
      {/* ========================================================= */}

      <nav className="relative z-50 mx-auto max-w-7xl px-5 pt-5 sm:px-8">
        <div className="flex h-[72px] items-center justify-between rounded-2xl border border-white/[0.08] bg-[#090c13]/80 px-5 shadow-xl shadow-black/20 backdrop-blur-xl sm:px-7">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="relative flex h-9 w-9 items-center justify-center">
              <div className="absolute inset-0 rounded-xl bg-violet-500/30 blur-md" />

              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10">
                <SparklesIcon className="h-5 w-5 text-violet-400" />
              </div>
            </div>

            <span className="text-lg font-semibold tracking-tight sm:text-xl">
              Summarize<span className="text-violet-400">AI</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm text-zinc-400 transition hover:text-white"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="text-sm text-zinc-400 transition hover:text-white"
            >
              How it works
            </a>

            <a
              href="#pricing"
              className="text-sm text-zinc-400 transition hover:text-white"
            >
              Pricing
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="hidden rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-white/[0.05] hover:text-white sm:block"
            >
              Sign in
            </Link>

            <Link
              href="/signup"
              className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white shadow-[0_0_25px_rgba(124,58,237,0.20)] transition hover:bg-violet-500 hover:shadow-[0_0_30px_rgba(124,58,237,0.35)]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ========================================================= */}
      {/* HERO                                                       */}
      {/* ========================================================= */}

      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-20 pt-24 sm:px-8 sm:pt-32 lg:pb-28">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/[0.06] px-4 py-2 text-xs font-medium text-violet-300">
            <SparklesIcon className="h-4 w-4" />
            AI-powered text summarization
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-zinc-100 sm:text-6xl lg:text-7xl">
            Read less.
            <br />

            <span className="bg-gradient-to-r from-violet-300 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Understand more.
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
            Turn long articles, documents, reports, and notes
            into clear, useful summaries in seconds.
            Choose how you want your summary to sound and let
            AI do the heavy reading.
          </p>

          {/* CTA */}
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="group flex h-13 items-center justify-center gap-2 rounded-xl bg-violet-600 px-7 py-3.5 text-sm font-medium text-white shadow-[0_0_35px_rgba(124,58,237,0.25)] transition hover:bg-violet-500 hover:shadow-[0_0_45px_rgba(124,58,237,0.35)]"
            >
              Get Started — It's Free

              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href="#how-it-works"
              className="flex h-13 items-center justify-center rounded-xl border border-white/[0.10] bg-white/[0.02] px-7 py-3.5 text-sm font-medium text-zinc-300 transition hover:border-white/[0.18] hover:bg-white/[0.05] hover:text-white"
            >
              See how it works
            </a>
          </div>

          <p className="mt-4 text-xs text-zinc-600">
            No credit card required
          </p>
        </div>

        {/* ======================================================= */}
        {/* PRODUCT PREVIEW                                          */}
        {/* ======================================================= */}

        <div className="relative mx-auto mt-20 max-w-5xl">
          <div className="absolute inset-x-20 -top-10 h-40 rounded-full bg-violet-600/[0.10] blur-[80px]" />

          <div className="relative overflow-hidden rounded-2xl border border-white/[0.10] bg-[#090d15]/95 shadow-2xl shadow-black/50">
            {/* Browser top */}
            <div className="flex h-12 items-center border-b border-white/[0.07] bg-white/[0.015] px-4">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
              </div>

              <div className="mx-auto hidden h-7 w-80 items-center justify-center rounded-md border border-white/[0.06] bg-white/[0.02] text-[10px] text-zinc-600 sm:flex">
                summarizeai.app
              </div>
            </div>

            {/* Preview */}
            <div className="grid gap-5 p-5 sm:p-8 lg:grid-cols-[1.05fr_0.95fr]">
              {/* Input */}
              <div className="rounded-xl border border-white/[0.08] bg-[#0c1019] p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-zinc-200">
                      What do you want to summarize?
                    </p>

                    <p className="mt-1 text-xs text-zinc-600">
                      Paste your text below
                    </p>
                  </div>

                  <SparklesIcon className="h-4 w-4 text-violet-400" />
                </div>

                <div className="h-40 rounded-lg border border-violet-500/40 bg-[#080b12] p-4">
                  <p className="text-xs leading-6 text-zinc-500">
                    Artificial intelligence is transforming
                    the way people work. From automating
                    repetitive tasks to helping teams make
                    better decisions...
                  </p>

                  <div className="mt-5 h-1.5 w-3/4 rounded-full bg-white/[0.04]" />
                  <div className="mt-2 h-1.5 w-1/2 rounded-full bg-white/[0.04]" />
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <div className="flex gap-2">
                    <TonePreview active>
                      Human
                    </TonePreview>

                    <TonePreview>
                      Professor
                    </TonePreview>
                  </div>

                  <div className="flex h-9 items-center gap-2 rounded-lg bg-violet-600 px-4 text-xs font-medium text-white">
                    <SparklesIcon className="h-3.5 w-3.5" />
                    Summarize
                  </div>
                </div>
              </div>

              {/* Result */}
              <div className="rounded-xl border border-violet-500/20 bg-[#0c1019] p-5">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10">
                      <FileTextIcon className="h-5 w-5 text-violet-400" />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-zinc-200">
                        The Future of Work
                      </p>

                      <span className="mt-1 inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] text-emerald-300">
                        Human
                      </span>
                    </div>
                  </div>

                  <BookmarkIcon className="h-4 w-4 text-zinc-600" />
                </div>

                <div className="mt-7 space-y-4">
                  <p className="text-sm leading-7 text-zinc-400">
                    AI is changing the future of work by
                    automating repetitive tasks and helping
                    people focus on more meaningful,
                    creative work.
                  </p>

                  <p className="text-sm leading-7 text-zinc-500">
                    Organizations that adopt AI responsibly
                    can improve productivity while creating
                    new opportunities for their teams.
                  </p>
                </div>

                <div className="mt-6 border-t border-white/[0.06] pt-4 text-[10px] text-zinc-600">
                  84 words&nbsp;&nbsp; • &nbsp;&nbsp;2 sentences
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* FEATURES                                                   */}
      {/* ========================================================= */}

      <section
        id="features"
        className="relative z-10 border-y border-white/[0.06] bg-[#070a11]/70"
      >
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium text-violet-400">
              BUILT FOR REAL READING
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">
              Less reading. More thinking.
            </h2>

            <p className="mt-4 text-sm leading-7 text-zinc-500 sm:text-base">
              SummarizeAI gives you the important information
              without forcing you to read every word.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            <FeatureCard
              icon={<SparklesIcon />}
              title="Fast AI summaries"
              description="Turn long content into a concise summary in seconds. Spend your time understanding, not scanning."
            />

            <FeatureCard
              icon={<LayersIcon />}
              title="Choose your tone"
              description="Human, Professor, Architect, or Founder. Get the same information in the style that fits your needs."
            />

            <FeatureCard
              icon={<BookmarkIcon />}
              title="Keep what matters"
              description="Save useful summaries and come back to them whenever you need them."
            />
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* HOW IT WORKS                                               */}
      {/* ========================================================= */}

      <section
        id="how-it-works"
        className="relative z-10 mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32"
      >
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-medium text-violet-400">
              HOW IT WORKS
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">
              From long text to clear understanding.
            </h2>

            <p className="mt-5 text-sm leading-7 text-zinc-500 sm:text-base">
              No complicated setup. Paste your content,
              choose the tone, and let SummarizeAI handle
              the rest.
            </p>

            <Link
              href="/signup"
              className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-violet-400 transition hover:text-violet-300"
            >
              Try it yourself

              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-3">
            <Step
              number="01"
              title="Paste your content"
              description="Drop in an article, report, notes, documentation, or any other text."
            />

            <Step
              number="02"
              title="Choose your tone"
              description="Select the style that matches how you want the information explained."
            />

            <Step
              number="03"
              title="Get your summary"
              description="SummarizeAI turns the content into a concise, readable summary."
            />
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* PRICING                                                     */}
      {/* ========================================================= */}

      <section
        id="pricing"
        className="relative z-10 mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:pb-32"
      >
        <div className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/[0.09] via-[#090d15] to-[#090d15] p-8 sm:p-12 lg:p-16">
          <div className="absolute right-[-150px] top-[-200px] h-[450px] w-[450px] rounded-full bg-violet-600/[0.10] blur-[100px]" />

          <div className="relative mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10">
              <SparklesIcon className="h-6 w-6 text-violet-400" />
            </div>

            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">
              Your next summary is one click away.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-500 sm:text-base">
              Start with 5 free summaries every month.
              No credit card required.
            </p>

            <Link
              href="/signup"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-7 py-3.5 text-sm font-medium text-white shadow-[0_0_35px_rgba(124,58,237,0.25)] transition hover:bg-violet-500 hover:shadow-[0_0_45px_rgba(124,58,237,0.35)]"
            >
              Get Started Free

              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* FOOTER                                                      */}
      {/* ========================================================= */}

      <footer className="relative z-10 border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <SparklesIcon className="h-4 w-4 text-violet-400" />

            <span className="text-sm font-medium text-zinc-300">
              Summarize<span className="text-violet-400">AI</span>
            </span>
          </div>

          <p className="text-xs text-zinc-600">
            © 2026 SummarizeAI. Built for better reading.
          </p>

          <div className="flex gap-5 text-xs text-zinc-600">
            <a
              href="#"
              className="transition hover:text-zinc-300"
            >
              Privacy
            </a>

            <a
              href="#"
              className="transition hover:text-zinc-300"
            >
              Terms
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ========================================================================== */
/* FEATURE CARD                                                               */
/* ========================================================================== */

function FeatureCard({ icon, title, description }) {
  return (
    <div className="group rounded-2xl border border-white/[0.07] bg-[#090d15]/80 p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-500/20 hover:bg-[#0b0f18]">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-500/15 bg-violet-500/[0.08] text-violet-400 transition group-hover:bg-violet-500/[0.12]">
        <div className="h-5 w-5">{icon}</div>
      </div>

      <h3 className="mt-6 text-base font-medium text-zinc-200">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-zinc-500">
        {description}
      </p>
    </div>
  );
}

/* ========================================================================== */
/* STEP                                                                       */
/* ========================================================================== */

function Step({ number, title, description }) {
  return (
    <div className="group flex gap-5 rounded-2xl border border-white/[0.07] bg-[#090d15]/70 p-5 transition hover:border-white/[0.12]">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] text-xs font-medium text-violet-400">
        {number}
      </div>

      <div>
        <h3 className="text-sm font-medium text-zinc-200">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-zinc-500">
          {description}
        </p>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* TONE PREVIEW                                                               */
/* ========================================================================== */

function TonePreview({ children, active = false }) {
  return (
    <div
      className={`rounded-md border px-2.5 py-1 text-[9px] ${
        active
          ? "border-violet-500/30 bg-violet-500/10 text-violet-300"
          : "border-white/[0.07] text-zinc-600"
      }`}
    >
      {children}
    </div>
  );
}

/* ========================================================================== */
/* ICONS                                                                      */
/* ========================================================================== */

function SparklesIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      <path d="M12 3l1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1-4.1-1.4 4.1-1.4L12 3Z" />
      <path d="M19 14l.7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7L19 14Z" />
    </svg>
  );
}

function ArrowRightIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function FileTextIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={className}
    >
      <path d="M6 3h8l4 4v14H6V3Z" />
      <path d="M14 3v5h4M9 12h6M9 16h6" />
    </svg>
  );
}

function BookmarkIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={className}
    >
      <path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-3-6 3V4.5Z" />
    </svg>
  );
}

function LayersIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={className}
    >
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 16 9 5 9-5" />
    </svg>
  );
}