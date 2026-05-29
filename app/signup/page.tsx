"use client";

import { useState } from "react";
import { supabase } from "@/lib/auth";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignup() {
    setMessage("Creating account...");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Account created. Check your email to confirm your signup.");
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-cyan-400 mb-6">
        Create Account
      </h1>

      <div className="max-w-md border border-cyan-500/20 rounded-2xl p-6">
        <input
          className="w-full bg-black border border-cyan-500/20 rounded-lg p-3 mb-4"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full bg-black border border-cyan-500/20 rounded-lg p-3 mb-4"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="bg-cyan-500 text-black px-4 py-2 rounded-lg font-bold w-full"
        >
          Create Account
        </button>

        {message && (
          <p className="text-sm text-gray-300 mt-4">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}
