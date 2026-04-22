"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-context";

export default function AuthPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [verifiedAccessCode, setVerifiedAccessCode] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSignUpUnlocked, setIsSignUpUnlocked] = useState(false);
  const [showAccessCodePrompt, setShowAccessCodePrompt] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const [accessCodeLoading, setAccessCodeLoading] = useState(false);
  const { loading: authLoading, signIn, signUp, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/members");
    }
  }, [authLoading, router, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setNotice("");

    if (isSignUp && !isSignUpUnlocked) {
      setError("Enter the member access code before creating an account.");
      setShowAccessCodePrompt(true);
      return;
    }

    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();

    if (isSignUp && (!trimmedFirstName || !trimmedLastName)) {
      setError("First name and last name are required for member sign up.");
      return;
    }

    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password, {
          accessCode: verifiedAccessCode,
          firstName: trimmedFirstName,
          lastName: trimmedLastName,
        });
        setNotice("Account created. You can sign in now.");
        setIsSignUp(false);
        setIsSignUpUnlocked(false);
        setVerifiedAccessCode("");
        setFirstName("");
        setLastName("");
        setPassword("");
      } else {
        await signIn(email, password);
        router.replace("/members");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleUnlockSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setNotice("");

    setAccessCodeLoading(true);

    try {
      const trimmedAccessCode = accessCode.trim();
      const response = await fetch("/api/auth/signup-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessCode: trimmedAccessCode }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          typeof result?.error === "string"
            ? result.error
            : "That access code does not match. Ask QCI leadership for the current code.",
        );
      }

      setVerifiedAccessCode(trimmedAccessCode);
      setIsSignUpUnlocked(true);
      setIsSignUp(true);
      setShowAccessCodePrompt(false);
      setAccessCode("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not verify the access code.");
    } finally {
      setAccessCodeLoading(false);
    }
  };

  const handleSwitchToSignIn = () => {
    setIsSignUp(false);
    setShowAccessCodePrompt(false);
    setError("");
    setNotice("");
  };

  const handleRequestSignUp = () => {
    setError("");
    setNotice("");

    if (isSignUpUnlocked) {
      setIsSignUp(true);
      return;
    }

    setShowAccessCodePrompt(true);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className={`w-full ${isSignUp ? "max-w-4xl" : "max-w-md"}`}>
        <h1 className="text-4xl font-bold mb-2 text-center font-abril-fatface">
          {isSignUp ? "Join QCI Members" : "Members Login"}
        </h1>
        <p className="text-center text-gray-600 mb-8">
          {isSignUp
            ? "Create an account to access exclusive member content"
            : "Sign in to access exclusive member content"}
        </p>

        {!isSignUp && showAccessCodePrompt && (
          <form
            className="mb-6 space-y-4 rounded-lg border border-[rgba(212,175,55,0.45)] bg-[rgba(212,175,55,0.08)] p-4"
            onSubmit={handleUnlockSignUp}
          >
            <div>
              <label className="block text-sm font-medium mb-2">Member access code</label>
              <input
                type="password"
                required
                value={accessCode}
                onChange={(event) => setAccessCode(event.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-red)]"
                placeholder="Enter code"
              />
            </div>
            <button
              type="submit"
              disabled={accessCodeLoading}
              className="w-full bg-[var(--color-red)] hover:bg-[var(--color-red-dark)] text-white font-bold py-2 px-4 rounded-lg transition"
            >
              {accessCodeLoading ? "Checking..." : "Unlock sign up"}
            </button>
          </form>
        )}

        <form
          onSubmit={handleSubmit}
          className={
            isSignUp
              ? "section-card grid gap-8 p-6 sm:grid-cols-[0.85fr_1.15fr] sm:p-8"
              : "space-y-6"
          }
        >
          {isSignUp && (
            <aside className="rounded-lg border border-[rgba(212,175,55,0.28)] bg-[rgba(212,175,55,0.08)] p-5">
              <p className="font-accent text-[0.78rem] uppercase tracking-[0.26em] text-[var(--color-gold)]">
                Member profile
              </p>
              <h2 className="mt-4 font-display text-4xl leading-none text-[var(--color-cream)]">
                Tell leadership who is joining.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                Your name is saved with your Supabase account profile so the portal can identify
                members cleanly.
              </p>
              <div className="mt-6 rounded-lg bg-[rgba(200,16,46,0.16)] p-4 text-sm leading-7 text-[var(--color-cream)]">
                Access code accepted. Complete the member account details to finish sign up.
              </div>
            </aside>
          )}

          <div className="space-y-6">
            {isSignUp && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-2">First name</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-red)]"
                    placeholder="First name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Last name</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-red)]"
                    placeholder="Last name"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-red)]"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-red)]"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            {notice && (
              <div className="rounded border border-[rgba(212,175,55,0.45)] bg-[rgba(212,175,55,0.12)] p-3 text-[var(--color-gold)]">
                {notice}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--color-red)] hover:bg-[var(--color-red-dark)] disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              {loading ? "Loading..." : isSignUp ? "Create Member Account" : "Sign In"}
            </button>
          </div>
        </form>

        <p className="text-center mt-6">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <button
            onClick={isSignUp ? handleSwitchToSignIn : handleRequestSignUp}
            className="ml-2 text-[var(--color-red)] hover:underline font-medium"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
