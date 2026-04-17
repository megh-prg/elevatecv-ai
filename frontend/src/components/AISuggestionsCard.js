const suggestions = [
  { title: 'Impact Metrics', description: 'Quantify your achievements in the Experience section. Use numbers.' },
  { title: 'Keyword Optimization', description: 'Incorporate cloud-native architecture and leadership language carefully.' },
  { title: 'Layout Check', description: 'Simplify your header and keep social links minimal for ATS readability.' },
  { title: 'Action Verbs', description: 'Replace passive wording with strong action verbs like led, launched, and scaled.' },
];

export default function AISuggestionsCard({ onOptimize, onReset, loading }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-surface-container-high p-8 shadow-glow">
      <div className="flex items-center gap-3 mb-6 text-on-surface">
        <span className="material-symbols-outlined text-primary">auto_awesome</span>
        <h3 className="text-xs font-semibold uppercase tracking-[0.32em]">AI Insights</h3>
      </div>
      <div className="space-y-4">
        {suggestions.map((item) => (
          <div key={item.title} className="rounded-3xl border border-primary/10 bg-surface-container-lowest p-4 transition hover:-translate-x-1 hover:border-primary/20">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-primary mb-2">{item.title}</p>
            <p className="text-sm text-on-surface-variant leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 space-y-3">
        <button
          onClick={onOptimize}
          disabled={loading}
          className="w-full rounded-3xl bg-primary px-5 py-4 text-sm font-black uppercase tracking-[0.24em] text-[#060e20] transition hover:brightness-110 disabled:opacity-60"
        >
          Optimize Resume
        </button>
        <button
          onClick={onReset}
          className="w-full rounded-3xl border border-white/10 bg-surface-container-lowest px-5 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-on-surface transition hover:border-primary/40"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
