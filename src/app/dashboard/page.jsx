"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  GraduationIcon,
  BuildingIcon,
  RocketIcon,
  FileTextIcon,
  SparklesIcon,
  CrownIcon,
  ChevronDownIcon,
  SearchIcon,
  TrashIcon,
  ArrowRightIcon,
  getToneIcon,
} from "@/utils/common";
import { AuthContext } from "@/context/AuthContext";
import SummarizeScreen from "./SummarizeScreen";
import { formatRelativeDate } from "@/utils/common";
import axiosApi from "@/utils/axios";

const initialSavedSummaries = [
  {
    id: 1,
    title: "How to Build a Habit That Sticks",
    tone: "Human",
    createdAt: "2 days ago",
    icon: FileTextIcon,
  },
  {
    id: 2,
    title: "Quantum Computing Explained Simply",
    tone: "Professor",
    createdAt: "5 days ago",
    icon: GraduationIcon,
  },
  {
    id: 3,
    title: "Sustainable Architecture in Modern Cities",
    tone: "Architect",
    createdAt: "1 week ago",
    icon: BuildingIcon,
  },
  {
    id: 4,
    title: "Why Startups Fail (And How to Avoid It)",
    tone: "Founder",
    createdAt: "2 weeks ago",
    icon: RocketIcon,
  },
  {
    id: 5,
    title: "The Psychology of Productivity",
    tone: "Human",
    createdAt: "3 weeks ago",
    icon: FileTextIcon,
  },
];

