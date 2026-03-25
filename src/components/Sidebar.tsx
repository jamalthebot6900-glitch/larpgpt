"use client";

import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNewChat: () => void;
}

export default function Sidebar({ isOpen, onClose, onNewChat }: SidebarProps) {
  return (
    <>
      {/* Backdrop overlay for mobile */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      />

      <aside
        className={`fixed left-0 top-0 w-[260px] h-screen flex flex-col z-50 border-r transition-transform duration-300 ease-out md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background: "var(--bg-sidebar)",
          borderColor: "var(--border)",
        }}
      >
        {/* Header */}
        <div className="p-3 shrink-0 flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)" }}>
          <span className="text-[14px] font-bold" style={{ color: "var(--text-primary)" }}>
            LarpGPT
          </span>
          <button
            className="md:hidden w-8 h-8 rounded-lg border-none flex items-center justify-center cursor-pointer"
            style={{ background: "transparent", color: "var(--text-muted)" }}
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* New Larp button */}
        <div className="p-3 shrink-0">
          <button
            onClick={() => { onNewChat(); onClose(); }}
            className="w-full py-2.5 px-3 rounded-lg text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors duration-150 cursor-pointer border-none"
            style={{ background: "var(--green)", color: "white" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--green-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--green)")}
          >
            + New Larp
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-[13px] no-underline transition-colors duration-150 mb-1"
            style={{ color: "var(--text-secondary)" }}
            onClick={onClose}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--bg-hover)";
              e.currentTarget.style.color = "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
          >
            Home
          </Link>
          <Link
            href="/gallery"
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-[13px] no-underline transition-colors duration-150 mb-1"
            style={{ color: "var(--text-secondary)" }}
            onClick={onClose}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--bg-hover)";
              e.currentTarget.style.color = "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
          >
            Gallery
          </Link>
        </div>

        {/* Footer — social links */}
        <div className="p-3 shrink-0 flex gap-2" style={{ borderTop: "1px solid var(--border)" }}>
          <a
            href="https://x.com/larpgpt"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 rounded-lg text-[12px] font-semibold no-underline text-center transition-colors duration-150"
            style={{ color: "var(--text-secondary)", border: "1px solid var(--border)" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--green)"; e.currentTarget.style.color = "var(--text-primary)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
          >
            𝕏
          </a>
          <a
            href="https://pump.fun/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 rounded-lg text-[12px] font-semibold no-underline text-center transition-colors duration-150"
            style={{ background: "transparent", border: "1px solid var(--border)" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--green)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            <img src="/pumpfun-logo.png" alt="Pump.fun" style={{ height: "18px", width: "auto" }} />
          </a>
        </div>
      </aside>
    </>
  );
}
