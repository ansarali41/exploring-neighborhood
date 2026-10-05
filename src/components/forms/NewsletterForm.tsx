"use client";

import { CheckCircle2, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFakeSubmit } from "./useFakeSubmit";

export function NewsletterForm({ dark = false, className }: { dark?: boolean; className?: string }) {
  const { status, onSubmit } = useFakeSubmit();

  if (status === "done") {
    return (
      <p role="status" className={cn("flex items-center gap-2 font-medium", dark ? "text-gold-300" : "text-forest-600", className)}>
        <CheckCircle2 size={20} aria-hidden="true" /> Thanks for subscribing — see you out there!
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("flex flex-col gap-2 sm:flex-row", className)}>
      <label htmlFor={dark ? "newsletter-email-footer" : "newsletter-email"} className="sr-only">
        Email address
      </label>
      <input
        id={dark ? "newsletter-email-footer" : "newsletter-email"}
        type="email"
        required
        autoComplete="email"
        placeholder="Your email address"
        className={cn(
          "min-w-0 flex-1 rounded-full px-5 py-3 text-[15px] transition focus:outline-none",
          dark
            ? "border border-white/15 bg-white/10 text-white placeholder:text-white/50 focus:border-gold-300 focus:bg-white/15"
            : "border border-line bg-white text-forest-800 placeholder:text-muted/70 focus:border-forest-600 focus:ring-4 focus:ring-forest-600/10",
        )}
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className={cn(
          "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold transition-colors disabled:opacity-60",
          dark ? "bg-gold-500 text-forest-900 hover:bg-gold-300" : "bg-forest-600 text-white hover:bg-forest-700",
        )}
      >
        {status === "sending" ? "Subscribing…" : "Subscribe"}
        <Send size={16} aria-hidden="true" />
      </button>
    </form>
  );
}
