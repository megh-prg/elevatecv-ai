export default function DashboardCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="rounded-[2rem] border border-white/10 bg-surface-container p-8 shadow-glow text-center">
        <h3 className="text-xs font-semibold uppercase tracking-[0.32em] text-primary mb-4">ATS Score</h3>
        <div className="relative mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-[#111c36]">
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <span className="text-4xl font-black">85%</span>
        </div>
        <p className="mt-4 text-sm text-on-surface-variant">Strong Match Profile</p>
      </div>
      <div className="rounded-[2rem] border border-white/10 bg-surface-container p-8 shadow-glow">
        <h3 className="text-xs font-semibold uppercase tracking-[0.32em] text-primary mb-4">Sentiment</h3>
        <div className="space-y-4">
          <div className="flex items-end justify-between text-sm text-on-surface-variant">
            <span>Confidence</span>
            <span className="text-primary font-bold">92%</span>
          </div>
          <div className="h-2 rounded-full bg-surface-variant overflow-hidden">
            <div className="h-full w-11/12 rounded-full bg-primary" />
          </div>
          <p className="text-sm leading-relaxed">AI indicates a high alignment with leadership keywords.</p>
        </div>
      </div>
    </div>
  );
}
