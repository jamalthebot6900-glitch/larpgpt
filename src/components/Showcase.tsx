"use client";

import { useState, useEffect } from "react";

const showcaseItems = [
  {
    label: "Yacht Party",
    image: "/showcase/yacht.jpg",
  },
  {
    label: "Lambo & Mansion",
    image: "/showcase/lambo.jpg",
  },
  {
    label: "Strip Club VIP",
    image: "/showcase/strip.jpg",
  },
  {
    label: "Bank Heist",
    image: "/showcase/heist.jpg",
  },
  {
    label: "Ice'd Out",
    image: "/showcase/iced.jpg",
  },
  {
    label: "Private Jet",
    image: "/showcase/jet.jpg",
  },
];

export default function Showcase() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % showcaseItems.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const item = showcaseItems[current];

  return (
    <div
      className="max-w-[680px] w-full mb-6 rounded-xl overflow-hidden animate-fadeIn"
      style={{
        background: "var(--bg-secondary)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Image */}
      <div
        className="w-full relative overflow-hidden"
        style={{ aspectRatio: "16/9" }}
      >
        <img
          key={item.image}
          src={item.image}
          alt={item.label}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            animation: "fadeIn 0.5s ease-out",
          }}
          onError={(e) => {
            // Fallback gradient if image not found
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Fallback gradient */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
          }}
        >
          <span className="text-2xl font-bold" style={{ color: "var(--text-muted)" }}>
            {item.label}
          </span>
        </div>
        {/* Bottom overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 40%)",
          }}
        />
        <div className="absolute bottom-3 left-4 z-10">
          <span
            className="text-sm font-bold drop-shadow-lg"
            style={{ color: "white" }}
          >
            {item.label}
          </span>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 py-2.5">
        {showcaseItems.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="border-none cursor-pointer rounded-full transition-all duration-200"
            style={{
              width: i === current ? "20px" : "6px",
              height: "6px",
              background: i === current ? "var(--green)" : "var(--border)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
