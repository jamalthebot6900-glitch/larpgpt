"use client";

interface ExamplePromptsProps {
  onSelect: (prompt: string) => void;
}

const examples = [
  {
    label: "Making It Rain",
    prompt:
      "is in a strip club VIP booth throwing hundreds in the air, bottles everywhere, neon purple lighting, cash scattered all over the floor, women dancing around him",
  },
  {
    label: "Yacht & Models",
    prompt:
      "is on a mega yacht surrounded by women in bikinis, popping Dom Perignon with the spray going everywhere, Mediterranean sea, golden hour, dripping in gold chains",
  },
  {
    label: "Scarface Desk",
    prompt:
      "is sitting behind a massive desk covered in mountains of cash, counting money with a money counter, cigar in mouth, dim moody lighting, whiskey on the desk, like a scene from Scarface",
  },
  {
    label: "Lambo Cash Run",
    prompt:
      "is leaning on a Lamborghini Aventador with the trunk open overflowing with stacks of cash, wearing all designer, gas station at night, neon lights reflecting off the car",
  },
  {
    label: "Penthouse Hot Tub",
    prompt:
      "is in a penthouse rooftop hot tub with two women, champagne bottles floating, city skyline lit up at night behind, steam rising, cash on the edge of the tub",
  },
  {
    label: "Casino High Roller",
    prompt:
      "is at a high stakes poker table with massive stacks of chips and cash piled high, cigar smoke in the air, whiskey neat, dark private casino room, cocky smirk",
  },
  {
    label: "Ice'd Out Rolls",
    prompt:
      "is in the back of a Rolls Royce Phantom covered in diamond chains and a diamond encrusted watch, holding a briefcase full of cash, starlight ceiling glowing, city at night",
  },
  {
    label: "Beach Club Chaos",
    prompt:
      "is at an Ibiza beach club on a VIP daybed surrounded by women in bikinis, bottles of Ace of Spades everywhere, pool party going crazy in the background, Mediterranean sun",
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
