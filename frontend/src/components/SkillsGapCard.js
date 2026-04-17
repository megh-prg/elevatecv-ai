const badge = (label, isMissing = false) => (
  <span
    key={label}
    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition ${
      isMissing ? 'border-primary/30 bg-primary-container/10 text-primary' : 'border-secondary/30 bg-secondary-container/10 text-secondary'
    }`}
  >
    {label}
  </span>
);

export default function SkillsGapCard({ matchedSkills, missingSkills }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-surface-container p-8 shadow-glow">
      <h3 className="text-xs font-semibold uppercase tracking-[0.32em] text-primary mb-6">Skills Gap Analysis</h3>
      <div className="space-y-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-on-surface-variant mb-3">Matched Skills</p>
          <div className="flex flex-wrap gap-2">{matchedSkills.map((skill) => badge(skill))}</div>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-on-surface-variant mb-3">Missing Critical Skills</p>
          <div className="flex flex-wrap gap-2">{missingSkills.map((skill) => badge(skill, true))}</div>
        </div>
      </div>
    </div>
  );
}
