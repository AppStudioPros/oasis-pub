"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/PageHero";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import SectionDivider from "@/components/SectionDivider";

interface DrinkItem {
  name: string;
  style?: string;
  abv?: string;
  origin?: string;
  thc?: string;
  size?: string;
  price?: string;
  is_subhead?: boolean;
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
      <BreadcrumbSchema crumbs={[
        { name: "Home", url: "https://oasisnewlondon.com" },
        { name: "Drinks", url: "https://oasisnewlondon.com/drinks" },
      ]} />
      <PageHero
        eyebrow="Pick Your Poison"
        title="The Drinks"
        subtitle="20 drafts. 60+ cans. Canned cocktails. CBD & mushroom drinks. Social tonics. Whatever your night needs."
      />

      <SectionDivider
        items={[
          "✦ CRAFT BEER ✦",
          "ALCOHOL-FREE",
          "COCKTAILS",
          "CIDERS",
          "SELTZERS",
          "SOCIAL TONICS",
        ]}
        pixelsPerSecond={214}
      />

      {/* Tab nav */}
      <section className="bg-[var(--color-oasis-ink)] sticky top-16 md:top-20 z-30 border-b-2 border-[var(--color-oasis-orange)]/40">
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
      <section className="relative bg-[var(--color-oasis-ink)] py-12 md:py-16 min-h-[60vh] overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-center mb-12">
                <h2 className="poster-title text-4xl md:text-6xl text-white mb-3 leading-[0.9]">
                  {active.title}
                </h2>
                {active.subtitle && (
                  <p className="text-white/70 text-sm md:text-base max-w-2xl mx-auto">
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
                {active.categories.map((cat, ci) => (
                  <motion.div
                    key={cat.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: ci * 0.05 }}
                  >
                    <h3 className="display text-2xl md:text-3xl uppercase tracking-wider text-white mb-3 pb-2 border-b-2 border-[var(--color-oasis-orange)]/40">
                      {cat.name}
                    </h3>
                    {cat.note && (
                      <p className="text-white/50 text-sm italic mb-4">{cat.note}</p>
                    )}
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
                    {cat.items && cat.items.length > 0 && (
                      <div className="mt-2">
                        <ItemList items={cat.items} />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}

function ItemList({ items }: { items: DrinkItem[] }) {
  return (
    <ul className="divide-y divide-white/5">
      {items.map((item, idx) => {
        if (item.is_subhead) {
          return (
            <li key={`${item.name}-${idx}`} className="pt-6 pb-1 first:pt-0 list-none">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/55 border-b border-white/10 pb-1">{item.name}</p>
            </li>
          );
        }
        return (
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
        );
      })}
    </ul>
  );
}
