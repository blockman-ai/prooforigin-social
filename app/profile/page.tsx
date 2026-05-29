"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/auth";

export default function ProfilePage() {
  const [userEmail, setUserEmail] = useState("");
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        setStatus("Not signed in");
        return;
      }

      setUserEmail(data.user.email || "");
      setStatus("Signed in");
    }

    loadUser();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-cyan-400 mb-6">
        Profile
      </h1>

      <div className="max-w-3xl space-y-6">

        <div className="border border-cyan-500/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-2">Standard Identity</h2>

          <p className="text-gray-300 mb-4">
            Basic ProofOrigin profile using email, username, bio, and reputation.
          </p>

          <div className="space-y-2 text-sm">
            <p><strong>Status:</strong> {status}</p>
            <p><strong>Email:</strong> {userEmail || "Not available"}</p>
            <p><strong>Identity Type:</strong> Standard User</p>
            <p><strong>Trust Score:</strong> 0</p>
            <p><strong>Reputation Score:</strong> 0</p>
          </div>

          <button
            onClick={logout}
            className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg font-bold"
          >
            Logout
          </button>
        </div>

        <div className="border border-yellow-500/40 rounded-2xl p-6 bg-yellow-500/5">
          <h2 className="text-2xl font-bold text-yellow-400 mb-2">
            ⟁ Upgrade to Ordinal Identity
          </h2>

          <p className="text-gray-300 mb-4">
            Ordinal Identity is optional, but unlocks advanced ProofOrigin features.
            It proves ownership on Bitcoin without KYC.
          </p>

          <div className="space-y-2 text-sm text-gray-300">
            <p>✓ Ordinal PFP</p>
            <p>✓ Bitcoin ownership proof</p>
            <p>✓ Advanced profile identity</p>
            <p>✓ Future ProofOrigin Vault access</p>
            <p>✓ Future legacy and inheritance tools</p>
          </div>

          <button className="mt-6 bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold">
            Connect Wallet Coming Soon
          </button>
        </div>

      </div>
    </main>
  );
}
