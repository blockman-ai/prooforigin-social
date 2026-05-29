export default function LoginPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-cyan-400 mb-6">Sign In</h1>

      <div className="max-w-md border border-cyan-500/20 rounded-2xl p-6">
        <input
          className="w-full bg-black border border-cyan-500/20 rounded-lg p-3 mb-4"
          placeholder="Email"
        />

        <input
          className="w-full bg-black border border-cyan-500/20 rounded-lg p-3 mb-4"
          placeholder="Password"
          type="password"
        />

        <button className="bg-cyan-500 text-black px-4 py-2 rounded-lg font-bold w-full">
          Sign In
        </button>
      </div>
    </main>
  );
}
