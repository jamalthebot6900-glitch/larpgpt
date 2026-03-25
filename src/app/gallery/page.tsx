"use client";

import Link from "next/link";

const galleryItems = [
  { image: "/showcase/gas_urus.jpg", title: "Gas Station Urus", category: "Cars", handle: "@ethanprosper" },
  { image: "/showcase/dubai_pool.jpg", title: "Dubai Infinity Pool", category: "Travel", handle: "@Megga" },
  { image: "/showcase/maybach_cigar.jpg", title: "Maybach Cigar", category: "Night", handle: "@flipski77" },
  { image: "/showcase/helicopter.jpg", title: "Helicopter Arrival", category: "Travel", handle: "@BenArmstrongsX" },
  { image: "/showcase/bank_vault.jpg", title: "Bank Vault", category: "Lifestyle", handle: "@blknoiz06" },
  { image: "/showcase/ferrari_rain.jpg", title: "Ferrari Rain", category: "Cars", handle: "@toly" },
  { image: "/showcase/mansion_pool.jpg", title: "Mansion Pool Night", category: "Night", handle: "@ethanprosper" },
  { image: "/showcase/gucci_shop.jpg", title: "Gucci Shopping Spree", category: "Lifestyle", handle: "@Megga" },
  { image: "/showcase/club_vip.jpg", title: "VIP Club Life", category: "Night", handle: "@VitalikButerin" },
  { image: "/showcase/cybertruck_cash.jpg", title: "Cybertruck Cash", category: "Cars", handle: "@saylor" },
  { image: "/showcase/dubai_penthouse.jpg", title: "Dubai Penthouse", category: "Travel", handle: "@alxcooks" },
  { image: "/showcase/rolls.jpg", title: "Rolls Royce Drip", category: "Cars", handle: "@pr6spr" },
  { image: "/showcase/redcarpet.jpg", title: "Red Carpet", category: "Celebrity", handle: "@Megga" },
  { image: "/showcase/penthouse.jpg", title: "Penthouse Cash", category: "Lifestyle", handle: "@flipski77" },
  { image: "/showcase/scarface.jpg", title: "Scarface Desk", category: "Night", handle: "@BenArmstrongsX" },
  { image: "/showcase/yacht2.jpg", title: "Yacht Champagne", category: "Travel", handle: "@blknoiz06" },
  { image: "/showcase/lambo2.jpg", title: "Monaco Lambo", category: "Cars", handle: "@toly" },
  { image: "/showcase/yacht3.jpg", title: "Yacht Party", category: "Travel", handle: "@CookerFlips" },
  { image: "/showcase/strip2.jpg", title: "Making It Rain", category: "Night", handle: "@elonmusk" },
  { image: "/showcase/mcdonalds.jpg", title: "McDonalds Arc", category: "Down Bad", handle: "@elonmusk" },
  { image: "/showcase/rekt.jpg", title: "Trading Rekt", category: "Down Bad", handle: "@elonmusk" },
  { image: "/showcase/yacht.jpg", title: "Mediterranean Life", category: "Travel", handle: "@elonmusk" },
  { image: "/showcase/ibiza_beach.jpg", title: "Ibiza Beach Club", category: "Night", handle: "@ethanprosper" },
  { image: "/showcase/poker_table.jpg", title: "High Roller Poker", category: "Night", handle: "@Megga" },
  { image: "/showcase/tulum_cabana.jpg", title: "Tulum Cabana", category: "Travel", handle: "@flipski77" },
  { image: "/showcase/dubai_helipad.jpg", title: "Dubai Helipad", category: "Travel", handle: "@BenArmstrongsX" },
  { image: "/showcase/vegas_vip.jpg", title: "Vegas VIP", category: "Night", handle: "@blknoiz06" },
  { image: "/showcase/lambo_pch.jpg", title: "Lambo PCH", category: "Cars", handle: "@toly" },
  { image: "/showcase/cigar_club.jpg", title: "Cigar Club", category: "Night", handle: "@VitalikButerin" },
  { image: "/showcase/monaco_yacht.jpg", title: "Monaco Grand Prix Yacht", category: "Travel", handle: "@saylor" },
  { image: "/showcase/first_class.jpg", title: "First Class Emirates", category: "Travel", handle: "@alxcooks" },
  { image: "/showcase/vegas_hottub.jpg", title: "Vegas Hot Tub", category: "Night", handle: "@alxcooks" },
  { image: "/showcase/nba_courtside.jpg", title: "NBA Courtside", category: "Lifestyle", handle: "@ethanprosper" },
  { image: "/showcase/sprinter_van.jpg", title: "Luxury Sprinter", category: "Night", handle: "@Megga" },
  { image: "/showcase/miami_rooftop.jpg", title: "Miami Rooftop", category: "Travel", handle: "@flipski77" },
  { image: "/showcase/mykonos_walk.jpg", title: "Mykonos Walk", category: "Travel", handle: "@BenArmstrongsX" },
  { image: "/showcase/cash_bed.jpg", title: "Cash Bed", category: "Lifestyle", handle: "@blknoiz06" },
  { image: "/showcase/hookah_vip.jpg", title: "Hookah Lounge", category: "Night", handle: "@VitalikButerin" },
  { image: "/showcase/bugatti_garage.jpg", title: "Bugatti Garage", category: "Cars", handle: "@saylor" },
  { image: "/showcase/maldives_boat.jpg", title: "Maldives Speedboat", category: "Travel", handle: "@alxcooks" },
  { image: "/showcase/michelin_dinner.jpg", title: "Michelin Dinner", category: "Lifestyle", handle: "@pr6spr" },
  { image: "/showcase/tokyo_neon.jpg", title: "Tokyo Neon", category: "Travel", handle: "@elonmusk" },
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

            {/* Title + handle + category */}
            <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 z-10">
              <div
                className="text-[13px] md:text-[14px] font-bold"
                style={{ color: "white" }}
              >
                {item.title}
              </div>
              <div className="flex items-center gap-2">
                {item.handle && (
                  <span
                    className="text-[11px] font-medium"
                    style={{ color: "var(--green)" }}
                  >
                    {item.handle}
                  </span>
                )}
                <span
                  className="text-[11px]"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {item.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
