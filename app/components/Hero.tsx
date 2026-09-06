'use client';

import { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const [animate, setAnimate] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const graphicRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    setAnimate(true);
    const t = setTimeout(() => setRevealed(true), 550); // starts after hero text settles
    return () => clearTimeout(t);
  }, []);

  const getAnimationStyle = (index: number) => {
    if (prefersReducedMotion) return {};
    return {
      opacity: animate ? 1 : 0,
      transform: animate ? 'translateY(0)' : 'translateY(12px)',
      transition: `all 0.6s ease-out ${index * 0.1}s`,
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = graphicRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setOffset({ x, y });
  };

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

  const layers = [
    { d: 'M20,240 C 80,200 120,260 180,220 S 300,180 340,210', opacity: 0.85, depth: 14 },
    { d: 'M20,200 C 80,160 120,220 180,180 S 300,140 340,170', opacity: 0.65, depth: 9 },
    { d: 'M20,160 C 80,120 120,180 180,140 S 300,100 340,130', opacity: 0.45, depth: 5 },
    { d: 'M20,120 C 80,80 120,140 180,100 S 300,60 340,90', opacity: 0.3, depth: 2 },
  ];

  return (
    <section id="hero" className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: Text */}
          <div className="space-y-8">
            <div style={getAnimationStyle(0)}>
              <h1 className="text-5xl font-bold leading-tight text-ink lg:text-6xl">
                AI Engineer building production systems.
              </h1>
            </div>

            <div style={getAnimationStyle(1)}>
              <p className="text-lg text-ink-soft">
                Specializing in Computer Vision, Machine Learing, Agentic Systems and MLOPs.
              </p>
            </div>

            <div className="flex flex-wrap gap-4" style={getAnimationStyle(2)}>
              <a
                href="#contact"
                className="inline-flex items-center rounded-md bg-signal px-6 py-3 font-medium text-paper transition-all duration-300 hover:border-2 hover:border-ink hover:scale-95 active:scale-95"
              >
                Get in touch
              </a>
              <a
                href="#work"
                className="inline-flex items-center rounded-md border-2 border-ink px-6 py-3 font-medium text-ink transition-all duration-300 hover:bg-signal hover:text-paper"
              >
                View work
              </a>
            </div>

            <div className="border-t border-line pt-4">
                <div className="font-mono text-xl font-bold text-signal">Achievement Status</div>
            </div>
            <div className="grid gap-6 pt-2 sm:grid-cols-3" style={getAnimationStyle(3)}>
              
              <div className="pt-4">
                <div className="font-mono text-xl font-bold text-signal">43.1%</div>
                <p className="text-sm text-ink-soft">Calibrated stereo range, FYP depth model</p>
              </div>
              <div className="pt-4">
                <div className="font-mono text-xl font-bold text-signal">97.6%</div>
                <p className="text-sm text-ink-soft">MNIST accuracy, CNN digit recognizer</p>
              </div>
              <div className="pt-4">
                <div className="font-mono text-xl font-bold text-signal">3</div>
                <p className="text-sm text-ink-soft">Person team led, final year project</p>
              </div>
            </div>
          </div>

          {/* Right: Depth-contour graphic — draws in on load, parallaxes on cursor move */}
          <div
            ref={graphicRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={getAnimationStyle(1)}
            className="flex items-center justify-center"
          >
            <svg
              className="h-100 w-full"
              viewBox="0 0 360 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g className="text-signal" stroke="currentColor" strokeWidth="1.4">
                {layers.map((layer, i) => (
                  <path
                    key={i}
                    d={layer.d}
                    opacity={layer.opacity}
                    pathLength={1}
                    style={{
                      strokeDasharray: 1,
                      strokeDashoffset: revealed || prefersReducedMotion ? 0 : 1,
                      transition: `stroke-dashoffset 1.1s ease ${i * 0.15}s, transform 0.3s ease-out`,
                      transform: prefersReducedMotion
                        ? 'none'
                        : `translate(${offset.x * layer.depth}px, ${offset.y * layer.depth}px)`,
                    }}
                  />
                ))}
              </g>

              <g className="text-ink" stroke="currentColor" strokeWidth="1" opacity="0.5">
                <line x1="20" y1="20" x2="20" y2="280" />
                <line x1="20" y1="280" x2="340" y2="280" />
              </g>

              <g
                className="text-ink"
                fill="currentColor"
                style={{
                  transform: prefersReducedMotion
                    ? 'none'
                    : `translate(${offset.x * 6}px, ${offset.y * 6}px)`,
                  transition: 'transform 0.3s ease-out',
                }}
              >
                <circle cx="180" cy="220" r="3" />
                <circle cx="180" cy="180" r="3" />
              </g>

              <text x="188" y="200" className="fill-ink font-mono" fontSize="10">
                Δ 43.1%
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}