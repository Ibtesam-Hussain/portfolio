export default function About() {
  const skills = [
    'Depth Estimation',
    'Retrieval-Augmented Generation',
    'Fine-tuning',
    'LangChain',
    'Computer Vision',
    'TypeScript',
    'Python',
    'FastAPI',
    'Flask',
    'PostgreSQL',
    'Vector DBs',
    'Prompt Engineering',
  ];

  return (
    <section id="about" className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-32">
        <h2 className="mb-12 text-4xl font-bold text-ink">About</h2>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Bio */}
          <div className="space-y-4">
            <p className="text-lg text-ink-soft">
              Hello, I'm a full-stack AI engineer with a background in Artificial Intelligence and Machine Learning. I specialize in building production-grade systems that combine cutting-edge ML models with robust software engineering.
            </p>
            <p className="text-lg text-ink-soft">
              Currently focused on Computer Vision and retrieval-augmented generation systems. Previously built fine-tuning pipelines for LLMs and autonomous agents at scale.
            </p>
            <p className="text-lg text-ink-soft">
              I'm passionate about delivering AI native solutions and shipping products that work and maintaining clean, maintainable code under real-world constraints.
            </p>
          </div>

          {/* Skills Tag Cloud */}
          <div>
            <div className="flex flex-wrap gap-3">
              {skills.map(skill => (
                <span
                  key={skill}
                  className="inline-flex rounded-full border border-line bg-paper-dim px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-signal hover:text-signal"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
