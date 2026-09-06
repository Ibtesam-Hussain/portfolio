 'use client';

import { useState } from 'react';

export default function Work() {
  const [showAllProjects, setShowAllProjects] = useState(false);

  const featuredProject = {
    title: 'Final Year Project: Hybrid monocular depth estimation for clinical wound imaging',
    description:
      'Fused SIFT/MAGSAC/SGBM/WLS stereo geometry on Gemini-synthesized pseudo-stereo pairs with a pretrained monocular depth model, combined via Laplacian pyramid fusion with erosion masking.',
    metrics: [
      { label: 'Calibrated stereo range', value: '43.1%' },
      { label: 'Image pairs evaluated', value: '57' },
      { label: 'Average runtime', value: '3.8s' },
    ],
  };

  const otherProjects = [
    {
      title: 'Hybrid RAG Research Assistant',
      description:
        'Production-grade retrieval-augmented generation with hybrid retrieval architecture.',
      tags: ['RAG', 'LLMs', 'Retrieval'],
      href: 'https://github.com/Ibtesam-Hussain/FYP-research-assistant',
    },
    {
      title: 'AICR — AI Code Review Assistant',
      description: 'Fine-tuned model for automated code review and feedback.',
      tags: ['Fine-tuning', 'ML', 'DevTools'],
      href: 'https://github.com/Ibtesam-Hussain/AICR',
    },
    {
      title: 'JobAgent',
      description:
        'Autonomous job-board monitoring agent with autonomous task execution.',
      tags: ['LangChain', 'Playwright', 'SQLite', 'Twilio'],
      href: 'https://github.com/Ibtesam-Hussain/Job-Agent-Alerter',
    },
    {
      title: 'ConsciousDay Agent',
      description: 'Productivity assistant powered by DeepSeek R1 and Streamlit.',
      tags: ['DeepSeek R1', 'Streamlit', 'Agents'],
      href: 'https://github.com/Ibtesam-Hussain/ConsciousDay-Agent',
    },
    {
      title: 'Digit Classification with Website Interface',
      description:
        'Digit Classification using Deep Learning with Website Interface Integration. MNIST digit classification with an ANN trained on 70,000 handwritten digit images.',
      tags: ['ANN', 'MNIST', 'Deep Learning', 'Website'],
      href: 'https://github.com/Ibtesam-Hussain/Digit-Classification-ML-DL-With-Website-Interface',
    },
  ];

  const visibleProjects = showAllProjects ? otherProjects : otherProjects.slice(0, 2);

  return (
    <section id="work" className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-32">
        <h2 className="mb-12 text-4xl font-bold text-ink">Work</h2>

        {/* Featured Project */}
        <div className="mb-16 overflow-hidden rounded-lg border border-line bg-paper-dim">
          {/* Visual Panel */}
          <div className="h-48 bg-linear-to-br from-ink/5 to-signal/10" />

          {/* Content */}
          <div className="space-y-6 p-8">
            <div>
              <h3 className="mb-3 text-2xl font-bold text-ink">
                {featuredProject.title}
              </h3>
              <p className="text-lg text-ink-soft">
                {featuredProject.description}
              </p>
            </div>

            {/* Metric Strip */}
            <div className="border-t border-line">
              <div className="grid gap-6 pt-6 sm:grid-cols-3">
                {featuredProject.metrics.map(metric => (
                  <div key={metric.label}>
                    <div className="font-mono text-sm font-medium text-signal">
                      {metric.value}
                    </div>
                    <p className="text-sm text-ink-soft">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {visibleProjects.map(project => (
            <div
              key={project.title}
              className="flex flex-col justify-between rounded-lg border border-line bg-paper p-6 transition-all hover:border-signal hover:bg-paper-dim"
            >
              <div className="mb-4 space-y-3">
                <h3 className="text-lg font-bold text-ink">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-signal"
                  >
                    {project.title}
                  </a>
                </h3>
                <p className="text-sm text-ink-soft">
                  {project.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex rounded-full border border-line bg-paper-dim px-3 py-1 text-xs font-medium text-ink-soft"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-8">
          <button
            type="button"
            onClick={() => setShowAllProjects(!showAllProjects)}
            className="text-sm font-medium text-signal transition-all duration-300 hover:text-ink hover:underline"
          >
            {showAllProjects ? 'See less ←' : 'See more →'}
          </button>
        </div>
      </div>
    </section>
  );
}
