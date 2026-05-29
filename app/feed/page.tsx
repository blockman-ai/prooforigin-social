import { supabase } from "@/lib/supabase";

export default async function FeedPage() {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-cyan-400 mb-6">
        Feed
      </h1>

      {error && (
        <p className="text-red-500 mb-4">
          Error loading posts.
        </p>
      )}

      <div className="space-y-4">
        {posts?.map((post) => (
          <div
            key={post.id}
            className="border border-cyan-500/20 rounded-2xl p-4"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-bold">ProofOrigin</h2>

              <span className="text-xs text-yellow-400 uppercase">
                {post.verification_status}
              </span>
            </div>

            <p className="text-gray-300">
              {post.content}
            </p>

            <p className="text-xs text-gray-500 mt-4">
              {new Date(post.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
