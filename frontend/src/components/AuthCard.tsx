import React from "react";
import { Badge } from "./Badge";
import { classNames } from "../utils/classNames";
import { ErrorBanner } from "./ErrorBanner";

export function AuthCard(props: {
  authMode: "LOGIN" | "REGISTER";
  setAuthMode: (m: "LOGIN" | "REGISTER") => void;

  name: string;
  setName: (v: string) => void;

  email: string;
  setEmail: (v: string) => void;

  password: string;
  setPassword: (v: string) => void;

  authError: string | null;
  authLoading: boolean;

  onSubmitAuth: (e: React.FormEvent) => Promise<void>;
}) {
  const {
    authMode,
    setAuthMode,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    authError,
    authLoading,
    onSubmitAuth,
  } = props;

  return (
    <div className="min-h-full">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10">
        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left - brand */}
          <div className="hidden md:flex md:flex-col md:justify-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2">
                <div className="h-10 w-10 rounded-2xl bg-slate-900" />
                <span className="text-lg font-semibold">Incident Tracker</span>
              </div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Manage incidents & tasks
                <span className="text-slate-500"> with clarity.</span>
              </h1>

              <p className="text-slate-600">
                Sign in or create an account to manage and track your tickets
                efficiently.
              </p>

              <div className="flex flex-wrap gap-2">
                <Badge variant="blue">JWT</Badge>
                <Badge variant="gray">Spring Boot</Badge>
                <Badge variant="gray">React + TS</Badge>
                <Badge variant="gray">Tailwind</Badge>
              </div>
            </div>
          </div>

          {/* Right - card */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Welcome back</h2>
                <Badge variant={authMode === "LOGIN" ? "blue" : "green"}>
                  {authMode === "LOGIN" ? "Login" : "Register"}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-slate-600">
                {authMode === "LOGIN"
                  ? "Sign in to continue."
                  : "Create an account to start."}
              </p>
            </div>

            <div className="mb-4 flex gap-2 rounded-xl bg-slate-100 p-1">
              <button
                className={classNames(
                  "flex-1 rounded-lg px-3 py-2 text-sm font-medium",
                  authMode === "LOGIN"
                    ? "bg-white shadow-sm"
                    : "text-slate-600",
                )}
                onClick={() => setAuthMode("LOGIN")}
                type="button"
              >
                Login
              </button>
              <button
                className={classNames(
                  "flex-1 rounded-lg px-3 py-2 text-sm font-medium",
                  authMode === "REGISTER"
                    ? "bg-white shadow-sm"
                    : "text-slate-600",
                )}
                onClick={() => setAuthMode("REGISTER")}
                type="button"
              >
                Register
              </button>
            </div>

            {authError && <ErrorBanner message={authError} />}

            <form onSubmit={onSubmitAuth} className="space-y-3">
              {authMode === "REGISTER" && (
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Name
                  </label>
                  <input
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-slate-900/10 focus:ring-2"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-slate-900/10 focus:ring-2"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-slate-900/10 focus:ring-2"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                disabled={authLoading}
                className={classNames(
                  "mt-2 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm",
                  "hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60",
                )}
                type="submit"
              >
                {authLoading
                  ? "Please wait..."
                  : authMode === "REGISTER"
                    ? "Create account"
                    : "Login"}
              </button>

              <p className="text-xs text-slate-500">
                If you experience login issues, please verify your email and
                password or create a new account.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
