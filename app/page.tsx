import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import PostCard from "@/components/PostCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-6 p-6">

        <Sidebar />

        <section className="lg:col-span-2">

          <div className="border border-cyan-500 rounded-2xl p-4 mb-6">
            <h2 className="font-bold mb-3">Create Post</h2>

            <textarea
              className="w-full bg-black border border-cyan-500/20 rounded-lg p-3"
              rows={4}
              placeholder="What can be proven?"
            />

            <button className="mt-3 bg-cyan-500 text-black px-4 py-2 rounded-lg font-bold">
              Post
            </button>
          </div>

          <div className="space-y-4">
            <PostCard />
            <PostCard />
          </div>

        </section>

        <aside className="border border-cyan-500/20 rounded-2xl p-4">
          <h2 className="font-bold mb-4">
            Trending Communities
          </h2>

          <div className="space-y-2 text-sm">
            <p>#Bitcoin</p>
            <p>#Ordinals</p>
            <p>#Crypto</p>
            <p>#Technology</p>
            <p>#Science</p>
          </div>
        </aside>

      </div>

    </main>
  );
}
