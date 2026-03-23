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
      a.download = `larpgpt-${scene.id}-${Date.now()}.jpg`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      window.open(imageUrl, "_blank");
    }
  }, [imageUrl, scene.id]);

  const handleCopy = useCallback(async () => {
    if (!imageUrl) return;
    try {
      const res = await fetch(imageUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ]);
      alert("Image copied to clipboard! 📋");
    } catch {
      // Fallback: copy caption
      navigator.clipboard.writeText(`${scene.caption}\n\n${scene.hashtags}`);
      alert("Caption copied to clipboard! 📋");
    }
  }, [imageUrl, scene]);

  const handleShareX = useCallback(() => {
    const text = encodeURIComponent(
      `${scene.caption}\n\n${scene.hashtags}\n\nMade with larpgpt.vercel.app 🎭`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  }, [scene]);

  const handleShareIG = useCallback(() => {
    if (imageUrl) {
      // Copy image + caption for IG
      navigator.clipboard.writeText(`${scene.caption}\n\n${scene.hashtags}`);
      alert(
        "Caption copied! Download the image and paste the caption on Instagram 📱"
      );
    }
  }, [imageUrl, scene]);

  return (
    <div
      className="mt-4 rounded-xl overflow-hidden"
      style={{
        border: "1px solid var(--border)",
        background: "var(--bg-secondary)",
      }}
    >
      {/* Image */}
      <div
        className="w-full aspect-square flex items-center justify-center relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
        }}
      >
        {imageUrl && !demo ? (
          <img
            src={imageUrl}
            alt={scene.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center px-10">
            <div className="text-[80px] mb-4" style={{ fontFamily: "'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif" }}>{scene.emoji}</div>
            <h3
              className="text-lg font-bold mb-2"
              style={{ color: "var(--gold)" }}
            >
              {scene.title}
            </h3>
            <p className="text-[13px]" style={{ color: "var(--text-muted)" }}>
              {demo
                ? "Demo mode — add FAL_KEY for real generation"
                : "Your face + AI magic = pure larp gold"}
            </p>
          </div>
        )}
      </div>

      {/* Caption */}
      <div className="px-4 py-3">
        <p className="text-sm leading-relaxed mb-3">{scene.caption}</p>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          {scene.hashtags}
        </p>
      </div>

      {/* Stats */}
      <div
        className="px-4 py-3 flex gap-4 text-xs"
        style={{ color: "var(--text-muted)" }}
      >
        <span>
          💰 Net Worth:{" "}
          <span style={{ color: "var(--gold)", fontWeight: 600 }}>
            {scene.stats.netWorth}
          </span>
        </span>
        <span>
          👥 Followers:{" "}
          <span style={{ color: "var(--gold)", fontWeight: 600 }}>
            {scene.stats.followers}
          </span>
        </span>
        <span>
          🎭 Larp Level:{" "}
          <span style={{ color: "var(--gold)", fontWeight: 600 }}>
            {scene.stats.larpLevel}
          </span>
        </span>
      </div>

      {/* Action buttons */}
      <div className="px-4 pb-3 flex flex-wrap gap-2">
        <button
          onClick={handleDownload}
          className="py-1.5 px-3.5 rounded-md text-xs cursor-pointer transition-colors border-none font-medium"
          style={{ background: "var(--green)", color: "white" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "var(--green-hover)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "var(--green)")
          }
        >
          ⬇️ Download
        </button>
        <button
          onClick={handleCopy}
          className="py-1.5 px-3.5 rounded-md text-xs cursor-pointer transition-colors"
          style={{
            border: "1px solid var(--border)",
            background: "transparent",
            color: "var(--text-secondary)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--green)";
            e.currentTarget.style.color = "var(--green)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--text-secondary)";
          }}
        >
          📋 Copy Image
        </button>
        <button
          onClick={handleShareX}
          className="py-1.5 px-3.5 rounded-md text-xs cursor-pointer transition-colors"
          style={{
            border: "1px solid var(--border)",
            background: "transparent",
            color: "var(--text-secondary)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--green)";
            e.currentTarget.style.color = "var(--green)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--text-secondary)";
          }}
        >
          🐦 Share to X
        </button>
        <button
          onClick={handleShareIG}
          className="py-1.5 px-3.5 rounded-md text-xs cursor-pointer transition-colors"
          style={{
            border: "1px solid var(--border)",
            background: "transparent",
            color: "var(--text-secondary)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--green)";
            e.currentTarget.style.color = "var(--green)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--text-secondary)";
          }}
        >
          📱 Share to IG
        </button>
      </div>
    </div>
  );
}
