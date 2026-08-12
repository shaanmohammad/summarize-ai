"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { SparklesIcon, MailIcon, LockIcon, EyeIcon, EyeOffIcon, ArrowIcon, ErrorIcon } from "@/utils/common";
import axiosApi from "@/utils/axios";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
        const response = await axiosApi.post('/auth/signup', {email: formData.email, password: formData.password});
        setError(false)
        login(response.data.user, response.data.token);
        router.replace("/dashboard");
    } catch (error) {
        setError(error.response?.data?.message || "Something went wrong. Please try again.");    
    }
  };

  return (
    <main className="min-h-screen bg-[#05070d] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-250px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />

        <div className="absolute bottom-[-200px] left-[-150px] h-[400px] w-[400px] rounded-full bg-indigo-600/5 blur-[100px]" />

        <div className="absolute right-[-150px] top-1/2 h-[400px] w-[400px] rounded-full bg-purple-600/5 blur-[100px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex h-20 items-center justify-between border-b border-white/[0.06] px-6 lg:px-10">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
        >
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
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-white transition hover:text-violet-400"
          >
            Sign in
          </Link>
        </div>
      </header>

      {/* Main */}
      <section className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-10">
        <div className="w-full max-w-[460px]">

          {/* Heading */}
          <div className="mb-7 text-center">
            <h1 className="text-3xl font-semibold tracking-tight">
              Create your account
            </h1>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Start turning long text into clear, useful summaries.
            </p>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0a0d15]/90 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">


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
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="h-12 w-full rounded-xl border border-white/[0.09] bg-white/[0.025] pl-11 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 transition focus:border-violet-500/60 focus:bg-violet-500/[0.02] focus:ring-4 focus:ring-violet-500/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-zinc-300"
                >
                  Password
                </label>

                <div className="group relative">
                  <LockIcon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500 transition group-focus-within:text-violet-400" />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                    minLength={8}
                    className="h-12 w-full rounded-xl border border-white/[0.09] bg-white/[0.025] pl-11 pr-12 text-sm text-white outline-none placeholder:text-zinc-600 transition focus:border-violet-500/60 focus:bg-violet-500/[0.02] focus:ring-4 focus:ring-violet-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-zinc-300"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <p className="mt-1.5 text-xs text-zinc-600">
                  Must be at least 8 characters.
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-zinc-300"
                >
                  Confirm password
                </label>

                <div className="group relative">
                  <LockIcon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500 transition group-focus-within:text-violet-400" />

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                    className="h-12 w-full rounded-xl border border-white/[0.09] bg-white/[0.025] pl-11 pr-12 text-sm text-white outline-none placeholder:text-zinc-600 transition focus:border-violet-500/60 focus:bg-violet-500/[0.02] focus:ring-4 focus:ring-violet-500/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-zinc-300"
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

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

              {/* Terms */}
              <div className="flex items-start gap-3 pt-1">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 bg-white/5 accent-violet-500"
                />

                <label
                  htmlFor="terms"
                  className="text-xs leading-5 text-zinc-500"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-zinc-300 transition hover:text-violet-400"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-zinc-300 transition hover:text-violet-400"
                  >
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group relative mt-2 flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-violet-600 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-500 hover:shadow-violet-500/30 active:scale-[0.99]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <span className="relative">
                  Create account
                </span>

                <ArrowIcon className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>

            {/* Login */}
            <p className="mt-6 text-center text-sm text-zinc-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-violet-400 transition hover:text-violet-300"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Bottom message */}
          <p className="mt-6 text-center text-xs text-zinc-600">
            Your first 5 summaries are free. No credit card required.
          </p>
        </div>
      </section>
    </main>
  );
}