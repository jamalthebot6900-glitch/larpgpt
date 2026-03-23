"use client";

import { useState } from "react";
import { scenes, galleryItems } from "@/lib/scenes";
import Link from "next/link";

export default function GalleryPage() {
  const [filter, setFilter] = useState<string>("all");

  const filtered =
    filter === "all"
      ? galleryItems
      : galleryItems.filter((g) => g.sceneId === filter);

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Header */}
      <div
        className="px-5 py-4 flex items-center justify-between"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 no-underline"
          style={{ color: "var(--text-primary)" }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-semibold">Back to LarpGPT</span>
        </Link>
        <h1 className="text-lg font-bold">🖼️ Gallery</h1>
        <div className="w-[100px]" />
      </div>

      {/* Filters */}
      <div className="px-5 py-4 flex gap-2 overflow-x-auto">
        <button
          onClick={() => setFilter("all")}
          className="py-1.5 px-4 rounded-full text-xs font-medium cursor-pointer transition-colors whitespace-nowrap border-none"
          style={{
            background:
              filter === "all" ? "var(--green)" : "var(--bg-secondary)",
            color:
              filter === "all" ? "white" : "var(--text-secondary)",
          }}
        >
          All Larps
        </button>
        {scenes.map((scene) => (
          <button
            key={scene.id}
            onClick={() => setFilter(scene.id)}
            className="py-1.5 px-4 rounded-full text-xs font-medium cursor-pointer transition-colors whitespace-nowrap border-none"
            style={{
              background:
                filter === scene.id ? "var(--green)" : "var(--bg-secondary)",
              color:
                filter === scene.id ? "white" : "var(--text-secondary)",
            }}
          >
            {scene.emoji} {scene.title}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="px-5 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[1200px] mx-auto">
        {filtered.map((item) => {
          const scene = scenes.find((s) => s.id === item.sceneId)!;
          return (
            <div
              key={item.id}
              className="rounded-xl overflow-hidden transition-all duration-200"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--green)";
                e.currentTarget.style.boxShadow =
                  "0 0 20px var(--green-glow)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Placeholder image */}
              <div
                className="w-full aspect-square flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
                }}
              >
                <div className="text-center">
                  <div className="text-6xl mb-3">{scene.emoji}</div>
                  <div
                    className="text-sm font-semibold"
                    style={{ color: "var(--gold)" }}
                  >
                    {scene.title}
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[10px]"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--green), #0ea5e9)",
                    }}
                  >
                    🎭
                  </div>
                  <span className="text-sm font-semibold">{item.persona}</span>
                  <span
                    className="text-[11px]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {item.handle}
                  </span>
                </div>
                <p
                  className="text-[13px] leading-relaxed mb-3"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.caption}
                </p>
                <div
                  className="flex gap-4 text-[11px]"
                  style={{ color: "var(--text-muted)" }}
                >
                  <span>
                    ❤️{" "}
                    <span style={{ color: "var(--gold)", fontWeight: 600 }}>
                      {item.likes}
                    </span>
                  </span>
                  <span>
                    💬{" "}
                    <span style={{ color: "var(--gold)", fontWeight: 600 }}>
                      {item.comments}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
