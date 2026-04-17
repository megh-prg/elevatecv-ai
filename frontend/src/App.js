import { useState } from 'react';
import AnalysisDashboard from './components/AnalysisDashboard';

function LandingPage({ onOpenDashboard }) {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container">
      <nav className="fixed top-0 w-full z-50 bg-[#091328]/60 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
        <div className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
          <span className="text-2xl font-black tracking-tighter text-[#dee5ff] font-['Inter']">ResumeAI</span>
          <div className="hidden md:flex items-center gap-8">
            <a className="text-[#ba9eff] font-bold border-b-2 border-[#ba9eff] pb-1 font-['Inter'] tracking-tight" href="#features">Features</a>
            <a className="text-[#dee5ff]/70 hover:text-[#dee5ff] transition-colors font-['Inter'] tracking-tight" href="#testimonials">Testimonials</a>
            <a className="text-[#dee5ff]/70 hover:text-[#dee5ff] transition-colors font-['Inter'] tracking-tight" href="#pricing">Pricing</a>
            <button
              type="button"
              onClick={onOpenDashboard}
              className="text-[#dee5ff]/70 hover:text-[#dee5ff] transition-colors font-['Inter'] tracking-tight"
            >
              Analysis
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenDashboard}
              className="bg-primary hover:bg-[#192540]/50 hover:scale-[1.02] active:scale-95 transition-all cubic-bezier(0.4,0,0.2,1) text-on-primary-fixed px-6 py-2.5 rounded-full font-bold"
            >
              View Analysis
            </button>
            <button className="bg-surface-container-highest/40 hover:bg-surface-container-highest/60 transition-all text-on-surface px-6 py-2.5 rounded-full font-bold">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-24">
        <section className="relative overflow-hidden pt-20 pb-32 hero-gradient">
          <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">
            <div className="z-10">
              <h1 className="text-6xl md:text-7xl font-black tracking-tight leading-[1.1] text-on-background mb-6">
                Turn Your Resume Into a <span className="text-primary">Job-Winning Machine</span>
              </h1>
              <p className="text-xl text-on-surface-variant mb-10 max-w-xl">
                Architecture for your professional narrative. Powered by AI. Precision-engineered for modern talent.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="cta-gradient text-on-primary px-8 py-4 rounded-xl text-lg font-bold shadow-[0_0_40px_-10px_rgba(186,158,255,0.5)] hover:shadow-[0_0_50px_-5px_rgba(186,158,255,0.6)] transition-all flex items-center gap-2">
                  <span className="material-symbols-outlined">upload_file</span>
                  Upload Resume
                </button>
                <button className="bg-surface-container-highest/40 backdrop-blur-md px-8 py-4 rounded-xl text-lg font-bold border border-outline-variant/20 hover:bg-surface-container-highest/60 transition-all">
                  View Demo
                </button>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary opacity-30 blur-3xl group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative glass-panel rounded-lg border border-outline-variant/20 p-6 flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-outline-variant/10 pb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-error/50"></div>
                    <div className="w-3 h-3 rounded-full bg-secondary/50"></div>
                    <div className="w-3 h-3 rounded-full bg-primary/50"></div>
                  </div>
                  <span className="text-xs font-label uppercase tracking-widest text-on-surface-variant">Live Analysis</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/5">
                    <span className="text-[10px] text-on-surface-variant block mb-2">BEFORE</span>
                    <div className="space-y-2">
                      <div className="h-2 w-3/4 bg-outline-variant/20 rounded"></div>
                      <div className="h-2 w-full bg-outline-variant/20 rounded"></div>
                      <div className="h-2 w-5/6 bg-outline-variant/20 rounded"></div>
                    </div>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 shadow-[0_0_20px_rgba(186,158,255,0.1)]">
                    <span className="text-[10px] text-primary block mb-2">AFTER (AI OPTIMIZED)</span>
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-primary/40 rounded"></div>
                      <div className="h-2 w-full bg-primary/40 rounded"></div>
                      <div className="h-2 w-full bg-primary/40 rounded"></div>
                    </div>
                  </div>
                </div>
                <img
                  alt="A high-fidelity dashboard interface showing a resume being scanned with neon purple light beams and holographic professional data overlays"
                  className="rounded-lg shadow-2xl"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDda16XRNSGCYji7i6hPHSz2H7DSnQwOq2Fw9GCz2pb75yFMMrQUujkF9MO5jh1xemn211q7T7OVNR68kxj6oclM9xHeeq9XLSxtHc6sBG55eQh3HRp06xaDPQ2p6uJu9mwm8mGkWMtXhyzuqypNUrRq8rPaRQGEy9JeYbijxow_MCCcLzcZd4gvIypqLeTDVjceRlUfYRVCqQDzXf3Vx3I93FRw2an0cLAodcTSD9eed8m0k1cjjY4XTGiXdbHTIlUpL1kzi6_ojYM"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-24 bg-surface-container-low/50">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-on-background mb-4">Precision Engineering</h2>
              <p className="text-on-surface-variant">Crafted for the modern developer's career stack.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-panel p-8 rounded-lg border-t border-primary/20 group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>analytics</span>
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-3">ATS Score</h3>
                <p className="text-on-surface-variant leading-relaxed">Crush the filters with real-time scoring. Our engine simulates internal recruiting software to ensure you land on top.</p>
              </div>
              <div className="glass-panel p-8 rounded-lg border-t border-secondary/20 group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-6 text-secondary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-3">AI Optimization</h3>
                <p className="text-on-surface-variant leading-relaxed">Expert-level suggestions to polish every bullet point. We replace generic phrases with impact-driven technical narrative.</p>
              </div>
              <div className="glass-panel p-8 rounded-lg border-t border-tertiary/20 group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 bg-tertiary/10 rounded-lg flex items-center justify-center mb-6 text-tertiary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>target</span>
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-3">JD Matching</h3>
                <p className="text-on-surface-variant leading-relaxed">Tailor your resume to any job description in seconds. Identify keyword gaps and bridge them automatically.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                <span className="text-primary font-label uppercase tracking-widest text-xs mb-2 block">Success Stories</span>
                <h2 className="text-3xl md:text-5xl font-black text-on-background">Trusted by Industry Leads</h2>
              </div>
              <div className="flex gap-4">
                <div className="h-[1px] w-32 bg-outline-variant/30 mb-2"></div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-surface-container p-8 rounded-lg relative">
                <span className="text-6xl absolute top-4 right-4 text-primary/10 font-black italic">"</span>
                <div className="flex items-center gap-4 mb-6">
                  <img alt="Portrait of a software engineer in a modern workspace" className="w-12 h-12 rounded-full border border-primary/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwKwvbwKvgCDsnqS40nf8QPp4dtwvI161fZZ2lRJJUgKFHrAxq6JrEzxeHUMwuayaxNVF_BESfZtEaLmpCwTVT2cb6kP_yp5HF44F9yLgsZZd9-eUAs3VYQRB-_2S4gnVlqJVupoj3DpKfE9o4Q6YKoqXl6Mt8du6NYhRqBR2XuQH0gSMrfs7-ovLBPyA-uY04WY_bWkan39LAUa6fWN9snXQ2Z9yHwXGMdtwAitxdkKrjxZxqgQzWmsEB51mIGf6XRvKzHnQ9Q5tl" />
                  <div>
                    <h4 className="font-bold text-on-surface">Alex Rivera</h4>
                    <p className="text-xs text-on-surface-variant uppercase">Senior Dev at Vercel</p>
                  </div>
                </div>
                <p className="text-on-surface-variant leading-relaxed italic">"ResumeAI helped me reframe my backend experience into a story that FAANG recruiters actually wanted to read. I had 3 interviews in a week."</p>
              </div>
              <div className="bg-surface-container p-8 rounded-lg relative">
                <span className="text-6xl absolute top-4 right-4 text-primary/10 font-black italic">"</span>
                <div className="flex items-center gap-4 mb-6">
                  <img alt="Portrait of a female engineering manager in a brightly lit studio" className="w-12 h-12 rounded-full border border-primary/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8qczX8Dklmk7Naia1RWmZKOJH5zzvuSq99KQD0Ez2yH19KG8m9mpzqAy-eqJCAS0TUi4S_Qw2jzPLxbhclMDqwXnhAzb9HH_0_qOjFRqJA9QDhrRDSyTSMC07Od5QoehjdX-Ki8Q1Gqm-8i_7VlEWb_O0aHd1yx7h8-dt9se-eJCF-hsImFk0HKRnfsT-CFgo1Y-0QXun5MDhsL7puOXR6qXYd5767iZh113Tld5P_o89vUnAtqH-zwGowyBnFhE5nH6YAmFq_TNo" />
                  <div>
                    <h4 className="font-bold text-on-surface">Sarah Chen</h4>
                    <p className="text-xs text-on-surface-variant uppercase">Eng Manager at Stripe</p>
                  </div>
                </div>
                <p className="text-on-surface-variant leading-relaxed italic">"The JD matching is uncanny. It caught missing technologies that I actually knew but forgot to mention. A game changer for job seekers."</p>
              </div>
              <div className="bg-surface-container p-8 rounded-lg relative">
                <span className="text-6xl absolute top-4 right-4 text-primary/10 font-black italic">"</span>
                <div className="flex items-center gap-4 mb-6">
                  <img alt="Portrait of a young creative developer" className="w-12 h-12 rounded-full border border-primary/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXVRjvcfmtyCBDAx9CwdviJaZsnhsCEIK7fS9w2cE_fWDdQzHljuF48ybmaDORKQarw9JQTfk2bEGULKkhn6guAnkam3kT_HVYQiXpLl3tqKhAu3Vd4qXBNwkCavVeUvSo28yKq1yyxlbD-f4BaTkwnuLroFjoCaXuiT3aw_Tjo1nwWSVcFQ0j0Ag0FtefFDwyOT_IKHMLKqYr-11ojzNkirb2RYw7gDIT6uPRlb6ACrMQFTl9lqWSRxTuW6hJO73xFM6kKPajrQtQ" />
                  <div>
                    <h4 className="font-bold text-on-surface">Jordan Blake</h4>
                    <p className="text-xs text-on-surface-variant uppercase">Product Designer at Figma</p>
                  </div>
                </div>
                <p className="text-on-surface-variant leading-relaxed italic">"The editorial feel of the suggestions is what sets it apart. It doesn't sound like a bot wrote it; it sounds like a senior mentor polished it."</p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-24 bg-[#060e20]">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-black text-on-background mb-4">Architect Your Career</h2>
              <p className="text-on-surface-variant">Plans that scale with your professional growth.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 items-stretch">
              <div className="surface-container-low p-10 rounded-lg flex flex-col border border-outline-variant/10">
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-on-surface mb-2">Free</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-on-background">$0</span>
                    <span className="text-on-surface-variant">/mo</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  <li className="flex items-center gap-3 text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-sm" data-icon="check_circle">check_circle</span>
                    3 Resume Scans
                  </li>
                  <li className="flex items-center gap-3 text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-sm" data-icon="check_circle">check_circle</span>
                    Basic ATS Analysis
                  </li>
                  <li className="flex items-center gap-3 text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-sm" data-icon="check_circle">check_circle</span>
                    PDF Export
                  </li>
                </ul>
                <button className="w-full py-4 rounded-xl font-bold border border-outline-variant hover:bg-surface-container-highest transition-all">Get Started</button>
              </div>

              <div className="surface-container p-10 rounded-lg flex flex-col pro-border shadow-[0_0_60px_-15px_rgba(186,158,255,0.3)] relative transform scale-105 z-10">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-on-primary text-[10px] font-black uppercase tracking-widest">Best Value</div>
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-primary mb-2">Pro</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-on-background">$19</span>
                    <span className="text-on-surface-variant">/mo</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  <li className="flex items-center gap-3 text-on-surface">
                    <span className="material-symbols-outlined text-primary text-sm" data-icon="check_circle" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    Unlimited AI Optimization
                  </li>
                  <li className="flex items-center gap-3 text-on-surface">
                    <span className="material-symbols-outlined text-primary text-sm" data-icon="check_circle" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    JD-Matching Engine
                  </li>
                  <li className="flex items-center gap-3 text-on-surface">
                    <span className="material-symbols-outlined text-primary text-sm" data-icon="check_circle" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    Network Priority Access
                  </li>
                  <li className="flex items-center gap-3 text-on-surface">
                    <span className="material-symbols-outlined text-primary text-sm" data-icon="check_circle" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    Custom Domain Link
                  </li>
                </ul>
                <button className="w-full py-4 rounded-xl font-bold cta-gradient text-on-primary shadow-[0_10px_30px_-5px_rgba(186,158,255,0.4)] hover:scale-[1.02] transition-all">Upgrade to Pro</button>
              </div>

              <div className="surface-container-low p-10 rounded-lg flex flex-col border border-outline-variant/10">
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-on-surface mb-2">Team</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-on-background">$49</span>
                    <span className="text-on-surface-variant">/mo</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  <li className="flex items-center gap-3 text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-sm" data-icon="check_circle">check_circle</span>
                    10 User Licenses
                  </li>
                  <li className="flex items-center gap-3 text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-sm" data-icon="check_circle">check_circle</span>
                    Shared Asset Library
                  </li>
                  <li className="flex items-center gap-3 text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-sm" data-icon="check_circle">check_circle</span>
                    Hiring Dashboard
                  </li>
                </ul>
                <button className="w-full py-4 rounded-xl font-bold border border-outline-variant hover:bg-surface-container-highest transition-all">Contact Sales</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#060e20] w-full py-12 border-t border-[#40485d]/20">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto space-y-4 md:space-y-0">
          <div className="flex flex-col md:items-start items-center">
            <span className="text-lg font-bold text-[#dee5ff]">ResumeAI</span>
            <p className="text-[#dee5ff]/50 font-['Inter'] text-sm uppercase tracking-widest mt-2">© 2024 ResumeAI. Crafted by The Ethereal Architect.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a className="text-[#dee5ff]/50 hover:text-[#ba9eff] transition-colors font-['Inter'] text-sm uppercase tracking-widest" href="#privacy-policy">Privacy Policy</a>
            <a className="text-[#dee5ff]/50 hover:text-[#ba9eff] transition-colors font-['Inter'] text-sm uppercase tracking-widest" href="#terms-of-service">Terms of Service</a>
            <a className="text-[#dee5ff]/50 hover:text-[#ba9eff] transition-colors font-['Inter'] text-sm uppercase tracking-widest" href="#contact">Contact</a>
            <a className="text-[#dee5ff]/50 hover:text-[#ba9eff] transition-colors font-['Inter'] text-sm uppercase tracking-widest" href="#twitter">Twitter</a>
            <a className="text-[#dee5ff]/50 hover:text-[#ba9eff] transition-colors font-['Inter'] text-sm uppercase tracking-widest" href="#linkedin">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  return showDashboard ? (
    <AnalysisDashboard onBack={() => setShowDashboard(false)} />
  ) : (
    <LandingPage onOpenDashboard={() => setShowDashboard(true)} />
  );
}

export default App;
