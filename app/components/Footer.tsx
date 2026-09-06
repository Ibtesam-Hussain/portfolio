export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t border-line bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-32">
        {/* Contact Section */}
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-5xl font-bold leading-tight text-ink lg:text-6xl">
              Let's work together.
            </h2>
            <p className="max-w-2xl text-lg text-ink-soft">
              I'm always interested in hearing about new projects and opportunities. Feel free to reach out.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <div>
              <a
                href="mailto:ibtesamh786@gmail.com"
                className="inline-flex items-center gap-2 text-lg font-medium text-signal transition-colors hover:text-signal/80"
              >
                ibtesamh786@gmail.com
                <span className="text-ink-soft">→</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-6 pt-4">
              <a
                href="https://github.com/Ibtesam-Hussain"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-soft transition-colors hover:text-signal"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/ibtesam-hussain-37a2b2300/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-soft transition-colors hover:text-signal"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Fine Print */}
        <div className="border-t border-line pt-12 mt-12">
          <p className="text-xs text-ink-soft">
            © {currentYear} Ibtesam Hussain. All rights reserved. Built with 💟.
          </p>
        </div>
      </div>
    </footer>
  );
}
