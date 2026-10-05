"use client";

import { useState } from "react";
import type { Story } from "@/data/news";
import { StoryCard } from "./cards";
import { FilterPills } from "@/components/ui/FilterPills";

export function StoryList({ stories, categories }: { stories: Story[]; categories: string[] }) {
  const [category, setCategory] = useState("All");
  const filtered = category === "All" ? stories : stories.filter((s) => s.category === category);
  const [featured, ...rest] = filtered;

  return (
    <>
      <FilterPills label="Filter stories by category" options={["All", ...categories]} value={category} onChange={setCategory} />
      {featured ? (
        <div className="mt-10 space-y-6">
          <StoryCard story={featured} featured />
          {rest.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((story) => (
                <StoryCard key={story.slug} story={story} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <p className="mt-10 rounded-2xl border border-dashed border-line bg-white p-10 text-center text-muted">
          No stories in this category yet — check back soon.
        </p>
      )}
    </>
  );
}
