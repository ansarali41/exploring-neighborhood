"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import type { Resource } from "@/data/resources";
import { resourceCategories, resourceTypes } from "@/data/resources";
import { Icon, type IconName } from "@/components/ui/Icon";
import { FilterPills } from "@/components/ui/FilterPills";

const typeIcon: Record<Resource["type"], IconName> = {
  PDF: "file",
  Guide: "book",
  Link: "link",
  Video: "video",
  Identification: "search",
  Publication: "notebook",
};

export function ResourceLibrary({ resources }: { resources: Resource[] }) {
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("All types");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return resources.filter(
      (r) =>
        (category === "All" || r.category === category) &&
        (type === "All types" || r.type === type) &&
        (!q || `${r.title} ${r.description} ${r.category}`.toLowerCase().includes(q)),
    );
  }, [resources, category, type, query]);

  return (
    <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
      <aside className="space-y-8 lg:sticky lg:top-28 lg:h-fit">
        <div>
          <label htmlFor="resource-search" className="field-label">
            Search
          </label>
          <div className="relative">
            <Search size={18} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              id="resource-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Birds, frogs, stars…"
              className="field pl-10"
            />
          </div>
        </div>
        <div>
          <p className="field-label">Topic</p>
          <div className="lg:hidden">
            <FilterPills label="Filter by topic" options={["All", ...resourceCategories]} value={category} onChange={setCategory} size="sm" />
          </div>
          <ul className="hidden space-y-1 lg:block">
            {["All", ...resourceCategories].map((c) => (
              <li key={c}>
                <button
                  type="button"
                  aria-pressed={category === c}
                  onClick={() => setCategory(c)}
                  className={`w-full cursor-pointer rounded-lg px-3 py-2 text-left text-[15px] transition-colors ${
                    category === c ? "bg-forest-600 font-semibold text-white" : "text-forest-800 hover:bg-leaf-100"
                  }`}
                >
                  {c}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div>
        <FilterPills label="Filter by type" options={["All types", ...resourceTypes]} value={type} onChange={setType} size="sm" />
        <p className="mt-6 text-sm text-muted" aria-live="polite">
          Showing {filtered.length} of {resources.length} resources
        </p>
        {filtered.length ? (
          <ul className="mt-4 grid gap-4 md:grid-cols-2">
            {filtered.map((r) => {
              const external = r.href.startsWith("http");
              return (
                <li key={r.title}>
                  <a
                    href={r.href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex h-full gap-4 rounded-2xl border border-line bg-white p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-forest-600/40 hover:shadow-card-hover"
                  >
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-leaf-100 text-forest-600">
                      <Icon name={typeIcon[r.type]} size={20} />
                    </span>
                    <span className="flex-1">
                      <span className="flex flex-wrap items-center gap-2 text-xs font-semibold text-muted">
                        <span className="rounded-full bg-earth-100 px-2 py-0.5 text-earth-700">{r.type}</span>
                        {r.category}
                      </span>
                      <span className="mt-1.5 block font-heading font-semibold text-forest-800">{r.title}</span>
                      <span className="mt-1 block text-sm text-muted">{r.description}</span>
                    </span>
                    <ArrowUpRight size={18} className="shrink-0 text-forest-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-4 rounded-2xl border border-dashed border-line bg-white p-10 text-center text-muted">
            No resources match your filters yet.
          </p>
        )}
      </div>
    </div>
  );
}
