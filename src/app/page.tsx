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
          className="px-5 py-3 flex items-center justify-between"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <button
            className="md:hidden w-9 h-9 rounded-lg border-none flex items-center justify-center text-lg cursor-pointer"
            style={{ background: "transparent", color: "var(--text-primary)" }}
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          <button
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg border-none text-sm font-semibold cursor-pointer"
            style={{ background: "transparent", color: "var(--text-primary)" }}
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
            className="text-xs py-1.5 px-3 rounded-lg transition-colors no-underline"
            style={{
              color: "var(--text-secondary)",
              border: "1px solid var(--border)",
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
            <div className="flex flex-col items-center justify-center py-10 px-5 min-h-full">
              <div className="text-5xl mb-4">🎭</div>
              <h1 className="text-[28px] font-bold mb-2">LarpGPT</h1>
              <p
                className="text-[15px] mb-8"
                style={{ color: "var(--text-secondary)" }}
              >
                Choose a scene. Upload your face. Become a legend.
              </p>

              <LarpOfTheDay />
              <SceneGrid onSelectScene={setSelectedScene} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
