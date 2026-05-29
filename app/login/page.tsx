"use client";

import { useState } from "react";
import { supabase } from "@/lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin() {
    setMessage("Signing in...");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Signed in successfully.");
    window.location.href = "/profile";
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-cyan-400 mb-6">Sign In</h1>

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
          onClick={handleLogin}
          className="bg-cyan-500 text-black px-4 py-2 rounded-lg font-bold w-full"
        >
          Sign In
        </button>

        {message && <p className="text-sm text-gray-300 mt-4">{message}</p>}
      </div>
    </main>
  );
}
