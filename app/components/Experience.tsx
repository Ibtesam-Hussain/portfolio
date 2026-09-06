export default function Experience() {
  const experiences = [
    {
      role: 'Final Year Project Team Lead',
      company: 'FAST-NUCES Karachi',
      date: 'Sept 2025 – May 2026',
      description:
        'Led a 3-person final year project on hybrid monocular depth estimation for clinical imaging.',
    },
    {
      role: 'AI Software Engineer Intern',
      company: 'Aykays',
      date: 'July 2025 - Sept 2025',
      description:
        'Fine-tuned GPT-4.1 and Mistral 7B via LangChain/OpenRouter. Built Flask ML inference APIs for production use.',
    },
    {
      role: 'Freelance Developer',
      company: 'Self-employed',
      date: 'June 2024 – July 2025',
      description:
        'Built inventory, invoicing, and ledger software for a footwear manufacturing client.',
    },
  ];

  return (
    <section id="experience" className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-32">
        <h2 className="mb-12 text-4xl font-bold text-ink">Experience</h2>

        {/* Timeline */}
        <div className="space-y-8 border-l border-line pl-8">
          {experiences.map((exp, index) => (
            <div key={`${exp.company}-${index}`} className="relative">
              {/* Timeline Dot */}
              <div className="absolute -left-10.5 top-1 h-5 w-5 rounded-full border-2 border-signal bg-paper" />

              {/* Content */}
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-ink">{exp.role}</h3>
                    <p className="text-sm text-signal">{exp.company}</p>
                  </div>
                </div>
                <p className="font-mono text-xs text-ink-soft">{exp.date}</p>
                <p className="text-base text-ink-soft">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
