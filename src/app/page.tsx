"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import SceneGrid from "@/components/SceneGrid";
import ChatArea from "@/components/ChatArea";
import LarpOfTheDay from "@/components/LarpOfTheDay";
import { Scene } from "@/lib/scenes";
import Link from "next/link";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedScene, setSelectedScene] = useState<Scene | null>(null);

  const handleNewChat = () => {
    setSelectedScene(null);
    setSidebarOpen(false);
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
          <ChatArea selectedScene={selectedScene} onBack={handleNewChat} />
        ) : (
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col items-center py-8 md:py-12 px-4 md:px-5">
              <div className="text-5xl mb-4 animate-fadeIn">🎭</div>
              <h1 className="text-[26px] md:text-[28px] font-bold mb-2 animate-fadeIn">LarpGPT</h1>
              <p
                className="text-[14px] md:text-[15px] mb-8 animate-fadeIn"
                style={{ color: "var(--text-secondary)" }}
              >
                Choose a scene. Upload your face. Become a legend.
              </p>

              <LarpOfTheDay />
              <SceneGrid onSelectScene={setSelectedScene} />

              {/* Bottom spacer for scroll */}
              <div className="h-8" />
            </div>
          </div>
        )}

        {/* Input bar — only on welcome screen */}
        {!selectedScene && (
          <div className="px-4 md:px-5 pb-4 md:pb-6 pt-3 flex justify-center shrink-0">
            <div className="max-w-[680px] w-full">
              <div className="relative">
                <textarea
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
        )}
      </div>
    </div>
  );
}
