import { useState } from 'react';
import SideNav from './SideNav';
import Topbar from './Topbar';
import UploadCard from './UploadCard';
import DashboardCards from './DashboardCards';
import JobDescriptionCard from './JobDescriptionCard';
import SkillsGapCard from './SkillsGapCard';
import AISuggestionsCard from './AISuggestionsCard';
import EvolutionPreviewCard from './EvolutionPreviewCard';
import { uploadResume, analyzeJobDescription, optimizeResume } from '../utils/api';

export default function AnalysisDashboard({ onBack }) {
  const [jobDescription, setJobDescription] = useState('');
  const [uploadPreview, setUploadPreview] = useState('No file uploaded yet.');
  const [uploadError, setUploadError] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [statusMessage, setStatusMessage] = useState('Upload a resume to get started.');

  const matchedSkills = ['React.js', 'TypeScript', 'Tailwind CSS', 'Figma'];
  const missingSkills = ['GraphQL', 'Next.js 14', 'Unit Testing'];

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File exceeds 10MB limit.');
      setUploadPreview('');
      return;
    }

    setUploadError('');
    setUploadPreview(file.name);
    setStatusMessage('Uploading resume...');
    setLoading(true);

    try {
      const result = await uploadResume(file);
      setResumeText(result.text || 'Resume text extracted successfully.');
      setStatusMessage('Resume uploaded and text extracted successfully.');
    } catch (error) {
      setUploadError(error.message || 'Resume upload failed.');
      setStatusMessage('Upload failed. Please try again.');
      setResumeText('');
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      setStatusMessage('Please paste a job description before analyzing.');
      return;
    }
    setLoading(true);
    setStatusMessage('Analyzing job description...');
    try {
      const result = await analyzeJobDescription(jobDescription);
      const keywordSummary = result.keywords?.length ? result.keywords.join(', ') : 'No keywords detected.';
      const roleSummary = result.roles?.length ? result.roles.join(', ') : 'No roles detected.';

      setOutput({
        summary: `Found ${result.keywords?.length ?? 0} key terms and ${result.roles?.length ?? 0} role matches.`,
        recommendations: [
          `Match your resume language to these keywords: ${keywordSummary}`,
          `Emphasize experience relevant to: ${roleSummary}`,
        ],
      });
      setStatusMessage('Job description analyzed successfully.');
    } catch (error) {
      setStatusMessage(error.message || 'Analysis failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleOptimize = async () => {
    if (!resumeText) {
      setStatusMessage('Upload a resume first to optimize it.');
      return;
    }
    if (!jobDescription.trim()) {
      setStatusMessage('Please paste a job description before optimizing.');
      return;
    }

    setLoading(true);
    setStatusMessage('Optimizing resume with AI...');

    try {
      const result = await optimizeResume(resumeText, jobDescription);
      const optimizedResume = result.optimized_resume || {};
      const recommendations = [
        `Score improvement: ${result.score_after?.toFixed(1) || 'N/A'}%`,
        ...(optimizedResume.skills?.length ? optimizedResume.skills : ['Use clearer metrics and action-focused language.']),
      ];

      setOutput({
        summary: optimizedResume.summary || 'Resume optimization complete.',
        recommendations,
      });
      setStatusMessage('Resume optimized successfully.');
    } catch (error) {
      setStatusMessage(error.message || 'Resume optimization failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUploadPreview('No file uploaded yet.');
    setUploadError('');
    setResumeText('');
    setJobDescription('');
    setOutput(null);
    setStatusMessage('Upload a resume to get started.');
  };

  return (
    <div className="min-h-screen bg-[#060e20] text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container">
      <SideNav />
      <Topbar />

      <main className="ml-72 pt-20">
        <div className="px-8 pb-16">
          <div className="mb-10 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-primary/80">Resume Dashboard</p>
              <h1 className="mt-4 text-5xl font-black tracking-tight text-on-background">Resume Dashboard</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-on-surface-variant">
                Optimize your professional narrative with architectural precision.
              </p>
            </div>
            <button
              type="button"
              onClick={onBack}
              className="rounded-full bg-surface-container-highest px-5 py-3 text-sm font-semibold text-on-surface transition hover:bg-surface-container/80"
            >
              Back to Landing
            </button>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
            <div className="grid gap-6">
              <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
                <UploadCard
                  uploadPreview={uploadPreview}
                  uploadError={uploadError}
                  onFileChange={handleFileChange}
                  loading={loading}
                />
                <DashboardCards />
              </div>

              <div className="grid gap-6 xl:grid-cols-[0.9fr_1fr]">
                <JobDescriptionCard
                  jobDescription={jobDescription}
                  onChange={(event) => setJobDescription(event.target.value)}
                  onAnalyze={handleAnalyze}
                  loading={loading}
                />
                <SkillsGapCard matchedSkills={matchedSkills} missingSkills={missingSkills} />
              </div>
            </div>

            <div className="space-y-6">
              <AISuggestionsCard onOptimize={handleOptimize} onReset={handleReset} loading={loading} />
              <EvolutionPreviewCard />
              <div className="rounded-[2rem] border border-white/10 bg-surface-container p-8 shadow-glow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary mb-2">Download Optimized</p>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      Export your optimized resume with recruiter-ready formatting and language.
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-3xl text-primary">download</span>
                </div>
                <button
                  type="button"
                  className="mt-8 w-full rounded-full bg-gradient-to-r from-primary to-primary-dim px-5 py-4 text-sm font-black uppercase tracking-[0.24em] text-[#060e20] shadow-lg shadow-primary/30 transition hover:brightness-110"
                >
                  Download Optimized
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-[2rem] border border-white/10 bg-surface-container p-6 shadow-glow">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-primary mb-3">Status</p>
            <p className="text-sm text-on-surface-variant">{statusMessage}</p>
          </div>

          {output && (
            <div className="mt-6 rounded-[2rem] border border-white/10 bg-surface-container p-8 shadow-glow">
              <h2 className="text-lg font-semibold text-on-background">Analysis Summary</h2>
              <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{output.summary}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {output.recommendations.map((recommendation) => (
                  <div key={recommendation} className="rounded-3xl border border-white/10 bg-[#091728] p-4">
                    <p className="text-sm text-on-surface">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
