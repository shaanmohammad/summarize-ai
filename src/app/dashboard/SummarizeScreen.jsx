import { AuthContext } from "@/context/AuthContext";
import axiosApi from "@/utils/axios";
import {
  SparklesIcon,
  UserIcon,
  GraduationIcon,
  BuildingIcon,
  RocketIcon,
  FileTextIcon,
  BookmarkIcon,
  CopyIcon,
  SpinnerIcon,
  ErrorIcon,
} from "@/utils/common";
import { useContext, useState } from "react";

const MAX_CHARACTERS = 10000;
const tones = [
  {
    id: "Human",
    description: "Natural & conversational",
    color: "violet",
    icon: UserIcon,
  },
  {
    id: "Professor",
    description: "Academic & detailed",
    color: "purple",
    icon: GraduationIcon,
  },
  {
    id: "Architect",
    description: "Structured & technical",
    color: "blue",
    icon: BuildingIcon,
  },
  {
    id: "Founder",
    description: "Strategic & concise",
    color: "orange",
    icon: RocketIcon,
  },
];


const SummarizeScreen = ({ setSavedSummaries }) => {
  const [text, setText] = useState("");
  const [selectedTone, setSelectedTone] = useState("Human");
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(false);
  const { refreshUser } = useContext(AuthContext);
  const characterCount = text.length;

  const handleSummarize = async () => {
    if (!text.trim()) {
      return;
    }

    setIsSummarizing(true);
    setError(false);

    try {
      const response = await axiosApi.post("/summarize", {
        text,
        tone: selectedTone,
      });
      await refreshUser();
      setSummary({
        ...response.data,
        tone: selectedTone,
      });
    } catch (error) {
        setError(error.response?.data?.message || "Something went wrong. Please try again."); 
    }
    setIsSummarizing(false);
    setIsSaved(false);
  };

  const handleSave = async () => {
    if (isSaved) {
      return;
    }

    const newSummary = {
      title: summary.title,
      summary: summary.summary,
      tone: summary.tone,
    };

    try {
        const response = await axiosApi.post('/summaries', newSummary)
        setSavedSummaries((prev) => {
            const createdSummary = {
                ...response.data.data,
                icon: tones.find((tone) => tone.id === response.data.tone)?.icon || FileTextIcon,
            };
            console.log(createdSummary);
            return [createdSummary, ...prev];
        })
        setIsSaved(true);
    } catch (error) {
        
    }

    setIsSaved(true);
  };

  return (
    <>
      <section className="rounded-2xl border border-white/[0.08] bg-[#090d15]/90 p-6 shadow-xl shadow-black/20 sm:p-8 lg:p-10">
        {/* Header */}
        <div className="mb-7 flex items-start justify-between gap-5">
          <div>
            <h1 className="text-2xl font-medium tracking-tight text-zinc-100 sm:text-[26px]">
              What do you want to summarize?
            </h1>

            <p className="mt-2 text-sm text-zinc-400 sm:text-base">
              Paste your text and get an AI-powered summary in seconds.
            </p>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-violet-500/10 bg-violet-500/[0.025] px-4 py-2 text-xs text-violet-300 sm:flex">
            <SparklesIcon className="h-4 w-4" />
            AI Powered
          </div>
        </div>

        {/* Textarea */}
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, MAX_CHARACTERS))}
            placeholder={`Paste your text here...\n\nArticles, documents, notes, reports... anything!`}
            className="h-[275px] w-full resize-none rounded-xl border border-violet-500 bg-[#0b0f18] px-5 py-5 text-base leading-8 text-zinc-200 outline-none placeholder:text-zinc-500 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/[0.08] sm:h-[275px] sm:px-6 sm:text-lg"
          />

          <div className="absolute bottom-4 right-5 text-xs text-zinc-500">
            {characterCount.toLocaleString()} /{" "}
            {MAX_CHARACTERS.toLocaleString()}
          </div>
        </div>
        {error && (
          <div className="mt-2 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
            <div className="mt-0.5 shrink-0">
              <ErrorIcon className="h-5 w-5 text-red-400" />
            </div>

            <p className="text-sm leading-5 text-red-300">{error}</p>
          </div>
        )}
        {/* Bottom controls */}
        <div className="mt-4 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          {/* Tones */}
          <div>
            <p className="mb-3 text-base font-medium text-zinc-200">
              Choose a tone
            </p>

            <div className="flex flex-wrap gap-3">
              {tones.map((tone) => {
                const Icon = tone.icon;
                const selected = selectedTone === tone.id;

                return (
                  <button
                    key={tone.id}
                    type="button"
                    onClick={() => setSelectedTone(tone.id)}
                    className={`flex h-11 items-center gap-2.5 rounded-xl border px-4 text-sm transition ${
                      selected
                        ? "border-violet-500 bg-violet-600 text-white shadow-[0_0_22px_rgba(139,92,246,0.22)]"
                        : "border-white/[0.10] bg-white/[0.015] text-zinc-300 hover:border-white/[0.18] hover:bg-white/[0.04]"
                    }`}
                  >
                    <Icon className="h-5 w-5" />

                    {tone.id}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Summarize */}
          <button
            type="button"
            disabled={!text.trim() || isSummarizing}
            onClick={handleSummarize}
            className="group relative flex h-16 min-w-[205px] items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-br from-violet-600 to-violet-500 px-7 text-lg font-medium text-white shadow-[0_0_35px_rgba(124,58,237,0.25)] transition hover:from-violet-500 hover:to-violet-400 hover:shadow-[0_0_45px_rgba(124,58,237,0.35)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            {isSummarizing ? (
              <>
                <SpinnerIcon className="relative h-5 w-5 animate-spin" />
                <span className="relative">Summarizing...</span>
              </>
            ) : (
              <>
                <SparklesIcon className="relative h-5 w-5" />

                <span className="relative">Summarize</span>
              </>
            )}
          </button>
        </div>
      </section>

      {/* ============================================================ */}
      {/* RESULT                                                        */}
      {/* ============================================================ */}

      {summary && (
        <section className="mt-5 rounded-2xl border border-violet-500/50 bg-[#090d15]/95 p-7 shadow-xl shadow-black/20 sm:p-9">
          {/* Result header */}
          <div className="flex items-start justify-between gap-5">
            <div className="flex items-start gap-5">
              <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/[0.12] sm:flex">
                <FileTextIcon className="h-7 w-7 text-violet-400" />
              </div>

              <div>
                <h2 className="text-xl font-medium tracking-tight text-zinc-100 sm:text-[25px]">
                  {summary.title}
                </h2>

                <ToneBadge tone={summary.tone} />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSave}
                className={`flex h-11 items-center gap-2 rounded-xl border px-4 text-sm transition ${
                  isSaved
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                    : "border-white/[0.12] bg-white/[0.015] text-zinc-200 hover:border-white/[0.22] hover:bg-white/[0.05]"
                }`}
              >
                <BookmarkIcon className="h-5 w-5" />

                {isSaved ? "Saved" : "Save"}
              </button>

              <button
                type="button"
                onClick={() => navigator.clipboard?.writeText(summary.summary)}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.015] text-zinc-300 transition hover:border-white/[0.22] hover:bg-white/[0.05]"
                title="Copy summary"
              >
                <CopyIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Summary text */}
          <div className="mt-8 max-w-[1100px] pl-0 sm:pl-[76px]">
            {summary.summary.split("\n\n").map((paragraph, index) => (
              <p
                key={index}
                className="mb-6 text-[17px] leading-8 text-zinc-300 last:mb-0 sm:text-[18px] sm:leading-8"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 flex items-center justify-between border-t border-white/[0.07] pt-4 pl-0 sm:ml-[76px]">
            <div className="flex items-center gap-3 text-xs text-zinc-500"></div>

            <div className="hidden items-center gap-2 text-xs text-zinc-500 sm:flex">
              <SparklesIcon className="h-3.5 w-3.5 text-violet-400" />
              Summarized just now
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SummarizeScreen;

/* ========================================================================== */
/* TONE BADGE                                                                 */
/* ========================================================================== */

function ToneBadge({ tone }) {
  const styles = {
    Human: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
    Professor: "border-violet-500/20 bg-violet-500/10 text-violet-300",
    Architect: "border-blue-500/20 bg-blue-500/10 text-blue-300",
    Founder: "border-orange-500/20 bg-orange-500/10 text-orange-300",
  };

  return (
    <span
      className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-medium ${
        styles[tone] || styles.Human
      }`}
    >
      {tone}
    </span>
  );
}
