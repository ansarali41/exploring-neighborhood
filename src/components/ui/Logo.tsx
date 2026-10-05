import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Logo badge + wordmark used in the header. */
export function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" className={cn("group flex items-center gap-3", className)} aria-label={`${site.name} — home`}>
      <span className="relative size-11 shrink-0 overflow-hidden rounded-full bg-white shadow-md ring-2 ring-white/70 transition-transform duration-300 group-hover:scale-105 sm:size-12">
        <Image src={images.logo} alt="" fill sizes="48px" className="object-contain" priority />
      </span>
      <span className="leading-tight">
        <span className={cn("block font-heading text-[15px] font-bold whitespace-nowrap sm:text-base", light ? "text-white" : "text-forest-800")}>
          {site.name}
        </span>
        <span
          className={cn(
            "hidden text-[10.5px] font-medium tracking-[0.12em] whitespace-nowrap uppercase sm:block lg:hidden xl:block",
            light ? "text-white/70" : "text-muted",
          )}
        >
          {site.tagline}
        </span>
      </span>
    </Link>
  );
}
