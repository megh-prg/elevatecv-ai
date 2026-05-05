export default function JobDescriptionCard({ jobDescription, onChange, onAnalyze, loading }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-surface-container p-8 shadow-glow">
      <h2 className="text-xs font-semibold uppercase tracking-[0.32em] text-primary mb-5">Job Description</h2>
      <textarea
        value={jobDescription}
        onChange={onChange}
        className="min-h-[16rem] w-full rounded-3xl border border-white/10 bg-surface-container-lowest p-5 text-sm text-on-surface outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
        placeholder="Paste the job description here to analyze the match against your uploaded resume..."
      />
      <p className="mt-4 text-xs text-on-surface-variant">
        Use this to extract keywords and identify gaps between the JD and your resume.
      </p>
      <button
        onClick={onAnalyze}
        disabled={loading}
        className="mt-5 w-full rounded-full bg-gradient-to-r from-primary to-primary-dim px-5 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-[#060e20] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Analyze JD Match
      </button>
    </div>
  );
}
