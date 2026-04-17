export default function UploadCard({ uploadPreview, uploadError, onFileChange, loading }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-surface-container p-8 shadow-glow">
      <h2 className="text-xs font-semibold uppercase tracking-[0.32em] text-primary mb-5">Upload Resume</h2>
      <label className="group block rounded-[2rem] border-2 border-dashed border-outline/30 bg-surface-container-lowest p-8 text-center transition hover:border-primary/60 hover:bg-surface-container-lowest/90 cursor-pointer">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary transition group-hover:scale-105">
          <span className="material-symbols-outlined text-3xl">cloud_upload</span>
        </div>
        <p className="text-sm font-semibold text-on-surface">Drag and drop or click to upload</p>
        <p className="mt-2 text-xs text-on-surface-variant">PDF, DOCX (Max 10MB)</p>
        <input type="file" accept=".pdf,.docx" className="sr-only" onChange={onFileChange} disabled={loading} />
      </label>
      <p className="mt-4 text-sm text-on-surface-variant">{uploadPreview}</p>
      {uploadError && <p className="mt-2 text-sm text-error">{uploadError}</p>}
    </div>
  );
}
