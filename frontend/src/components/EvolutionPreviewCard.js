export default function EvolutionPreviewCard() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-surface-container p-8 shadow-glow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">Evolution Preview</h3>
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-error/40"></span>
          <span className="h-3 w-3 rounded-full bg-secondary/40"></span>
          <span className="h-3 w-3 rounded-full bg-primary/40"></span>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-4 rounded-3xl border border-white/5 bg-[#08102a] p-5">
          <p className="text-[10px] uppercase tracking-[0.28em] text-on-surface-variant">Current Draft</p>
          <div className="space-y-3 opacity-60">
            <div className="h-3 w-3/4 rounded-full bg-surface-variant" />
            <div className="h-3 w-full rounded-full bg-surface-variant" />
            <div className="h-3 w-5/6 rounded-full bg-surface-variant" />
            <div className="h-20 rounded-3xl bg-surface-variant" />
            <p className="text-sm leading-relaxed text-on-surface-variant">"Responsible for managing the frontend team and delivering multiple projects on time."</p>
          </div>
        </div>
        <div className="space-y-4 rounded-3xl border border-white/5 bg-[#101a34] p-5">
          <p className="text-[10px] uppercase tracking-[0.28em] text-primary">Optimized Version</p>
          <div className="space-y-3">
            <div className="h-3 w-3/4 rounded-full bg-primary/20" />
            <div className="h-3 w-full rounded-full bg-primary/20" />
            <div className="h-3 w-5/6 rounded-full bg-primary/20" />
            <div className="h-20 rounded-3xl bg-primary/20" />
            <div className="rounded-3xl border-l-4 border-primary/40 bg-primary/10 p-4">
              <p className="text-sm leading-relaxed italic text-on-surface">"Spearheaded a 5-member frontend engineering team, accelerating project delivery by 40% through Agile transformation."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
