export default function Sidebar() {
  return (
    <aside className="border border-cyan-500/20 rounded-2xl p-4">
      <h2 className="font-bold mb-4">Trust Metrics</h2>

      <div className="space-y-3 text-sm">
        <p>Trust Score: --</p>
        <p>Reputation: --</p>
        <p>Evidence Score: --</p>
        <p>Verification Score: --</p>
      </div>
    </aside>
  );
}
