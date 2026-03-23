"use client";

import { useCallback, useState, useRef } from "react";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (base64: string) => void;
}

export default function UploadModal({
  isOpen,
  onClose,
  onGenerate,
}: UploadModalProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="rounded-2xl p-8 max-w-[440px] w-[90%] text-center relative"
        style={{
          background: "var(--bg-secondary)",
          border: "1px solid var(--border)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl bg-transparent border-none cursor-pointer"
          style={{ color: "var(--text-muted)" }}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-2">Upload Your Selfie</h2>
        <p className="text-[13px] mb-6" style={{ color: "var(--text-muted)" }}>
          We&apos;ll put your face in the scene. The more ridiculous, the better.
        </p>

        {!preview ? (
          <div
            className={`rounded-xl p-10 cursor-pointer transition-all mb-4 ${
              dragging ? "scale-[1.02]" : ""
            }`}
            style={{
              border: `2px dashed ${dragging ? "var(--green)" : "var(--border)"}`,
              background: dragging ? "var(--green-glow)" : "transparent",
            }}
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
          >
            <div className="text-[40px] mb-3">📸</div>
            <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Click to upload or drag & drop
            </div>
            <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              PNG, JPG up to 10MB
            </div>
          </div>
        ) : (
          <div className="mb-4">
            <img
              src={preview}
              alt="Preview"
              className="max-w-[200px] max-h-[200px] rounded-lg mx-auto"
              style={{ border: "2px solid var(--green)" }}
            />
            <button
              className="mt-3 text-xs cursor-pointer bg-transparent border-none"
              style={{ color: "var(--text-muted)" }}
              onClick={() => {
                setPreview(null);
                if (fileRef.current) fileRef.current.value = "";
              }}
            >
              Change photo
            </button>
          </div>
        )}

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />

        {preview && (
          <button
            onClick={() => onGenerate(preview)}
            className="w-full py-3 rounded-xl text-[15px] font-semibold cursor-pointer border-none transition-colors"
            style={{ background: "var(--green)", color: "white" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--green-hover)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "var(--green)")
            }
          >
            🎭 Generate My Larp
          </button>
        )}
      </div>
    </div>
  );
}
