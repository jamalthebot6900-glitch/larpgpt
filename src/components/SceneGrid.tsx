"use client";

import { Scene, scenes } from "@/lib/scenes";

interface SceneGridProps {
  onSelectScene: (scene: Scene) => void;
}

export default function SceneGrid({ onSelectScene }: SceneGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[680px] w-full px-5">
      {scenes.map((scene) => (
        <div
          key={scene.id}
          onClick={() => onSelectScene(scene)}
          className="rounded-xl p-4 cursor-pointer transition-all duration-200 group"
          style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--green)";
            e.currentTarget.style.background = "var(--bg-hover)";
            e.currentTarget.style.boxShadow = "0 0 20px var(--green-glow)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.background = "var(--bg-secondary)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <div className="text-[28px] mb-2" style={{ fontFamily: "'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif" }}>{scene.emoji}</div>
          <div className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
            {scene.title}
          </div>
          <div className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {scene.description}
          </div>
        </div>
      ))}
    </div>
  );
}
