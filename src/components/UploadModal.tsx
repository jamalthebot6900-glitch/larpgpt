"use client";

import { useCallback, useState, useRef } from "react";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (base64: string) => void;
}

export default function UploadModal({ isOpen, onClose, onGenerate }: UploadModalProps) {
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

  const resetAndClose = useCallback(() => {
    setPreview(null);
    setDragging(false);
    if (fileRef.current) fileRef.current.value = "";
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      onClick={resetAndClose}
    >
      <div
        className="rounded-2xl p-6 md:p-8 max-w-[420px] w-full text-center relative animate-fadeIn"
        style={{
          background: "var(--bg-secondary)",
          border: "1px solid var(--border)",
          boxShadow: "0 24px 48px rgba(0,0,0,0.4)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={resetAndClose}
          className="absolute top-3 right-4 text-xl bg-transparent border-none cursor-pointer transition-colors duration-150"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
        >
          ✕
        </button>

        <h2 className="text-lg md:text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
          Upload Your Selfie
        </h2>
        <p className="text-[13px] mb-5" style={{ color: "var(--text-muted)" }}>
          We&apos;ll put your face in the scene. The more ridiculous, the better.
        </p>

        {!preview ? (
          <div
            className="rounded-xl p-8 md:p-10 cursor-pointer transition-all duration-200 mb-4"
            style={{
              border: `2px dashed ${dragging ? "var(--green)" : "var(--border)"}`,
              background: dragging ? "var(--green-glow)" : "transparent",
              transform: dragging ? "scale(1.02)" : "scale(1)",
            }}
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
          >
            <div className="text-[36px] mb-3">📸</div>
            <div className="text-[14px] font-medium" style={{ color: "var(--text-secondary)" }}>
              Click to upload or drag & drop
            </div>
            <div className="text-[12px] mt-1.5" style={{ color: "var(--text-muted)" }}>
              PNG, JPG up to 10MB
            </div>
          </div>
        ) : (
          <div className="mb-5">
            <img
              src={preview}
              alt="Your selfie preview"
              className="max-w-[180px] max-h-[180px] rounded-lg mx-auto object-cover"
              style={{ border: "2px solid var(--green)" }}
            />
            <button
              className="mt-3 text-[12px] cursor-pointer bg-transparent border-none transition-colors duration-150 block mx-auto"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
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
            onClick={() => {
              onGenerate(preview);
              setPreview(null);
              if (fileRef.current) fileRef.current.value = "";
            }}
            className="w-full py-3 rounded-xl text-[15px] font-semibold cursor-pointer border-none transition-all duration-150"
            style={{ background: "var(--green)", color: "white" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--green-hover)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--green)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            🎭 Generate My Larp
          </button>
        )}
      </div>
    </div>
  );
}
