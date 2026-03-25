"use client";

import { useState, useEffect, useCallback } from "react";

const showcaseItems = [
  { image: "/showcase/rolls.jpg" },
  { image: "/showcase/gas_urus.jpg" },
  { image: "/showcase/redcarpet.jpg" },
  { image: "/showcase/dubai_pool.jpg" },
  { image: "/showcase/penthouse.jpg" },
  { image: "/showcase/maybach_cigar.jpg" },
  { image: "/showcase/scarface.jpg" },
  { image: "/showcase/helicopter.jpg" },
  { image: "/showcase/yacht2.jpg" },
  { image: "/showcase/bank_vault.jpg" },
  { image: "/showcase/lambo2.jpg" },
  { image: "/showcase/ferrari_rain.jpg" },
  { image: "/showcase/mansion_pool.jpg" },
  { image: "/showcase/gucci_shop.jpg" },
  { image: "/showcase/strip2.jpg" },
  { image: "/showcase/rekt.jpg" },
  { image: "/showcase/mcdonalds.jpg" },
  { image: "/showcase/yacht.jpg" },
  { image: "/showcase/yacht3.jpg" },
];

export default function Showcase() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(-1);
  const [direction, setDirection] = useState(1);

  const advance = useCallback(() => {
    setPrev(current);
    setDirection(1);
    setCurrent((c) => (c + 1) % showcaseItems.length);
  }, [current]);

  useEffect(() => {
    const interval = setInterval(advance, 3500);
    return () => clearInterval(interval);
  }, [advance]);

  return (
    <div className="max-w-[680px] w-full mb-6 relative">
      {/* Glass container */}
      <div
        className="rounded-2xl overflow-hidden relative"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.5), 0 0 120px rgba(16,163,127,0.04)",
        }}
      >
        <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
          {/* Render all images, only current and prev are visible */}
          {showcaseItems.map((item, i) => {
            const isCurrent = i === current;
            const isPrev = i === prev;
            const isVisible = isCurrent || isPrev;

            return (
              <img
                key={i}
                src={item.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  opacity: isCurrent ? 1 : isPrev ? 0 : 0,
                  transform: isCurrent
                    ? "scale(1) translateX(0)"
                    : isPrev
                    ? `scale(1.02) translateX(${direction * -3}%)`
                    : "scale(1.05)",
                  transition: isVisible
                    ? "opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), transform 1.4s cubic-bezier(0.4, 0, 0.2, 1)"
                    : "none",
                  zIndex: isCurrent ? 2 : isPrev ? 1 : 0,
                  willChange: isVisible ? "opacity, transform" : "auto",
                }}
              />
            );
          })}

          {/* Subtle vignette */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)",
            }}
          />

          {/* Glass reflection effect — top edge */}
          <div
            className="absolute top-0 left-0 right-0 h-[40%] pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)",
            }}
          />
        </div>
      </div>

      {/* Ambient glow */}
      <div
        className="absolute -inset-8 -z-10 rounded-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(16,163,127,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
          animation: "pulseGlow 4s ease-in-out infinite",
        }}
      />

      <style jsx>{`
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
