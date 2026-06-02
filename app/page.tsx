"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/auth";

export default function Home() {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  async function loadPosts() {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setPosts(data);
  }

  useEffect(() => {
    loadPosts();
  }, []);

  async function recognizePost(post: any) {
  const { error } = await supabase.rpc("recognize_post", {
    target_user_id: post.user_id,
    target_post_id: post.id,
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Recognition sent. +10 impact.");
  loadPosts();
}

async function createPost() {
    setMessage("");

    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      setMessage("Please sign in to post.");
      return;
    }

    if (!content.trim()) {
      setMessage("Post cannot be empty.");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userData.user.id)
      .single();

    const displayName = profile?.display_name || "ProofOrigin User";
    const username = profile?.username || "user";

    const { error } = await supabase.from("posts").insert({
      content,
      display_name: displayName,
      username,
      verification_status: "email verified",
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setContent("");
    setMessage("Posted.");
    loadPosts();
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <section className="border border-cyan-500/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4">Trust Metrics</h2>
          <p>Trust Score: --</p>
          <p>Reputation: --</p>
          <p>Evidence Score: --</p>
          <p>Verification Score: --</p>
        </section>

        <section className="border border-cyan-500 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4">Create Post</h2>

          <textarea
            className="w-full bg-black border border-cyan-500/20 rounded-xl p-4 mb-4"
            rows={5}
            placeholder="What can be proven?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            onClick={createPost}
            className="bg-cyan-500 text-black px-6 py-3 rounded-xl font-bold"
          >
            Post
          </button>

          {message && <p className="text-sm text-gray-300 mt-3">{message}</p>}
        </section>

        <section className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border border-cyan-500/20 rounded-2xl p-6"
            >
              <div className="mb-3">
                <h3 className="font-bold text-lg">
                  {post.display_name || "ProofOrigin User"}
                </h3>
                <p className="text-cyan-400 text-sm">
                  @{post.username || "user"}
                </p>
                <p className="text-xs text-green-400 mt-1">
                  ✓ Email Verified
                </p>
              </div>

              <p className="text-gray-200 mb-3">{post.content}</p>

<div className="flex gap-2 mb-3">
  <button
    onClick={() => recognizePost(post)}
    className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-3 py-1 rounded-lg"
  >
    🏆 Recognize
  </button>
</div>

              <p className="text-xs text-gray-500">
                {post.created_at
                  ? new Date(post.created_at).toLocaleString()
                  : ""}
              </p>
            </div>
          ))}
        </section>

        <section className="border border-cyan-500/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4">Trending Communities</h2>
          <p>#Bitcoin</p>
          <p>#Ordinals</p>
          <p>#Crypto</p>
          <p>#Technology</p>
          <p>#Science</p>
        </section>
      </div>
    </main>
  );
}
