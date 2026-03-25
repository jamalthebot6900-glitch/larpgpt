"use client";

import { useState, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import ExamplePrompts from "@/components/ExamplePrompts";
import ChatArea from "@/components/ChatArea";
import Showcase from "@/components/Showcase";
import { Scene } from "@/lib/scenes";
import Link from "next/link";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedScene, setSelectedScene] = useState<Scene | null>(null);
  const [initialPrompt, setInitialPrompt] = useState<string | null>(null);
  const [welcomeImage, setWelcomeImage] = useState<string | null>(null);
  const welcomeInputRef = useRef<HTMLTextAreaElement>(null);
  const welcomeImageRef = useRef<HTMLInputElement>(null);

  const handleNewChat = () => {
    setSelectedScene(null);
    setInitialPrompt(null);
    setWelcomeImage(null);
    setSidebarOpen(false);
    // Auto-focus the input after state updates
    setTimeout(() => {
      welcomeInputRef.current?.focus();
    }, 100);
  };

  const handleWelcomeImageAttach = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setWelcomeImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleExampleSelect = (prompt: string) => {
    // Fill the welcome input and focus it
    if (welcomeInputRef.current) {
      welcomeInputRef.current.value = prompt;
      welcomeInputRef.current.focus();
      // Trigger resize
      welcomeInputRef.current.style.height = "auto";
      welcomeInputRef.current.style.height = welcomeInputRef.current.scrollHeight + "px";
    }
  };

  const handleWelcomeSend = () => {
    const text = welcomeInputRef.current?.value?.trim();
    if (!text) return;
    setInitialPrompt(text);
    setSelectedScene({
      id: "custom",
      emoji: "",
      title: "Custom Larp",
      description: text,
      prompt: text,
      caption: "",
      hashtags: "",
      stats: { netWorth: "", followers: "", larpLevel: "∞" },
    });
  };

  return (
    <div className="h-screen overflow-hidden flex">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNewChat={handleNewChat}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col h-screen md:ml-[260px]">
        {/* Top nav bar */}
        <div
          className="px-3 md:px-5 py-2.5 flex items-center justify-between shrink-0"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          {/* Left: hamburger (mobile) + logo */}
          <div className="flex items-center gap-2">
            <button
              className="md:hidden w-9 h-9 rounded-lg border-none flex items-center justify-center text-lg cursor-pointer"
              style={{ background: "transparent", color: "var(--text-primary)" }}
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              ☰
            </button>
            <div className="flex items-center gap-2">
              <img src="/logo-transparent.png" alt="" style={{ height: "24px", width: "auto" }} />
              <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                LarpGPT
              </span>
            </div>
          </div>

          {/* Center: coin buttons */}
          <div className="flex items-center gap-1.5">
            <a
              href="https://x.com/Larp_GPT"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center py-2 px-5 rounded-lg text-[13px] font-semibold no-underline transition-all duration-150 min-w-[60px]"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
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
              𝕏
            </a>
            <a
              href="https://pump.fun/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center py-1.5 px-3 rounded-lg no-underline transition-all duration-150 min-w-[40px]"
              style={{
                background: "transparent",
                border: "1px solid var(--border)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--green)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              <img src="/pumpfun-logo.png" alt="Pump.fun" style={{ height: "22px", width: "auto" }} />
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText("CONTRACT_ADDRESS_HERE");
                const btn = document.getElementById("ca-btn");
                if (btn) { btn.textContent = "Copied!"; setTimeout(() => { btn.textContent = "CA"; }, 1500); }
              }}
              id="ca-btn"
              className="flex items-center justify-center py-2 px-5 rounded-lg text-[13px] font-semibold cursor-pointer transition-all duration-150 min-w-[60px]"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
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
              CA
            </button>
          </div>

          {/* Right: gallery link */}
          <Link
            href="/gallery"
            className="text-[12px] py-1.5 px-2.5 rounded-lg transition-colors duration-150 no-underline"
            style={{
              color: "var(--text-secondary)",
              border: "1px solid var(--border)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--green)";
              (e.currentTarget as HTMLElement).style.color = "var(--green)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
            }}
          >
            Gallery
          </Link>
        </div>

        {/* Content */}
        {selectedScene ? (
          <ChatArea selectedScene={selectedScene} onBack={handleNewChat} initialPrompt={initialPrompt} initialImage={welcomeImage} />
        ) : (
          <>
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col items-center py-8 md:py-12 px-4 md:px-5">
                <img src="/logo-transparent.png" alt="LarpGPT" className="w-16 h-16 mb-3 animate-fadeIn" />
                <h1 className="text-[26px] md:text-[28px] font-bold mb-2 animate-fadeIn">LarpGPT</h1>
                <p
                  className="text-[14px] md:text-[15px] mb-6 animate-fadeIn"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Upload a face. Pick a scene. Fake a lifestyle. No one will know.
                </p>

                <Showcase />

                <p
                  className="text-[12px] font-semibold uppercase mb-3 mt-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  Example prompts
                </p>
                <ExamplePrompts onSelect={handleExampleSelect} />

                <div className="h-8" />
              </div>
            </div>

            {/* Input bar on welcome screen */}
            <div className="px-4 md:px-5 pb-4 md:pb-6 pt-3 flex justify-center shrink-0">
              <div className="max-w-[680px] w-full">
                {/* Attached image preview */}
                {welcomeImage && (
                  <div className="mb-2 flex items-center gap-2">
                    <div className="relative inline-block">
                      <img
                        src={welcomeImage}
                        alt="Attached"
                        className="w-14 h-14 rounded-lg object-cover"
                        style={{ border: "2px solid var(--green)" }}
                      />
                      <button
                        onClick={() => setWelcomeImage(null)}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] cursor-pointer border-none"
                        style={{ background: "var(--text-muted)", color: "white" }}
                      >
                        ✕
                      </button>
                    </div>
                    <span className="text-[12px]" style={{ color: "var(--text-muted)" }}>
                      Photo ready — describe the scene and hit send
                    </span>
                  </div>
                )}

                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  {/* Image attach button */}
                  <button
                    onClick={() => welcomeImageRef.current?.click()}
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
                    ref={welcomeImageRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleWelcomeImageAttach(file);
                      e.target.value = "";
                    }}
                  />
                  <textarea
                    ref={welcomeInputRef}
                    placeholder={welcomeImage ? "Describe the scene..." : "Describe your larp... or tap an example above"}
                    rows={1}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleWelcomeSend();
                      }
                    }}
                    onPaste={(e) => {
                      const items = e.clipboardData?.items;
                      if (!items) return;
                      for (const item of Array.from(items)) {
                        if (item.type.startsWith("image/")) {
                          e.preventDefault();
                          const file = item.getAsFile();
                          if (file) handleWelcomeImageAttach(file);
                          return;
                        }
                      }
                    }}
                    onDrop={(e) => {
                      const file = e.dataTransfer?.files?.[0];
                      if (file?.type.startsWith("image/")) {
                        e.preventDefault();
                        handleWelcomeImageAttach(file);
                      }
                    }}
                    onDragOver={(e) => e.preventDefault()}
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
                    onClick={handleWelcomeSend}
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
                  LarpGPT generates fake lifestyle photos. Use responsibly. Or don&apos;t.
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
