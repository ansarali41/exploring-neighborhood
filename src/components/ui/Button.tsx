import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "gold" | "outline" | "light" | "outline-light" | "link";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60 cursor-pointer";

const variants: Record<Variant, string> = {
  primary: "bg-forest-600 text-white shadow-sm hover:bg-forest-700 hover:shadow-md",
  gold: "bg-gold-500 text-forest-900 shadow-sm hover:bg-gold-300",
  outline: "border border-forest-600/25 bg-white/60 text-forest-700 hover:border-forest-600 hover:bg-leaf-100",
  light: "bg-white text-forest-800 shadow-sm hover:bg-cream",
  "outline-light": "border border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20",
  link: "text-forest-600 hover:text-forest-800 px-0! py-0! rounded-none group",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-[15px]",
  lg: "px-7 py-3.5 text-base",
};

type Common = { variant?: Variant; size?: Size; arrow?: boolean; children: ReactNode; className?: string };

export function buttonClasses({ variant = "primary", size = "md", className }: Omit<Common, "children" | "arrow">) {
  return cn(base, variants[variant], sizes[size], className);
}

function Content({ children, arrow, variant }: Pick<Common, "children" | "arrow" | "variant">) {
  return (
    <>
      {children}
      {arrow && (
        <ArrowRight
          size={variant === "link" ? 16 : 18}
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </>
  );
}

export function ButtonLink({
  href,
  variant,
  size,
  arrow,
  className,
  children,
  ...rest
}: Common & Omit<ComponentProps<typeof Link>, "className" | "children">) {
  const external = typeof href === "string" && /^https?:\/\//.test(href);
  return (
    <Link
      href={href}
      className={cn("group", buttonClasses({ variant, size, className }))}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      <Content arrow={arrow} variant={variant}>
        {children}
      </Content>
    </Link>
  );
}

export function Button({
  variant,
  size,
  arrow,
  className,
  children,
  type = "button",
  ...rest
}: Common & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button type={type} className={cn("group", buttonClasses({ variant, size, className }))} {...rest}>
      <Content arrow={arrow} variant={variant}>
        {children}
      </Content>
    </button>
  );
}
