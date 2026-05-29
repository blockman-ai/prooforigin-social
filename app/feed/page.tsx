import { supabase } from "@/lib/supabase";

export default async function FeedPage() {
  const { data, error } = await supabase
    .from("posts")
    .select("*");

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-cyan-400 mb-6">
        Feed
      </h1>

      {error && (
        <pre className="text-red-500">
          {JSON.stringify(error, null, 2)}
        </pre>
      )}

      <pre className="text-sm">
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}
