"use client";

import { useState, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import ExamplePrompts from "@/components/ExamplePrompts";
import ChatArea from "@/components/ChatArea";
import LarpOfTheDay from "@/components/LarpOfTheDay";
import { Scene } from "@/lib/scenes";
import Link from "next/link";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedScene, setSelectedScene] = useState<Scene | null>(null);
  const [initialPrompt, setInitialPrompt] = useState<string | null>(null);
  const welcomeInputRef = useRef<HTMLTextAreaElement>(null);

  const handleNewChat = () => {
    setSelectedScene(null);
    setInitialPrompt(null);
    setSidebarOpen(false);
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
    // Create a fake scene to enter chat mode
    setSelectedScene({
      id: "custom",
      emoji: "🎭",
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
        {/* Top bar */}
        <div
          className="px-4 md:px-5 py-3 flex items-center justify-between shrink-0"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <button
            className="md:hidden w-9 h-9 rounded-lg border-none flex items-center justify-center text-lg cursor-pointer"
            style={{ background: "transparent", color: "var(--text-primary)" }}
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            ☰
          </button>
          {/* Spacer for desktop so model selector stays centered */}
          <div className="hidden md:block w-[80px]" />
          <button
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg border-none text-sm font-semibold cursor-pointer transition-colors duration-150"
            style={{ background: "transparent", color: "var(--text-primary)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            🎭 LarpGPT-4o
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--text-muted)"
              strokeWidth="2"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          <Link
            href="/gallery"
            className="text-xs py-1.5 px-3 rounded-lg transition-colors duration-150 no-underline"
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
            🖼️ Gallery
          </Link>
        </div>

        {/* Content */}
        {selectedScene ? (
          <ChatArea selectedScene={selectedScene} onBack={handleNewChat} initialPrompt={initialPrompt} />
        ) : (
          <>
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col items-center py-8 md:py-12 px-4 md:px-5">
                <div className="text-5xl mb-4 animate-fadeIn">🎭</div>
                <h1 className="text-[26px] md:text-[28px] font-bold mb-2 animate-fadeIn">LarpGPT</h1>
                <p
                  className="text-[14px] md:text-[15px] mb-6 animate-fadeIn"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Pick an example or describe your own. Add your face. Become a legend.
                </p>

                <LarpOfTheDay />

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
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <textarea
                    ref={welcomeInputRef}
                    placeholder="Describe your larp... or tap an example above"
                    rows={1}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleWelcomeSend();
                      }
                    }}
                    style={{
                      width: "100%",
                      padding: "14px 56px 14px 16px",
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
                  LarpGPT can generate convincing larps. Use responsibly. Or don&apos;t. 🎭
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
