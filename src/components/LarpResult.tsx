"use client";

import { Scene } from "@/lib/scenes";
import { useCallback } from "react";

interface LarpResultProps {
  scene: Scene;
  imageUrl: string | null;
  demo: boolean;
}

export default function LarpResult({ scene, imageUrl, demo }: LarpResultProps) {
  const handleDownload = useCallback(async () => {
    if (!imageUrl) return;
    try {
      const res = await fetch(imageUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `larpgpt-${Date.now()}.jpg`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      window.open(imageUrl, "_blank");
    }
  }, [imageUrl]);

  const handleShareX = useCallback(() => {
    const text = encodeURIComponent(
      `just got larped 🎭\n\nmade with larpgpt.xyz`
    );
    const url = imageUrl ? `&url=${encodeURIComponent(imageUrl)}` : "";
    window.open(
      `https://twitter.com/intent/tweet?text=${text}${url}`,
      "_blank"
    );
  }, [imageUrl]);

  return (
    <div
      className="mt-4 rounded-xl overflow-hidden animate-fadeIn"
      style={{
        border: "1px solid var(--border)",
        background: "var(--bg-secondary)",
      }}
    >
      {/* Image */}
      <div className="w-full relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        {imageUrl && !demo ? (
          <img
            src={imageUrl}
            alt="Generated larp"
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)" }}
          >
            <p className="text-[13px]" style={{ color: "var(--text-muted)" }}>
              {demo ? "Demo mode — FAL_KEY not set" : "Generating..."}
            </p>
          </div>
        )}
      </div>

      {/* Actions — just download + share */}
      <div className="px-4 py-3 flex gap-2">
        <button
          onClick={handleDownload}
          className="flex-1 py-2.5 rounded-lg text-[13px] font-semibold cursor-pointer border-none transition-all duration-150"
          style={{ background: "var(--green)", color: "white" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--green-hover)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--green)")}
        >
          Download
        </button>
        <button
          onClick={handleShareX}
          className="flex-1 py-2.5 rounded-lg text-[13px] font-semibold cursor-pointer transition-all duration-150"
          style={{
            background: "transparent",
            color: "var(--text-secondary)",
            border: "1px solid var(--border)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--green)";
            e.currentTarget.style.color = "var(--text-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--text-secondary)";
          }}
        >
          Share on 𝕏
        </button>
      </div>
    </div>
  );
}
