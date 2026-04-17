export default function StatusCard({ message }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-surface-container p-8 shadow-glow">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-on-surface-variant mb-4">Status</p>
      <p className="text-sm leading-relaxed text-on-surface-variant">{message}</p>
    </div>
  );
}
