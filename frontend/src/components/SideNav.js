const navItems = [
  { icon: 'dashboard', label: 'Dashboard', active: true },
  { icon: 'description', label: 'Resume Builder' },
  { icon: 'auto_awesome', label: 'AI Optimizer' },
  { icon: 'work', label: 'Job Matches' },
  { icon: 'settings', label: 'Settings' },
];

export default function SideNav() {
  return (
    <aside className="fixed inset-y-0 left-0 w-72 border-r border-white/10 bg-[#091328]/70 backdrop-blur-2xl px-6 py-8 text-sm text-on-surface overflow-y-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary-dim">ResumeAI</h1>
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.28em] text-on-surface-variant">Ethereal Architect</p>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            type="button"
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition ${
              item.active ? 'bg-[#192540]/70 border-l-4 border-primary text-on-surface' : 'text-on-surface-variant hover:bg-[#192540]/50 hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-base">{item.icon}</span>
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="mt-10 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary-container/10 to-surface-container p-5 shadow-glow">
        <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-primary mb-2">Pro Plan</p>
        <p className="text-sm text-on-surface-variant leading-relaxed">Unlock unlimited AI tailoring and advanced resume scoring.</p>
        <button className="mt-5 w-full rounded-full bg-gradient-to-br from-primary to-primary-dim px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#060e20] shadow-lg shadow-primary/30 transition hover:scale-[1.01]">
          Upgrade to Pro
        </button>
      </div>
    </aside>
  );
}
