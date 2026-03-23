"use client";

import { Scene, scenes } from "@/lib/scenes";

interface SceneGridProps {
  onSelectScene: (scene: Scene) => void;
}

export default function SceneGrid({ onSelectScene }: SceneGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[680px] w-full px-1">
      {scenes.map((scene, i) => (
        <button
          key={scene.id}
          onClick={() => onSelectScene(scene)}
          className="rounded-xl p-4 cursor-pointer text-left transition-all duration-200 animate-fadeIn"
          style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border)",
            animationDelay: `${i * 50}ms`,
            animationFillMode: "backwards",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--green)";
            e.currentTarget.style.background = "var(--bg-hover)";
            e.currentTarget.style.boxShadow = "0 0 24px var(--green-glow), 0 0 48px rgba(16, 163, 127, 0.08)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.background = "var(--bg-secondary)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <div className="text-[28px] mb-2 leading-none">{scene.emoji}</div>
          <div className="text-[14px] font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
            {scene.title}
          </div>
          <div className="text-[12px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {scene.description}
          </div>
        </button>
      ))}
    </div>
  );
}
