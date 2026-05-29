export default function Navbar() {
  return (
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
          <a href="/profile">Profile</a><a href="/login">Sign In</a><a href="/login">Sign In</a>
        </div>
      </div>
    </nav>
  );
}
