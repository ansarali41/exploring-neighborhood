import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Container } from "./Section";

/**
 * Photo banner used at the top of every inner page.
 * The dark overlay keeps the transparent header readable at the top of the page.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  breadcrumbs = [],
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  image: string;
  breadcrumbs?: { label: string; href?: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-forest-950 pt-32 pb-16 text-white sm:pt-40 sm:pb-20 lg:pb-24">
      <Image src={image} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-forest-950/95 via-forest-950/75 to-forest-950/35" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-linear-to-t from-forest-950/40 to-transparent" />

      <Container>
        <nav aria-label="Breadcrumb" className="mb-6 animate-fade-up">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/70">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            {breadcrumbs.map((crumb) => (
              <li key={crumb.label} className="flex items-center gap-1.5">
                <ChevronRight size={14} aria-hidden="true" />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-white">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="max-w-3xl animate-fade-up">
          {eyebrow && <p className="eyebrow text-gold-300">{eyebrow}</p>}
          <h1 className="mt-3 text-4xl leading-[1.08] font-bold sm:text-5xl lg:text-6xl">{title}</h1>
          {lead && <p className="mt-5 max-w-2xl text-lg text-white/80 sm:text-xl">{lead}</p>}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
