"use client";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNewChat: () => void;
}

const fakeHistory = {
  Today: [
    "🏎️ Lamborghini Dubai Marina",
    "💰 $2M Portfolio Flex",
    "✈️ Private Jet to Monaco",
  ],
  Yesterday: [
    "🏠 Miami Penthouse Tour",
    "💎 Rolex Collection",
    "🛥️ Yacht Party Ibiza",
  ],
  "Previous 7 Days": [
    "📈 100x Crypto Gains",
    "👔 Wall Street Office",
    "🏖️ Bali Villa Life",
  ],
};

export default function Sidebar({ isOpen, onClose, onNewChat }: SidebarProps) {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 w-[260px] h-screen flex flex-col z-50 border-r transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background: "var(--bg-sidebar)",
          borderColor: "var(--border)",
        }}
      >
        {/* Header */}
        <div className="p-3" style={{ borderBottom: "1px solid var(--border)" }}>
          <button
            onClick={onNewChat}
            className="w-full py-2.5 px-3 rounded-lg text-sm flex items-center gap-2 transition-colors"
            style={{
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
              background: "transparent",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--bg-hover)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New larp
          </button>
        </div>

        {/* Chat history */}
        <div className="flex-1 overflow-y-auto p-2">
          {Object.entries(fakeHistory).map(([section, items]) => (
            <div key={section}>
              <div
                className="px-3 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                {section}
              </div>
              {items.map((item) => (
                <div
                  key={item}
                  className="px-3 py-2.5 rounded-lg text-[13px] cursor-pointer truncate transition-colors"
                  style={{ color: "var(--text-secondary)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--bg-hover)";
                    e.currentTarget.style.color = "var(--text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--text-secondary)";
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3" style={{ borderTop: "1px solid var(--border)" }}>
          <div
            className="flex items-center gap-2.5 p-2 rounded-lg cursor-pointer transition-colors"
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--bg-hover)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
              style={{
                background: "linear-gradient(135deg, var(--green), #0ea5e9)",
              }}
            >
              🎭
            </div>
            <div>
              <div className="text-[13px]" style={{ color: "var(--text-primary)" }}>
                Larper Pro
              </div>
              <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                Unlimited Larps
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
