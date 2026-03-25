"use client";

import { scenes, larpOfTheDay } from "@/lib/scenes";

export default function LarpOfTheDay() {
  const dayIndex = Math.floor(Date.now() / 86400000) % larpOfTheDay.length;
  const lotd = larpOfTheDay[dayIndex];
  const scene = scenes.find((s) => s.id === lotd.sceneId)!;

  return (
    <div
      className="max-w-[680px] w-full mb-6 rounded-xl overflow-hidden animate-fadeIn"
      style={{
        background: "var(--bg-secondary)",
        border: "1px solid var(--border)",
        animation: "fadeIn 0.4s ease-out, pulseGlow 4s ease-in-out infinite",
      }}
    >
      {/* Header badge */}
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <span
          className="text-[11px] font-bold uppercase"
          style={{ color: "var(--gold)" }}
        >
          🏆 Larp of the Day
        </span>
      </div>

      {/* Scene visual — full generated image */}
      <div
        className="w-full relative overflow-hidden"
        style={{ aspectRatio: "16/9" }}
      >
        <img
          src="/lotd-image.jpg"
          alt={`${lotd.persona} — ${scene.title}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay gradient for readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)",
          }}
        />
        {/* Scene badge overlay */}
        <div className="absolute bottom-3 left-4 flex items-center gap-2">
          <span className="text-2xl">{scene.emoji}</span>
          <h3
            className="text-sm md:text-base font-bold drop-shadow-lg"
            style={{ color: "var(--gold)" }}
          >
            {scene.title}
          </h3>
        </div>
      </div>

      {/* Caption & stats */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 mb-2">
          <img
            src="/lotd-avatar.jpg"
            alt={lotd.persona}
            className="w-7 h-7 rounded-full object-cover"
            style={{ border: "2px solid var(--gold)" }}
          />
          <span className="text-[13px] font-semibold" style={{ color: "var(--text-primary)" }}>
            {lotd.persona}
          </span>
          <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
            {lotd.handle}
          </span>
        </div>
        <p
          className="text-[13px] leading-relaxed mb-3"
          style={{ color: "var(--text-secondary)" }}
        >
          {lotd.caption}
        </p>
        <div className="flex gap-5 text-[12px]" style={{ color: "var(--text-muted)" }}>
          <span>
            ❤️{" "}
            <span style={{ color: "var(--gold)", fontWeight: 600 }}>{lotd.likes}</span>
          </span>
          <span>
            💬{" "}
            <span style={{ color: "var(--gold)", fontWeight: 600 }}>{lotd.comments}</span>
          </span>
          <span>
            🔄{" "}
            <span style={{ color: "var(--gold)", fontWeight: 600 }}>{lotd.shares}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
