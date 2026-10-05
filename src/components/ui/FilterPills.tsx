"use client";

import { cn } from "@/lib/utils";

export function FilterPills({
  label,
  options,
  value,
  onChange,
  size = "md",
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  size?: "sm" | "md";
}) {
  return (
    <div role="group" aria-label={label} className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
      {options.map((option) => {
        const active = option === value;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option)}
            className={cn(
              "shrink-0 cursor-pointer rounded-full border font-medium transition-colors",
              size === "sm" ? "px-3.5 py-1.5 text-[13px]" : "px-4 py-2 text-sm",
              active
                ? "border-forest-600 bg-forest-600 text-white"
                : "border-line bg-white text-forest-800 hover:border-forest-600 hover:bg-leaf-100",
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
