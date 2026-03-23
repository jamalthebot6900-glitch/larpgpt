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
  const scrollRef = useRef<HTMLDivElement>(null);

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

  const handleGenerate = async (base64: string) => {
    setShowUpload(false);
    setMessages((prev) => [
      ...prev,
      { role: "user", text: "📸 [Selfie uploaded]" },
    ]);
    setGenerating(true);
    setGenStep("Generating scene...");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sceneId: selectedScene!.id,
          selfieBase64: base64,
        }),
      });

      if (!res.ok) throw new Error("Generation failed");

      setGenStep("Swapping face...");
      const data = await res.json();

      setGenStep("Finishing up...");
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

  const handleSend = () => {
    if (!input.trim()) return;
    const text = input.trim();
    setInput("");

    setMessages((prev) => [...prev, { role: "user", text }]);

    setTimeout(() => {
      const responses = [
        "That's a wild larp idea. I can make it happen. Pick a scene from the options, or describe exactly what kind of flex you want and I'll set it up. 🎭",
        "Love the energy. Let me cook something up. First — upload a selfie so I can put your face in this fantasy. 📸",
        "Now THAT would break Instagram. Choose one of the preset scenes or describe your dream larp and we'll make it real (fake). 🔥",
        "You thinking luxury? Crypto gains? Celebrity vibes? Give me a direction and I'll generate the most convincing larp you've ever seen. 💰",
      ];
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: responses[Math.floor(Math.random() * responses.length)],
        },
      ]);
    }, 1000);
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
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Describe your larp... or pick a scene above"
              rows={1}
              className="w-full py-3.5 pl-4 pr-14 rounded-xl text-[15px] outline-none resize-none"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
                minHeight: "52px",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--green)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            />
            <button
              onClick={handleSend}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-[34px] h-[34px] rounded-lg border-none cursor-pointer flex items-center justify-center transition-colors duration-150"
              style={{ background: "var(--green)", color: "white" }}
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
