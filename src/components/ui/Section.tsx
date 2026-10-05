import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "cream" | "soft" | "white" | "forest";

const tones: Record<Tone, string> = {
  cream: "bg-cream",
  soft: "bg-leaf-100",
  white: "bg-white",
  forest: "bg-forest-900 text-white",
};

export function Container({ children, className, size = "default" }: { children: ReactNode; className?: string; size?: "default" | "narrow" | "wide" }) {
  const widths = { narrow: "max-w-3xl", default: "max-w-6xl", wide: "max-w-7xl" };
  return <div className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", widths[size], className)}>{children}</div>;
}

export function Section({
  children,
  tone = "cream",
  className,
  id,
  containerClassName,
  size,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
  containerClassName?: string;
  size?: "default" | "narrow" | "wide";
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-16 sm:py-20 lg:py-24", tones[tone], className)}>
      <Container className={containerClassName} size={size}>
        {children}
      </Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  dark = false,
  className,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
  action?: ReactNode;
}) {
  const center = align === "center";
  return (
    <div
      className={cn(
        "mb-10 sm:mb-12",
        action && !center ? "flex flex-col gap-6 md:flex-row md:items-end md:justify-between" : "",
        className,
      )}
    >
      <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
        {eyebrow && <p className={cn("eyebrow", dark && "text-gold-300")}>{eyebrow}</p>}
        <h2
          className={cn(
            "mt-3 text-3xl leading-tight font-bold sm:text-4xl",
            dark ? "text-white" : "text-forest-800",
          )}
        >
          {title}
        </h2>
        {lead && <p className={cn("mt-4 text-lg", dark ? "text-white/75" : "text-muted")}>{lead}</p>}
      </div>
      {action && <div className={cn("shrink-0", center && "mt-6 text-center")}>{action}</div>}
    </div>
  );
}

export function CheckList({ items, className, dark = false }: { items: readonly string[]; className?: string; dark?: boolean }) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            className={cn(
              "mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full",
              dark ? "bg-gold-500/20 text-gold-300" : "bg-leaf-100 text-forest-600",
            )}
          >
            <Check size={14} strokeWidth={3} aria-hidden="true" />
          </span>
          <span className={dark ? "text-white/90" : "text-forest-800"}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Card({ children, className, as: Tag = "div" }: { children: ReactNode; className?: string; as?: "div" | "article" | "li" }) {
  return (
    <Tag className={cn("rounded-2xl border border-line bg-white p-6 shadow-card sm:p-7", className)}>{children}</Tag>
  );
}

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full bg-leaf-100 px-3 py-1 text-xs font-semibold text-forest-600", className)}>
      {children}
    </span>
  );
}
