"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/auth";

export default function ProfilePage() {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("Askia Givens");
  const [username, setUsername] = useState("askia");
  const [bio, setBio] = useState("Building the Trust Layer of the Internet.");
const [avatarUrl, setAvatarUrl] = useState("");
const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    async function loadProfile() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        setMessage("Not signed in");
        return null;
      }

      const user = userData.user;
      setUserId(user.id);
      setEmail(user.email || "");

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!profile) {
        await supabase.from("profiles").insert({
          id: user.id,
          username: "askia",
          display_name: "Askia Givens",
          bio: "Building the Trust Layer of the Internet.",
          trust_score: 0,
          reputation_score: 0,
          identity_type: "standard",
        });
      } else {
        setDisplayName(profile.display_name || "Askia Givens");
        setUsername(profile.username || "askia");
        setBio(profile.bio || "Building the Trust Layer of the Internet.");
      }

      setMessage("Signed in");
    }

    loadProfile();
  }, []);

async function uploadAvatar(): Promise<string | null> {
  if (!avatarFile) return avatarUrl || null;

  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) return null;

  const filePath = `${userData.user.id}-${Date.now()}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(filePath, avatarFile, { upsert: true });

  if (error) {
    alert(error.message);
    return null;
  }

  const { data } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath);

  setAvatarUrl(data.publicUrl);
  return data.publicUrl;
}

  async function saveProfile() {
  const uploadedAvatarUrl = await uploadAvatar();
    const cleanUsername = username.replace("@", "").trim().toLowerCase();

    const { error } = await supabase.from("profiles").upsert({
      id: userId,
      username: cleanUsername,
      display_name: displayName,
      bio,
      avatar_url: uploadedAvatarUrl || avatarUrl,
      trust_score: 0,
      reputation_score: 0,
      identity_type: "standard",
    });

    if (error) {
      setMessage(error.message);
      return null;
    }

    setUsername(cleanUsername);
    setMessage("Profile saved.");
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-cyan-400 mb-6">Profile</h1>

      <div className="max-w-3xl space-y-6">
        <div className="border border-cyan-500/20 rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-3xl font-bold text-cyan-400">
              {displayName.charAt(0)}
            </div>

            <div>
              <h2 className="text-2xl font-bold">{displayName}</h2>
              <p className="text-cyan-400">@{username}</p>
              <p className="text-sm text-gray-400">{email}</p>
            </div>
          </div>

          <p className="text-gray-300 mb-6">{bio}</p>

          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div className="border border-cyan-500/20 rounded-xl p-4">
              <p className="text-gray-400">Trust Score</p>
              <p className="text-2xl font-bold">0</p>
            </div>

            <div className="border border-cyan-500/20 rounded-xl p-4">
              <p className="text-gray-400">Reputation</p>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>

          <p className="text-sm text-gray-400 mb-4">Status: {message}</p>

          <div className="mb-6">
            <p className="text-cyan-400 mb-2">Profile Picture</p>

            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Avatar"
                className="w-24 h-24 rounded-full border border-cyan-500 object-cover mb-3"
              />
            ) : (
              <div className="w-24 h-24 rounded-full border border-cyan-500 flex items-center justify-center text-3xl font-bold text-cyan-400 mb-3">
                {displayName?.charAt(0) || "A"}
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
              className="text-sm text-gray-300"
            />
          </div>

          <div className="space-y-3">
            <input
              className="w-full bg-black border border-cyan-500/20 rounded-lg p-3"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Display Name"
            />

            <input
              className="w-full bg-black border border-cyan-500/20 rounded-lg p-3"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />

            <textarea
              className="w-full bg-black border border-cyan-500/20 rounded-lg p-3"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Bio"
              rows={3}
            />

            <button
              onClick={saveProfile}
              className="bg-cyan-500 text-black px-4 py-2 rounded-lg font-bold"
            >
              Save Profile
            </button>

            <button
              onClick={logout}
              className="ml-3 bg-red-500 text-white px-4 py-2 rounded-lg font-bold"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="border border-yellow-500/40 rounded-2xl p-6 bg-yellow-500/5">
          <h2 className="text-2xl font-bold text-yellow-400 mb-2">
            ⟁ Upgrade to Ordinal Identity
          </h2>

          <p className="text-gray-300 mb-4">
            Optional upgrade. Prove ownership on Bitcoin, use an Ordinal PFP,
            and unlock advanced ProofOrigin features.
          </p>

          <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold">
            Upgrade Identity Coming Soon
          </button>
        </div>
      </div>
    </main>
  );
}
