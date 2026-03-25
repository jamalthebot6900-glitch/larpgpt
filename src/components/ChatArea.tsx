"use client";

import { useState, useRef, useEffect } from "react";
import { Scene } from "@/lib/scenes";
import UploadModal from "./UploadModal";
import LarpResult from "./LarpResult";

interface Message {
  role: "user" | "bot";
  text: string;
  showUpload?: boolean;
  larpResult?: {
    scene: Scene;
    imageUrl: string | null;
    demo: boolean;
  };
}

interface ChatAreaProps {
  selectedScene: Scene | null;
  onBack: () => void;
}

export default function ChatArea({ selectedScene, onBack }: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [genStep, setGenStep] = useState("");
  const [input, setInput] = useState("");
  const [customPrompt, setCustomPrompt] = useState<string | null>(null);
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Suppress unused var warning
  void onBack;

  useEffect(() => {
    if (!selectedScene) {
      setMessages([]);
      return;
    }

    setMessages([
      {
        role: "user",
        text: `I want the ${selectedScene.emoji} ${selectedScene.title} larp`,
      },
    ]);

    const timer = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: `Perfect choice. The ${selectedScene.title} scene is one of our most convincing larps. 🔥\n\nI'll need a selfie to put you in the scene. The AI will handle the rest — lighting, angle, that "I definitely own this" energy.\n\nReady to upload your photo?`,
          showUpload: true,
        },
      ]);
    }, 800);

    return () => clearTimeout(timer);
  }, [selectedScene]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, generating]);

  const handleGenerate = async (base64: string, prompt?: string) => {
    setShowUpload(false);
    // Only show upload message if coming from the modal (not inline)
    if (!prompt && !customPrompt) {
      setMessages((prev) => [
        ...prev,
        { role: "user", text: "📸 [Selfie uploaded]" },
      ]);
    }
    setGenerating(true);
    setGenStep("Crafting your larp...");

    const effectivePrompt = prompt || customPrompt;

    try {
      const body: Record<string, string> = { selfieBase64: base64 };
      if (effectivePrompt) {
        body.customPrompt = effectivePrompt;
      } else if (selectedScene) {
        body.sceneId = selectedScene.id;
      }

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Generation failed");

      setGenStep("Rendering photorealistic scene...");
      const data = await res.json();

      setGenStep("Final touches...");
      await new Promise((r) => setTimeout(r, 500));

      setGenerating(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Your larp is ready. Go touch grass (in your imaginary mansion's garden). 🎭",
          larpResult: {
            scene: data.scene || selectedScene!,
            imageUrl: data.imageUrl,
            demo: data.demo || false,
          },
        },
      ]);
    } catch {
      setGenerating(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Something went wrong generating your larp. Try again? The AI must be jealous of your lifestyle. 😤",
        },
      ]);
    }
  };

  const handleAttachImage = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setAttachedImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSend = () => {
    const text = input.trim();
    const hasImage = !!attachedImage;
    const hasText = !!text;

    if (!hasImage && !hasText) return;

    setInput("");

    // Show user message with image preview if attached
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: hasImage && hasText
          ? `📸 [Photo attached]\n${text}`
          : hasImage
          ? "📸 [Photo attached]"
          : text,
      },
    ]);

    if (hasImage && hasText) {
      // Image + text → generate immediately
      const imgBase64 = attachedImage!;
      setAttachedImage(null);
      setCustomPrompt(text);
      handleGenerate(imgBase64, text);
      return;
    }

    if (hasImage && !hasText) {
      // Image only, no prompt yet → ask what they want
      const imgBase64 = attachedImage!;
      setAttachedImage(null);
      // Store image for later use with scene selection or text
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Got your photo. 📸\n\nNow tell me — what's the larp? Describe the scene you want, or pick one from the presets above.",
        },
      ]);
      // Store the image so the next text message triggers generation
      setCustomPrompt(null);
      setAttachedImage(imgBase64);
      return;
    }

    if (hasText && !hasImage) {
      // Text only, no image yet
      setCustomPrompt(text);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: `That's a fire concept. I'll make it look real as hell. 🔥\n\nUpload a selfie and I'll put you right in it.`,
            showUpload: true,
          },
        ]);
      }, 800);
    }
  };

  return (
    <>
      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="flex flex-col">
          {messages.map((msg, i) => (
            <div
              key={i}
              className="py-5 md:py-6 flex gap-3 md:gap-4 max-w-[680px] w-full mx-auto px-4 md:px-5 animate-fadeIn"
            >
              {/* Avatar */}
              <div
                className="w-8 h-8 md:w-9 md:h-9 rounded-full shrink-0 flex items-center justify-center text-sm md:text-base"
                style={{
                  background:
                    msg.role === "user"
                      ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                      : "var(--green)",
                }}
              >
                {msg.role === "user" ? "🧑" : "🎭"}
              </div>

              {/* Content */}
              <div className="flex-1 text-[14px] md:text-[15px] leading-relaxed min-w-0">
                {msg.text.split("\n").map((line, j) => (
                  <p key={j} className={line ? "mb-2.5" : "mb-1"}>
                    {line}
                  </p>
                ))}

                {msg.showUpload && (
                  <div className="mt-3">
                    <button
                      onClick={() => setShowUpload(true)}
                      className="py-2.5 px-5 rounded-lg text-[13px] font-semibold cursor-pointer border-none transition-all duration-150"
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
                      📸 Upload Selfie
                    </button>
                  </div>
                )}

                {msg.larpResult && (
                  <LarpResult
                    scene={msg.larpResult.scene}
                    imageUrl={msg.larpResult.imageUrl}
                    demo={msg.larpResult.demo}
                  />
                )}
              </div>
            </div>
          ))}

          {/* Typing/generating indicator */}
          {generating && (
            <div className="py-5 md:py-6 flex gap-3 md:gap-4 max-w-[680px] w-full mx-auto px-4 md:px-5 animate-fadeIn">
              <div
                className="w-8 h-8 md:w-9 md:h-9 rounded-full shrink-0 flex items-center justify-center text-sm md:text-base"
                style={{ background: "var(--green)" }}
              >
                🎭
              </div>
              <div className="flex-1">
                <div className="flex gap-1.5 py-2">
                  {[0, 1, 2].map((dotIdx) => (
                    <span
                      key={dotIdx}
                      className="w-2 h-2 rounded-full inline-block"
                      style={{
                        background: "var(--text-muted)",
                        animation: `typingBounce 1.4s infinite ease-in-out ${dotIdx * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
                <div className="text-[12px] mt-1" style={{ color: "var(--text-muted)" }}>
                  {genStep}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input area */}
      <div className="px-4 md:px-5 pb-4 md:pb-6 pt-3 flex justify-center shrink-0">
        <div className="max-w-[680px] w-full">
          {/* Attached image preview */}
          {attachedImage && (
            <div className="mb-2 flex items-center gap-2">
              <div className="relative inline-block">
                <img
                  src={attachedImage}
                  alt="Attached"
                  className="w-14 h-14 rounded-lg object-cover"
                  style={{ border: "2px solid var(--green)" }}
                />
                <button
                  onClick={() => setAttachedImage(null)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] cursor-pointer border-none"
                  style={{ background: "var(--text-muted)", color: "white" }}
                >
                  ✕
                </button>
              </div>
              <span className="text-[12px]" style={{ color: "var(--text-muted)" }}>
                Photo ready — describe the larp and hit send
              </span>
            </div>
          )}

          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            {/* Image attach button */}
            <button
              onClick={() => imageInputRef.current?.click()}
              title="Attach photo"
              style={{
                position: "absolute",
                left: "10px",
                width: "34px",
                height: "34px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                color: "var(--text-muted)",
                transition: "color 0.15s",
                fontSize: "18px",
                zIndex: 2,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              📎
            </button>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleAttachImage(file);
                e.target.value = "";
              }}
            />
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              onPaste={(e) => {
                const items = e.clipboardData?.items;
                if (!items) return;
                for (const item of Array.from(items)) {
                  if (item.type.startsWith("image/")) {
                    e.preventDefault();
                    const file = item.getAsFile();
                    if (file) handleAttachImage(file);
                    return;
                  }
                }
              }}
              onDrop={(e) => {
                const file = e.dataTransfer?.files?.[0];
                if (file?.type.startsWith("image/")) {
                  e.preventDefault();
                  handleAttachImage(file);
                }
              }}
              onDragOver={(e) => e.preventDefault()}
              placeholder={attachedImage ? "Describe the larp..." : "Describe your larp, or attach a photo + scene"}
              rows={1}
              style={{
                width: "100%",
                padding: "14px 56px 14px 48px",
                borderRadius: "12px",
                fontSize: "15px",
                outline: "none",
                resize: "none",
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
                minHeight: "52px",
                fontFamily: "inherit",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--green)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            />
            <button
              onClick={handleSend}
              style={{
                position: "absolute",
                right: "10px",
                width: "34px",
                height: "34px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--green)",
                color: "white",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--green-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--green)")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
          <div className="text-center text-[11px] mt-2" style={{ color: "var(--text-muted)" }}>
            LarpGPT can generate convincing larps. Use responsibly. Or don&apos;t. 🎭
          </div>
        </div>
      </div>

      <UploadModal
        isOpen={showUpload}
        onClose={() => setShowUpload(false)}
        onGenerate={handleGenerate}
      />
    </>
  );
}
