"use client";

import { useState } from "react";
import Image from "next/image";

interface DrinkItem {
  name: string;
  style?: string;
  abv?: string;
  origin?: string;
  thc?: string;
  size?: string;
  price?: string;
}

interface SubCategory {
  name: string;
  items: DrinkItem[];
}

interface DrinkCategory {
  name: string;
  note?: string;
  items?: DrinkItem[];
  subcategories?: SubCategory[];
}

interface MenuData {
  title: string;
  subtitle?: string;
  note?: string;
  categories: DrinkCategory[];
}

type DrinksData = Record<string, MenuData>;

export default function DrinksClient({ data }: { data: DrinksData }) {
  const tabs = Object.keys(data);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const active = data[activeTab];

  return (
    <>
      {/* Hero */}
      <section className="relative h-[35vh] min-h-[260px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/heroes/poster-collage.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 text-center px-6">
          <p className="text-[var(--color-oasis-orange)] font-bold uppercase tracking-[0.3em] text-xs mb-3">
            Pick Your Poison
          </p>
          <h1 className="poster-title text-5xl md:text-7xl text-white">Drinks</h1>
        </div>
      </section>

      {/* Tab nav */}
      <section className="bg-[var(--color-oasis-ink)] sticky top-16 md:top-20 z-30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-4 text-sm font-bold uppercase tracking-wider whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-[var(--color-oasis-orange)] text-[var(--color-oasis-orange)]"
                    : "border-transparent text-white/60 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu content */}
      <section className="bg-[var(--color-oasis-ink)] py-12 md:py-16 min-h-[60vh]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="poster-title text-4xl md:text-5xl text-white mb-3">
              {active.title}
            </h2>
            {active.subtitle && (
              <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto">
                {active.subtitle}
              </p>
            )}
            {active.note && (
              <p className="text-[var(--color-oasis-orange)] text-sm italic mt-4 max-w-2xl mx-auto">
                {active.note}
              </p>
            )}
          </div>

          <div className="space-y-12">
            {active.categories.map((cat) => (
              <div key={cat.name}>
                <h3 className="display text-2xl md:text-3xl uppercase tracking-wider text-[var(--color-oasis-orange)] mb-3 pb-2 border-b-2 border-[var(--color-oasis-orange)]/40">
                  {cat.name}
                </h3>
                {cat.note && (
                  <p className="text-white/50 text-sm italic mb-4">{cat.note}</p>
                )}
                {/* Subcategories (Craft Beer style) */}
                {cat.subcategories && cat.subcategories.length > 0 && (
                  <div className="space-y-8 mt-4">
                    {cat.subcategories.map((sub) => (
                      <div key={sub.name}>
                        <h4 className="display text-base uppercase tracking-[0.2em] text-white/60 mb-3 pb-1 border-b border-white/10">
                          {sub.name}
                        </h4>
                        <ItemList items={sub.items} />
                      </div>
                    ))}
                  </div>
                )}
                {/* Flat items list */}
                {cat.items && cat.items.length > 0 && (
                  <div className="mt-2">
                    <ItemList items={cat.items} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          {activeTab === "Craft Beer" && (
            <p className="text-center text-white/40 text-xs italic mt-12">
              Tap list rotates often. Ask your bartender for tonight&apos;s pour list.
            </p>
          )}
        </div>
      </section>
    </>
  );
}

function ItemList({ items }: { items: DrinkItem[] }) {
  return (
    <ul className="divide-y divide-white/5">
      {items.map((item, idx) => (
        <li key={`${item.name}-${idx}`} className="py-3.5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white leading-snug">{item.name}</p>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-white/55 mt-1">
                {item.style && <span>{item.style}</span>}
                {item.abv && <span className="text-[var(--color-oasis-orange)]/80">{item.abv} ABV</span>}
                {item.thc && <span className="text-[var(--color-oasis-orange)]/80">{item.thc}</span>}
                {item.origin && <span className="italic">{item.origin}</span>}
                {item.size && <span>{item.size}</span>}
              </div>
            </div>
            {item.price && (
              <span className="text-[var(--color-oasis-orange)] font-bold whitespace-nowrap text-base">
                {item.price}
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
