"use client";

import { Scene } from "@/lib/scenes";
import { useCallback, useState } from "react";

interface LarpResultProps {
  scene: Scene;
  imageUrl: string | null;
  demo: boolean;
}

function ActionButton({
  children,
  primary,
  onClick,
}: {
  children: React.ReactNode;
  primary?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="py-2 px-3.5 rounded-lg text-[12px] font-medium cursor-pointer transition-all duration-150 border-none"
      style={{
        background: primary ? "var(--green)" : "transparent",
        color: primary ? "white" : "var(--text-secondary)",
        border: primary ? "none" : "1px solid var(--border)",
      }}
      onMouseEnter={(e) => {
        if (primary) {
          e.currentTarget.style.background = "var(--green-hover)";
        } else {
          e.currentTarget.style.borderColor = "var(--green)";
          e.currentTarget.style.color = "var(--green)";
        }
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        if (primary) {
          e.currentTarget.style.background = "var(--green)";
        } else {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.color = "var(--text-secondary)";
        }
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {children}
    </button>
  );
}

export default function LarpResult({ scene, imageUrl, demo }: LarpResultProps) {
  const [copied, setCopied] = useState(false);

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
    if (imageUrl) {
      try {
        const res = await fetch(imageUrl);
        const blob = await res.blob();
        await navigator.clipboard.write([
          new ClipboardItem({ [blob.type]: blob }),
        ]);
      } catch {
        await navigator.clipboard.writeText(`${scene.caption}\n\n${scene.hashtags}`);
      }
    } else {
      await navigator.clipboard.writeText(`${scene.caption}\n\n${scene.hashtags}`);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [imageUrl, scene]);

  const handleShareX = useCallback(() => {
    const text = encodeURIComponent(
      `${scene.caption}\n\n${scene.hashtags}\n\nMade with larpgpt.vercel.app 🎭`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  }, [scene]);

  const handleShareIG = useCallback(async () => {
    await navigator.clipboard.writeText(`${scene.caption}\n\n${scene.hashtags}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [scene]);

  return (
    <div
      className="mt-4 rounded-xl overflow-hidden animate-fadeIn"
      style={{
        border: "1px solid var(--border)",
        background: "var(--bg-secondary)",
      }}
    >
      {/* Image / Placeholder */}
      <div
        className="w-full flex items-center justify-center relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
          aspectRatio: "1",
        }}
      >
        {imageUrl && !demo ? (
          <img
            src={imageUrl}
            alt={scene.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center px-8">
            <div className="text-7xl mb-4">{scene.emoji}</div>
            <h3 className="text-lg font-bold mb-2" style={{ color: "var(--gold)" }}>
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
        <p className="text-[14px] leading-relaxed mb-2">{scene.caption}</p>
        <p className="text-[12px]" style={{ color: "var(--text-muted)" }}>
          {scene.hashtags}
        </p>
      </div>

      {/* Stats */}
      <div
        className="px-4 py-2.5 flex flex-wrap gap-4 text-[12px]"
        style={{ color: "var(--text-muted)", borderTop: "1px solid var(--border)" }}
      >
        <span>
          💰 Net Worth:{" "}
          <span style={{ color: "var(--gold)", fontWeight: 600 }}>{scene.stats.netWorth}</span>
        </span>
        <span>
          👥 Followers:{" "}
          <span style={{ color: "var(--gold)", fontWeight: 600 }}>{scene.stats.followers}</span>
        </span>
        <span>
          🎭 Larp Level:{" "}
          <span style={{ color: "var(--gold)", fontWeight: 600 }}>{scene.stats.larpLevel}</span>
        </span>
      </div>

      {/* Actions */}
      <div
        className="px-4 py-3 flex flex-wrap gap-2"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <ActionButton primary onClick={handleDownload}>
          ⬇️ Download
        </ActionButton>
        <ActionButton onClick={handleCopy}>
          {copied ? "✅ Copied!" : "📋 Copy"}
        </ActionButton>
        <ActionButton onClick={handleShareX}>🐦 Share to X</ActionButton>
        <ActionButton onClick={handleShareIG}>📱 Share to IG</ActionButton>
      </div>
    </div>
  );
}
