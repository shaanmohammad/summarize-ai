"use client";

import { useContext ,useState } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import axiosApi from "@/utils/axios";
import { SparklesIcon, MailIcon, LockIcon, EyeIcon, EyeOffIcon, ArrowIcon, ErrorIcon } from "@/utils/common";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        setError(false)
        const response = await axiosApi.post('/auth/login' ,{ email, password });
        login(response.data.user, response.data.token);
        router.replace("/dashboard");
    } catch (error) {
        setError(error.response?.data?.message || "Something went wrong. Please try again.");   
    }
  };

  return (
    <main className="min-h-screen bg-[#05070d] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-250px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />

        <div className="absolute bottom-[-200px] left-[-150px] h-[400px] w-[400px] rounded-full bg-indigo-600/5 blur-[100px]" />

        <div className="absolute right-[-150px] top-1/2 h-[400px] w-[400px] rounded-full bg-purple-600/5 blur-[100px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex h-20 items-center justify-between border-b border-white/[0.06] px-6 lg:px-10">
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="relative flex h-9 w-9 items-center justify-center">
            <div className="absolute inset-0 rounded-xl bg-violet-500/20 blur-md transition group-hover:bg-violet-500/30" />

            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-500/10">
              <SparklesIcon className="h-5 w-5 text-violet-400" />
            </div>
          </div>

          <span className="text-xl font-semibold tracking-tight">
            Summarize<span className="text-violet-400">AI</span>
          </span>
        </Link>

        <div className="text-sm text-zinc-400">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-white transition hover:text-violet-400"
          >
            Sign up
          </Link>
        </div>
      </header>

      {/* Main */}
      <section className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-6">
        <div className="w-full max-w-[440px]">

          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold tracking-tight">
              Welcome back
            </h1>

            <p className="mt-1 text-sm leading-6 text-zinc-400">
              Sign in to continue summarizing smarter.
            </p>
          </div>

          {/* Login Card */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0a0d15]/90 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">

        {error && (
  <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
    <div className="mt-0.5 shrink-0">
      <ErrorIcon className="h-5 w-5 text-red-400" />
    </div>

    <p className="text-sm leading-5 text-red-300">
      {error}
    </p>
  </div>
)}
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-zinc-300"
                >
                  Email address
                </label>

                <div className="group relative">
                  <MailIcon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500 transition group-focus-within:text-violet-400" />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="h-12 w-full rounded-xl border border-white/[0.09] bg-white/[0.025] pl-11 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 transition focus:border-violet-500/60 focus:bg-violet-500/[0.02] focus:ring-4 focus:ring-violet-500/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-zinc-300"
                  >
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium text-violet-400 transition hover:text-violet-300"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="group relative">
                  <LockIcon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500 transition group-focus-within:text-violet-400" />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="h-12 w-full rounded-xl border border-white/[0.09] bg-white/[0.025] pl-11 pr-12 text-sm text-white outline-none placeholder:text-zinc-600 transition focus:border-violet-500/60 focus:bg-violet-500/[0.02] focus:ring-4 focus:ring-violet-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-zinc-300"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember */}
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-white/20 bg-white/5 accent-violet-500"
                />

                <label
                  htmlFor="remember"
                  className="text-sm text-zinc-400"
                >
                  Remember me
                </label>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="group relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-violet-600 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-500 hover:shadow-violet-500/30 active:scale-[0.99]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <span className="relative">
                  Sign in
                </span>

                <ArrowIcon className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>

            {/* Signup */}
            <p className="mt-6 text-center text-sm text-zinc-500">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-violet-400 transition hover:text-violet-300"
              >
                Create an account
              </Link>
            </p>
          </div>

          {/* Terms */}
          <p className="mt-6 text-center text-xs leading-5 text-zinc-600">
            By continuing, you agree to our{" "}
            <Link
              href="/terms"
              className="text-zinc-500 hover:text-zinc-400"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-zinc-500 hover:text-zinc-400"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}