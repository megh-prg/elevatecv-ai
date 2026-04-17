export default function Topbar() {
  return (
    <header className="fixed right-0 left-72 top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-[#060e20]/80 backdrop-blur-xl px-8 text-sm text-on-surface">
      <div className="flex w-full max-w-2xl items-center gap-4">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input
            type="search"
            placeholder="Search templates or resources..."
            className="w-full rounded-full border border-white/10 bg-surface-container-lowest py-2 pl-11 pr-4 text-sm text-on-surface outline-none ring-1 ring-transparent transition focus:border-primary/70 focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
      <div className="flex items-center gap-4 text-on-surface-variant">
        <button className="rounded-full p-2 hover:text-primary transition"><span className="material-symbols-outlined">notifications</span></button>
        <button className="rounded-full p-2 hover:text-primary transition"><span className="material-symbols-outlined">dark_mode</span></button>
        <div className="h-10 w-10 rounded-full overflow-hidden border border-primary/30 bg-surface-container-lowest">
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
            alt="User avatar"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
