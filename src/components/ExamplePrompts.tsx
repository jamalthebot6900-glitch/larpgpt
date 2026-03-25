"use client";

interface ExamplePromptsProps {
  onSelect: (prompt: string) => void;
}

const examples = [
  {
    label: "Yacht Party",
    prompt:
      "This person is lounging shirtless on the aft deck of a 60-meter superyacht surrounded by models in bikinis, popping bottles of Dom Perignon, stacks of cash on the table, Mediterranean sea in background. Paparazzi candid shot.",
  },
  {
    label: "Lambo Mansion",
    prompt:
      "This person is standing confidently next to a matte black Lamborghini Urus in the driveway of a $15 million mansion, dripping in gold chains and a Rolex, palm trees and fountain behind them. Golden hour warm lighting.",
  },
  {
    label: "Strip Club VIP",
    prompt:
      "This person is sitting in a VIP booth at an upscale strip club throwing stacks of hundred dollar bills in the air, neon purple and pink lighting, bottles of champagne everywhere, bills scattered all over the floor and table.",
  },
  {
    label: "Bank Heist",
    prompt:
      "This person is walking out of a bank vault carrying duffel bags overflowing with cash, wearing a tailored suit and dark sunglasses, money scattered on the floor, dramatic cinematic lighting like a movie scene.",
  },
  {
    label: "Ice'd Out",
    prompt:
      "This person is sitting in the back of a Rolls Royce Phantom, covered in diamond chains, diamond encrusted watch, diamond grillz, holding a briefcase full of cash, natural daylight streaming through tinted windows.",
  },
  {
    label: "Drug Lord",
    prompt:
      "This person is sitting behind a massive desk in a dark office, mountains of cash stacked on the desk, counting money with a money counter machine, cigar in mouth, dim moody lighting like a scene from Scarface.",
  },
  {
    label: "Private Jet",
    prompt:
      "This person is relaxing inside a luxurious private jet cabin, cream leather seats, two models beside them, champagne in hand, stacks of cash on the table, window showing clouds and sunset. Designer clothes and jewelry.",
  },
  {
    label: "Penthouse Flex",
    prompt:
      "This person is standing by floor-to-ceiling windows of a luxury penthouse on the 73rd floor, city skyline at night, wearing an open bathrobe with gold chains visible, cash spread across the bed behind them.",
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
          <div className="text-[12px] font-medium" style={{ color: "var(--text-primary)" }}>
            {ex.label}
          </div>
        </button>
      ))}
    </div>
  );
}
