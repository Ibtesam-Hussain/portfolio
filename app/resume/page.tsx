'use client';

import { useState } from 'react';

type ResumeType = 'ai' | 'mle' | 'swe';

const RESUMES = [
  { id: 'ai' as ResumeType, label: 'AI Engineer', file: '/Ibtesam Hussain AI Engineer Resume.pdf' },
  { id: 'mle' as ResumeType, label: 'MLE', file: '/Ibtesam Hussain MLE Resume.pdf' },
  { id: 'swe' as ResumeType, label: 'SWE', file: '/Ibtesam Hussain SWE Resume.pdf' },
];

export default function ResumePage() {
  const [currentResume, setCurrentResume] = useState<ResumeType>('ai');

  const selectedResume = RESUMES.find(r => r.id === currentResume);

  return (
    <main className="min-h-screen bg-paper text-ink">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-ink">Resume</h1>
        </div>

        {/* Resume Toggle */}
        <div className="mb-8 inline-flex rounded-full border border-line bg-paper p-1">
          {RESUMES.map((resume) => (
            <button
              key={resume.id}
              onClick={() => setCurrentResume(resume.id)}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-200  cursor-pointer ${
                currentResume === resume.id
                  ? 'bg-signal text-paper shadow-md'
                  : 'text-ink-soft hover:text-ink'
              }`}
            >
              {resume.label}
            </button>
          ))}
        </div>

        {/* PDF Viewer */}
        <div className="flex justify-center">
          <div className="w-full max-w-4xl rounded-lg border-2 border-line bg-white shadow-lg transition-all duration-300">
            {selectedResume && (
              <iframe
                key={selectedResume.id}
                src={selectedResume.file}
                className="h-[85vh] w-full rounded-lg"
                title={`${selectedResume.label} Resume`}
              />
            )}
          </div>
        </div>

        {/* Back to Portfolio Button */}
        <div className="mt-8 flex justify-center">
          <a
            href="/"
            className="rounded-full border-2 border-line bg-paper px-8 py-3 font-medium text-ink transition-all duration-200 hover:border-signal hover:text-signal cursor-pointer"
          >
            ← Back to Portfolio
          </a>
        </div>
      </div>
    </main>
  );
}
