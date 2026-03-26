"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const staticItems = [
  { image: "/showcase/rooftop_dubai.jpg" },
  { image: "/showcase/supercar_garage.jpg" },
  { image: "/showcase/emirates_first.jpg" },
  { image: "/showcase/poker_vip.jpg" },
  { image: "/showcase/maldives_villa.jpg" },
  { image: "/showcase/gas_urus.jpg" },
  { image: "/showcase/dubai_pool.jpg" },
  { image: "/showcase/maybach_cigar.jpg" },
  { image: "/showcase/helicopter.jpg" },
  { image: "/showcase/bank_vault.jpg" },
  { image: "/showcase/ferrari_rain.jpg" },
  { image: "/showcase/mansion_pool.jpg" },
  { image: "/showcase/gucci_shop.jpg" },
  { image: "/showcase/club_vip.jpg" },
  { image: "/showcase/cybertruck_cash.jpg" },
  { image: "/showcase/dubai_penthouse.jpg" },
  { image: "/showcase/rolls.jpg" },
  { image: "/showcase/redcarpet.jpg" },
  { image: "/showcase/penthouse.jpg" },
  { image: "/showcase/scarface.jpg" },
  { image: "/showcase/yacht2.jpg" },
  { image: "/showcase/lambo2.jpg" },
  { image: "/showcase/yacht3.jpg" },
  { image: "/showcase/strip2.jpg" },
  { image: "/showcase/mcdonalds.jpg" },
  { image: "/showcase/rekt.jpg" },
  { image: "/showcase/yacht.jpg" },
  { image: "/showcase/ibiza_beach.jpg" },
  { image: "/showcase/poker_table.jpg" },
  { image: "/showcase/tulum_cabana.jpg" },
  { image: "/showcase/dubai_helipad.jpg" },
  { image: "/showcase/vegas_vip.jpg" },
  { image: "/showcase/lambo_pch.jpg" },
  { image: "/showcase/cigar_club.jpg" },
  { image: "/showcase/monaco_yacht.jpg" },
  { image: "/showcase/first_class.jpg" },
  { image: "/showcase/vegas_hottub.jpg" },
  { image: "/showcase/nba_courtside.jpg" },
  { image: "/showcase/sprinter_van.jpg" },
  { image: "/showcase/miami_rooftop.jpg" },
  { image: "/showcase/mykonos_walk.jpg" },
  { image: "/showcase/cash_bed.jpg" },
  { image: "/showcase/hookah_vip.jpg" },
  { image: "/showcase/bugatti_garage.jpg" },
  { image: "/showcase/maldives_boat.jpg" },
  { image: "/showcase/michelin_dinner.jpg" },
  { image: "/showcase/tokyo_neon.jpg" },
  { image: "/showcase/orangie_club.jpg" },
  { image: "/showcase/counting_cash.jpg" },
  { image: "/showcase/gucci_walk.jpg" },
  { image: "/showcase/miami_hottub.jpg" },
  { image: "/showcase/gwagon_gas.jpg" },
  { image: "/showcase/bali_pool.jpg" },
  { image: "/showcase/lv_nyc.jpg" },
  { image: "/showcase/blackjack.jpg" },
  { image: "/showcase/jetski.jpg" },
  { image: "/showcase/maybach_night.jpg" },
  { image: "/showcase/monaco_balcony.jpg" },
  { image: "/showcase/dubai_pool_party.jpg" },
  { image: "/showcase/barber_crypto.jpg" },
  { image: "/showcase/jet_redcarpet.jpg" },
  { image: "/showcase/mclaren_night.jpg" },
  { image: "/showcase/strip_rain.jpg" },
  { image: "/showcase/urus_sunset.jpg" },
];

interface DbLarp {
  id: string;
  image_url: string;
  scene: string;
  handle: string;
}

export default function GalleryPage() {
  const [dbLarps, setDbLarps] = useState<DbLarp[]>([]);

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((d) => setDbLarps(d.larps || []))
      .catch(() => {});
  }, []);

  // Combine: DB larps first (newest), then static
  const allImages = [
    ...dbLarps.map((l) => ({ image: l.image_url })),
    ...staticItems,
  ];

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

      {/* Grid — 4 columns, just photos */}
      <div className="px-3 md:px-5 py-4 md:py-6 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 max-w-[1400px] mx-auto">
        {allImages.map((item, i) => (
          <div
            key={i}
            className="relative rounded-xl overflow-hidden cursor-pointer animate-fadeIn"
            style={{
              aspectRatio: "1",
              animationDelay: `${i * 40}ms`,
              animationFillMode: "backwards",
            }}
          >
            <img
              src={item.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
