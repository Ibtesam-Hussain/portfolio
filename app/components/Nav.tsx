'use client';

import { useState, useEffect } from 'react';

const navItems = [
  { name: 'Work', href: '#work' },
  { name: 'Experience', href: '#experience' },
  { name: 'Notes', href: '#notes' },
  { name: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [activeSection, setActiveSection] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Scroll-spy: determine which section is in view
      const sections = ['work', 'experience', 'notes', 'contact'];
      let currentSection = '';

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Section is considered active if its top is within viewport
          if (rect.top <= 150 && rect.bottom > 150) {
            currentSection = sectionId;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check on mount
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo/Initials */}
        <a href="#hero" className="text-2xl font-bold text-ink hover:text-signal transition-colors">
          Ibtesam Hussain
        </a>

        {/* Desktop Nav */}
        <div className="hidden gap-8 md:flex">
          {navItems.map(item => {
            const sectionId = item.href.slice(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`relative text-sm font-medium transition-colors group ${
                  isActive
                    ? 'text-signal'
                    : 'text-ink-soft hover:text-ink'
                }`}
              >
                {item.name}
                {/* Underline that transitions left to right on hover and when active */}
                <span
                  className={`absolute top-5 bottom-0 left-0 h-0.5 bg-ink transition-all duration-300 ${
                    isActive ? 'right-0' : 'right-full group-hover:right-0'
                  }`}
                />
              </a>
            );
          })}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6 text-ink"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu with smooth dropdown */}
      <div
        className={`border-t border-line bg-paper-dim overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="space-y-2 px-6 py-4">
          {navItems.map(item => {
            const sectionId = item.href.slice(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`block text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-signal'
                    : 'text-ink-soft hover:text-ink'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
