"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type GalleryItem = { src: string; alt: string };

/** Photo grid with a keyboard-friendly lightbox. */
export function Gallery({ items }: { items: GalleryItem[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  const step = useCallback((dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [index, close, step]);

  return (
    <>
      <ul className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[200px] md:grid-cols-4">
        {items.map((item, i) => (
          <li key={item.src} className={cn(i === 0 && "col-span-2 row-span-2", i === 3 && "md:col-span-2")}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group relative block size-full cursor-zoom-in overflow-hidden rounded-2xl"
              aria-label={`Open photo: ${item.alt}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-forest-950/0 transition-colors group-hover:bg-forest-950/15" />
            </button>
          </li>
        ))}
      </ul>

      {index !== null && (
        <div role="dialog" aria-modal="true" aria-label={items[index].alt} className="fixed inset-0 z-[80] flex items-center justify-center bg-forest-950/95 p-4">
          <button type="button" onClick={close} aria-label="Close" className="absolute top-4 right-4 inline-flex size-12 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
            <X size={24} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="absolute left-4 inline-flex size-12 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
            <ChevronLeft size={26} aria-hidden="true" />
          </button>
          <figure className="relative h-[75vh] w-full max-w-5xl">
            <Image src={items[index].src} alt={items[index].alt} fill sizes="100vw" className="object-contain" />
            <figcaption className="absolute inset-x-0 -bottom-10 text-center text-sm text-white/75">{items[index].alt}</figcaption>
          </figure>
          <button type="button" onClick={() => step(1)} aria-label="Next photo" className="absolute right-4 inline-flex size-12 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
            <ChevronRight size={26} aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}