export default function DashboardPage() {
  const router = useRouter();

  const [savedSummaries, setSavedSummaries] = useState([]);
  const [search, setSearch] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { logout, user, isLoading } = useContext(AuthContext);
  const [expandedIds, setExpandedIds] = useState(new Set());

  const toggleExpand = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredSummaries = useMemo(() => {
    return savedSummaries.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [savedSummaries, search]);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Delete this summary?");
    if (!isConfirmed) return;

    try {
      await axiosApi.delete(`/summaries/${id}`);
      setSavedSummaries((prev) => prev.filter((summary) => summary._id !== id));
    } catch (error) {
      console.error(error);
    }
    setSavedSummaries((prev) => prev.filter((summary) => summary.id !== id));
  };

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  useEffect(() => {
    const getAllSummaries = async () => {
      try {
        const response = await axiosApi.get("/summaries");
        setSavedSummaries(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getAllSummaries();
  }, []);

  if (isLoading || !user) return <div>Loading...</div>;

  return (
    <main className="min-h-screen bg-[#05070d] text-white">
      {/* ================================================================ */}
      {/* BACKGROUND                                                       */}
      {/* ================================================================ */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[35%] top-[-300px] h-[650px] w-[650px] rounded-full bg-violet-600/[0.055] blur-[140px]" />

        <div className="absolute bottom-[-250px] right-[-200px] h-[500px] w-[500px] rounded-full bg-indigo-600/[0.035] blur-[130px]" />
      </div>

      {/* ================================================================ */}
      {/* HEADER                                                           */}
      {/* ================================================================ */}

      <header className="relative z-30 mx-4 mt-4 border border-white/[0.08] bg-[#090c13]/90 shadow-xl shadow-black/20 backdrop-blur-xl sm:mx-5 lg:mx-6">
        <div className="flex h-[84px] items-center justify-between px-5 sm:px-7">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center">
              <div className="absolute inset-0 rounded-xl bg-violet-500/20 blur-md" />

              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/25 bg-violet-500/10">
                <SparklesIcon className="h-5 w-5 text-violet-400" />
              </div>
            </div>

            <span className="text-xl font-semibold tracking-tight sm:text-2xl">
              Summarize<span className="text-violet-400">AI</span>
            </span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 sm:gap-5">
            {user.plan === "free" ? (
              <>
                {/* Usage */}
                <div className="hidden w-[315px] rounded-xl border border-white/[0.07] bg-white/[0.015] px-3.5 py-2.5 sm:block">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs text-zinc-300">
                      {user.summarizeCount} of 5 free summaries used this month
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/[0.07]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-600 to-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.5)]"
                      style={{
                        width: `${Math.min((user.summarizeCount / 5) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Upgrade */}
                <button
                  type="button"
                  className="group relative hidden h-11 items-center gap-2 overflow-hidden rounded-xl border border-amber-400/60 bg-amber-500/[0.10] px-4 text-sm font-medium text-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.08)] transition hover:border-amber-300 hover:bg-amber-400/[0.15] hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] sm:flex"
                  onClick={() =>
                    window.alert(
                      "Please contact admin at shanmohammad1254@gmail.com",
                    )
                  }
                >
                  <CrownIcon className="h-4 w-4" />

                  <span>Upgrade to Pro</span>
                </button>
              </>
            ) : (
              <span className="group relative hidden h-11 items-center gap-2 overflow-hidden rounded-xl border border-amber-400/60 bg-amber-500/[0.10] px-4 text-sm font-medium text-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.08)] transition sm:flex">
                <CrownIcon className="h-4 w-4" />

                <span>Pro Plan Activated</span>
              </span>
            )}

            {/* Profile */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowProfileMenu((prev) => !prev)}
                className="flex items-center gap-2 transition"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.10] bg-[#202534] text-sm font-medium text-zinc-200">
                  {user.email[0].toUpperCase()}
                </div>

                <ChevronDownIcon className="hidden h-4 w-4 text-zinc-500 sm:block" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 top-14 w-48 overflow-hidden rounded-xl border border-white/[0.08] bg-[#0c1019] p-1.5 shadow-2xl">
                  <button
                    onClick={handleLogout}
                    className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-zinc-400 transition hover:bg-white/[0.05] hover:text-white"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ================================================================ */}
      {/* MOBILE USAGE                                                     */}
      {/* ================================================================ */}

      <div className="relative z-10 mx-4 mt-3 sm:hidden">
        <div className="rounded-xl border border-white/[0.07] bg-[#090c13] px-4 py-3">
          <div className="mb-2 flex justify-between">
            <span className="text-xs text-zinc-400">
              3 of 5 free summaries used
            </span>

            <span className="text-xs text-zinc-600">60%</span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
            <div className="h-full w-[60%] rounded-full bg-violet-500" />
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* MAIN CONTENT                                                     */}
      {/* ================================================================ */}

      <div className="relative z-10 mx-auto max-w-[1500px] px-4 pb-10 pt-5 sm:px-5 lg:px-6 lg:pt-5">
        {/* ============================================================ */}
        {/* SUMMARIZE SCREEN                                             */}
        {/* ============================================================ */}

        <SummarizeScreen setSavedSummaries={setSavedSummaries} />

        {/* ============================================================ */}
        {/* SAVED SUMMARIES                                               */}
        {/* ============================================================ */}

        <section className="mt-5 rounded-2xl border border-white/[0.08] bg-[#090d15]/90 p-5 shadow-xl shadow-black/20 sm:p-8">
          {/* Section header */}
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-medium tracking-tight text-zinc-100">
              Saved Summaries
            </h2>

            {/* Search */}
            <div className="relative w-full sm:w-[275px]">
              <SearchIcon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search summaries..."
                className="h-10 w-full rounded-lg border border-white/[0.09] bg-white/[0.015] pl-10 pr-3 text-sm text-zinc-300 outline-none placeholder:text-zinc-600 transition focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/10"
              />
            </div>
          </div>

          {/* List */}
          <div className="space-y-2">
            {filteredSummaries.length > 0 ? (
              filteredSummaries.map((item) => {
                const Icon = getToneIcon(item.tone);
                const isExpanded = expandedIds.has(item._id);

                return (
                  <div
                    key={item._id}
                    className="group flex flex-col gap-2 rounded-lg border border-white/[0.07] bg-white/[0.012] px-3 py-3 transition hover:border-white/[0.12] hover:bg-white/[0.025] sm:px-4"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${getIconBackground(item.tone)}`}
                      >
                        <Icon
                          className={`h-5 w-5 ${getToneTextColor(item.tone)}`}
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-zinc-200 sm:text-[15px]">
                          {item.title}
                        </p>
                      </div>

                      <div className="hidden sm:block">
                        <ToneBadge tone={item.tone} />
                      </div>

                      <span className="hidden w-[95px] text-sm text-zinc-500 md:block">
                        {formatRelativeDate(item.createdAt)}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleDelete(item._id)}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-zinc-600 opacity-0 transition hover:bg-red-500/10 hover:text-red-400 group-hover:opacity-100 sm:opacity-0"
                        title="Delete"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="pl-[52px]">
                      <p
                        className={`text-sm text-zinc-400 ${isExpanded ? "" : "line-clamp-2"}`}
                      >
                        {item.summary}
                      </p>
                      <button
                        type="button"
                        onClick={() => toggleExpand(item._id)}
                        className="mt-1 text-xs font-medium text-violet-400 hover:text-violet-300"
                      >
                        {isExpanded ? "Show less" : "Read more"}
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-12 text-center">
                <p className="text-sm text-zinc-500">No summaries found.</p>
              </div>
            )}
          </div>

          {/* Footer */}
          {filteredSummaries.length > 0 && (
            <div className="mt-5 text-center">
              <button
                type="button"
                className="inline-flex items-center gap-2 text-sm font-medium text-violet-400 transition hover:text-violet-300"
              >
                View all summaries
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

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

/* ========================================================================== */
/* HELPERS                                                                    */
/* ========================================================================== */

function getIconBackground(tone) {
  const backgrounds = {
    Human: "bg-emerald-500/[0.10]",
    Professor: "bg-violet-500/[0.10]",
    Architect: "bg-blue-500/[0.10]",
    Founder: "bg-orange-500/[0.10]",
  };

  return backgrounds[tone] || backgrounds.Human;
}

function getToneTextColor(tone) {
  const colors = {
    Human: "text-emerald-400",
    Professor: "text-violet-400",
    Architect: "text-blue-400",
    Founder: "text-orange-400",
  };

  return colors[tone] || colors.Human;
}
