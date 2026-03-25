"use client";

import Link from "next/link";

const galleryItems = [
  { image: "/showcase/rolls.jpg", title: "Rolls Royce Drip", category: "Cars" },
  { image: "/showcase/redcarpet.jpg", title: "Red Carpet", category: "Celebrity" },
  { image: "/showcase/penthouse.jpg", title: "Penthouse Cash", category: "Lifestyle" },
  { image: "/showcase/scarface.jpg", title: "Scarface Desk", category: "Crime" },
  { image: "/showcase/yacht2.jpg", title: "Yacht Champagne", category: "Travel" },
  { image: "/showcase/lambo2.jpg", title: "Monaco Lambo", category: "Cars" },
  { image: "/showcase/yacht3.jpg", title: "Yacht Party", category: "Travel" },
  { image: "/showcase/mcdonalds.jpg", title: "McDonalds Arc", category: "Down Bad" },
  { image: "/showcase/rekt.jpg", title: "Trading Rekt", category: "Down Bad" },
  { image: "/showcase/yacht.jpg", title: "Mediterranean Life", category: "Travel" },
  { image: "/showcase/strip2.jpg", title: "Making It Rain", category: "Nightlife" },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      {/* Header */}
      <div
        className="px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-10"
        style={{
          background: "rgba(13,13,13,0.8)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Link
          href="/"
          className="text-sm font-bold no-underline"
          style={{ color: "var(--text-primary)" }}
        >
          LarpGPT
        </Link>
        <nav className="flex items-center gap-5">
          <Link
            href="/"
            className="text-[13px] no-underline transition-colors duration-150"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            Home
          </Link>
          <span
            className="text-[13px] font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            Gallery
          </span>
        </nav>
      </div>

      {/* Grid — 4 columns */}
      <div className="px-3 md:px-5 py-4 md:py-6 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 max-w-[1400px] mx-auto">
        {galleryItems.map((item, i) => (
          <div
            key={i}
            className="relative rounded-xl overflow-hidden cursor-pointer group animate-fadeIn"
            style={{
              aspectRatio: "1",
              animationDelay: `${i * 40}ms`,
              animationFillMode: "backwards",
            }}
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
              style={{}}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />

            {/* Bottom gradient overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.8) 100%)",
              }}
            />

            {/* Title + category */}
            <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 z-10">
              <div
                className="text-[13px] md:text-[14px] font-bold"
                style={{ color: "white" }}
              >
                {item.title}
              </div>
              <div
                className="text-[11px]"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {item.category}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
