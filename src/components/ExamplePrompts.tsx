"use client";

interface ExamplePromptsProps {
  onSelect: (prompt: string) => void;
}

const examples = [
  {
    emoji: "🛥️",
    label: "Yacht Party",
    prompt:
      "This person is lounging on the aft deck of a 60-meter superyacht in the Mediterranean. Crystal blue water, golden hour sunlight, champagne on the table, beautiful people in the background. Paparazzi-style candid shot.",
  },
  {
    emoji: "🏎️",
    label: "Lambo & Mansion",
    prompt:
      "This person is standing confidently next to a matte black Lamborghini Urus in the driveway of a modern $15 million mansion with palm trees and a fountain. Golden hour warm lighting, shallow depth of field.",
  },
  {
    emoji: "📈",
    label: "100x Trading Desk",
    prompt:
      "This person is sitting at a professional trading desk with 6 curved monitors all showing green candlestick charts and massive crypto gains. Dark room lit only by screen glow, energy drinks on desk, confident smirk.",
  },
  {
    emoji: "✈️",
    label: "Private Jet",
    prompt:
      "This person is relaxing inside a luxurious private jet cabin, cream leather seats, champagne glass in hand, window showing clouds and sunset. Warm cabin lighting, casually dressed in designer clothes.",
  },
  {
    emoji: "💰",
    label: "Crypto Whale",
    prompt:
      "This person is sitting in a minimalist modern office looking at a large screen showing a crypto wallet with $47 million balance. Multiple Bitcoin and Ethereum logos visible, neon blue ambient lighting, confident expression.",
  },
  {
    emoji: "⌚",
    label: "Watch Collection",
    prompt:
      "Close-up of this person's wrist wearing a Patek Philippe Nautilus, sitting in the back of a Rolls Royce with cream leather interior. Natural daylight streaming in, shallow depth of field macro photography.",
  },
  {
    emoji: "🏙️",
    label: "Penthouse View",
    prompt:
      "This person standing by floor-to-ceiling windows of a luxury penthouse apartment on the 73rd floor, panoramic city skyline at night, modern minimalist interior, coffee in hand, looking out contemplatively.",
  },
  {
    emoji: "🌟",
    label: "Red Carpet",
    prompt:
      "This person walking the red carpet at a Hollywood premiere, wearing a tailored designer outfit, camera flashes from paparazzi everywhere, velvet rope barriers, photographers shouting their name.",
  },
];

export default function ExamplePrompts({ onSelect }: ExamplePromptsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-[680px] w-full px-1">
      {examples.map((ex, i) => (
        <button
          key={i}
          onClick={() => onSelect(ex.prompt)}
          className="rounded-xl py-3 px-3 cursor-pointer text-center transition-all duration-200 animate-fadeIn"
          style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border)",
            animationDelay: `${i * 40}ms`,
            animationFillMode: "backwards",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--green)";
            e.currentTarget.style.background = "var(--bg-hover)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.background = "var(--bg-secondary)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <div className="text-[22px] mb-1">{ex.emoji}</div>
          <div className="text-[12px] font-medium" style={{ color: "var(--text-primary)" }}>
            {ex.label}
          </div>
        </button>
      ))}
    </div>
  );
}
