export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-20">

        <h1 className="text-6xl font-bold mb-6">
          ProofOrigin Social
        </h1>

        <p className="text-2xl text-cyan-400 mb-10">
          The Trust Layer of the Internet
        </p>

        <p className="text-gray-300 max-w-3xl mb-12">
          A social platform focused on verification,
          evidence, identity, reputation, and authentic
          digital communication.
        </p>

        <div className="grid md:grid-cols-4 gap-6">

          <div className="p-6 rounded-2xl border border-cyan-500">
            <h2 className="text-xl font-bold mb-2">
              Feed
            </h2>
            <p>Discover trusted content.</p>
          </div>

          <div className="p-6 rounded-2xl border border-cyan-500">
            <h2 className="text-xl font-bold mb-2">
              Communities
            </h2>
            <p>Join evidence-driven discussions.</p>
          </div>

          <div className="p-6 rounded-2xl border border-cyan-500">
            <h2 className="text-xl font-bold mb-2">
              Reputation
            </h2>
            <p>Build digital trust.</p>
          </div>

          <div className="p-6 rounded-2xl border border-cyan-500">
            <h2 className="text-xl font-bold mb-2">
              Verification
            </h2>
            <p>Verify claims and media.</p>
          </div>

        </div>

      </div>
    </main>
  );
}
