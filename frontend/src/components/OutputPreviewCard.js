export default function OutputPreviewCard({ output }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-surface-container p-8 shadow-glow">
      <h3 className="text-xs font-semibold uppercase tracking-[0.32em] text-primary mb-5">AI Output Preview</h3>
      <pre className="max-h-96 overflow-y-auto rounded-3xl border border-white/5 bg-[#081227] p-5 text-sm text-on-surface-variant whitespace-pre-wrap break-words no-scrollbar">
        {output ? JSON.stringify(output, null, 2) : 'Optimized resume output will appear here after you submit.'}
      </pre>
    </div>
  );
}
