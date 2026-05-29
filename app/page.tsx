export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* Navbar */}
      <nav className="border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-cyan-400">
            ProofOrigin Social
          </h1>

          <div className="flex gap-6 text-sm">
            <a href="/">Home</a>
            <a href="/feed">Feed</a>
            <a href="/communities">Communities</a>
            <a href="/verify">Verify</a>
            <a href="/profile">Profile</a>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-6 p-6">

        {/* Left Sidebar */}
        <aside className="border border-cyan-500/20 rounded-2xl p-4">
          <h2 className="font-bold mb-4">Trust Metrics</h2>

          <div className="space-y-3 text-sm">
            <p>Trust Score: --</p>
            <p>Reputation: --</p>
            <p>Evidence Score: --</p>
            <p>Verification Score: --</p>
          </div>
        </aside>

        {/* Main Feed */}
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

            <div className="border border-cyan-500/20 rounded-2xl p-4">
              <h3 className="font-bold">Satoshi</h3>
              <p className="text-gray-300 mt-2">
                Welcome to ProofOrigin Social.
              </p>

              <div className="mt-3 text-xs text-cyan-400">
                VERIFIED
              </div>
            </div>

            <div className="border border-cyan-500/20 rounded-2xl p-4">
              <h3 className="font-bold">ProofOrigin</h3>
              <p className="text-gray-300 mt-2">
                The Trust Layer of the Internet.
              </p>

              <div className="mt-3 text-xs text-cyan-400">
                VERIFIED
              </div>
            </div>

          </div>
        </section>

        {/* Right Sidebar */}
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
