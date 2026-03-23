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

      {/* Scene visual */}
      <div
        className="w-full relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
          aspectRatio: "16/9",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-8">
            <div className="text-6xl md:text-7xl mb-3">{scene.emoji}</div>
            <h3
              className="text-base md:text-lg font-bold mb-1"
              style={{ color: "var(--gold)" }}
            >
              {scene.title}
            </h3>
            <p className="text-[12px]" style={{ color: "var(--text-muted)" }}>
              by {lotd.persona}
            </p>
          </div>
        </div>
        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, var(--gold-glow) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Caption & stats */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold"
            style={{ background: "linear-gradient(135deg, var(--gold), #f59e0b)" }}
          >
            👑
          </div>
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
