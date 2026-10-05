"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowRight, CalendarDays, ChevronDown, Mail, MapPin, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Icon, type IconName } from "@/components/ui/Icon";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/ui/icons";
import { isNavGroup, mainNav, site, type NavEntry, type NavGroup } from "@/lib/site";
import { cn } from "@/lib/utils";

export type FeaturedEvent = {
  title: string;
  href: string;
  date: string;
  location: string;
  image: string;
};

const navIcons: Record<string, IconName> = {
  "/activities": "leaf",
  "/activities/bird-walks": "bird",
  "/activities/frog-walks": "frog",
  "/activities/sky-watch": "telescope",
  "/activities/education": "education",
  "/citizen-science": "citizen-science",
  "/research": "search",
  "/news": "notebook",
  "/resources": "book",
  "/join-us": "users",
  "/volunteer": "heart",
  "/contact": "share",
};

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function groupIsActive(pathname: string, entry: NavEntry) {
  return isNavGroup(entry) ? entry.items.some((item) => isActive(pathname, item.href)) : isActive(pathname, entry.href);
}

export function Header({ featuredEvent }: { featuredEvent?: FeaturedEvent }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdowns on outside click / Escape
  useEffect(() => {
    if (!openGroup) return;
    const onPointer = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenGroup(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenGroup(null);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [openGroup]);

  const openNow = useCallback((label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenGroup(label);
  }, []);

  const closeSoon = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenGroup(null), 150);
  }, []);

  const closeAll = useCallback(() => {
    setOpenGroup(null);
    setMobileOpen(false);
  }, []);

  // Solid background once scrolled or while a menu is open; transparent over the hero otherwise.
  const solid = scrolled || openGroup !== null;

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-gold-500 px-4 py-2 font-semibold text-forest-900 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          solid
            ? "border-b border-line/80 bg-cream/95 shadow-[0_4px_20px_rgb(24_53_45/0.06)] backdrop-blur-md"
            : "border-b border-white/10 bg-linear-to-b from-forest-950/60 to-transparent",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Logo light={!solid} className="shrink-0" />

          {/* Desktop navigation */}
          <nav ref={navRef} aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {mainNav.map((entry) => {
                const active = groupIsActive(pathname, entry);
                if (!isNavGroup(entry)) {
                  return (
                    <li key={entry.label}>
                      <Link
                        href={entry.href}
                        onClick={closeAll}
                        aria-current={active ? "page" : undefined}
                        className={cn(navItemClass(solid, active))}
                      >
                        {entry.label}
                      </Link>
                    </li>
                  );
                }
                return (
                  <DesktopGroup
                    key={entry.label}
                    group={entry}
                    solid={solid}
                    active={active}
                    open={openGroup === entry.label}
                    pathname={pathname}
                    featuredEvent={entry.href === "/activities" ? featuredEvent : undefined}
                    onOpen={() => openNow(entry.label)}
                    onCloseSoon={closeSoon}
                    onToggle={() => setOpenGroup((g) => (g === entry.label ? null : entry.label))}
                    onNavigate={closeAll}
                  />
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/join-us"
              onClick={closeAll}
              className={cn(
                "hidden items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold whitespace-nowrap shadow-sm transition-colors sm:inline-flex",
                solid ? "bg-forest-600 text-white hover:bg-forest-700" : "bg-gold-500 text-forest-900 hover:bg-gold-300",
              )}
            >
              Join Us
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-full transition-colors lg:hidden",
                solid ? "text-forest-800 hover:bg-leaf-100" : "text-white hover:bg-white/10",
              )}
            >
              <Menu size={24} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} pathname={pathname} onClose={() => setMobileOpen(false)} />
    </>
  );
}

function navItemClass(solid: boolean, active: boolean) {
  return cn(
    "relative inline-flex items-center gap-1 rounded-full px-3 py-2 text-[14px] font-medium whitespace-nowrap transition-colors xl:px-4 xl:text-[14.5px]",
    solid
      ? active
        ? "bg-leaf-100 text-forest-600"
        : "text-forest-800 hover:bg-leaf-100 hover:text-forest-600"
      : active
        ? "bg-white/15 text-white"
        : "text-white/90 hover:bg-white/10 hover:text-white",
  );
}

function DesktopGroup({
  group,
  solid,
  active,
  open,
  pathname,
  featuredEvent,
  onOpen,
  onCloseSoon,
  onToggle,
  onNavigate,
}: {
  group: NavGroup;
  solid: boolean;
  active: boolean;
  open: boolean;
  pathname: string;
  featuredEvent?: FeaturedEvent;
  onOpen: () => void;
  onCloseSoon: () => void;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const panelId = useId();
  const mega = Boolean(featuredEvent);

  return (
    <li
      className="relative"
      onPointerEnter={(e) => e.pointerType === "mouse" && onOpen()}
      onPointerLeave={(e) => e.pointerType === "mouse" && onCloseSoon()}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) onCloseSoon();
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className={navItemClass(solid, active)}
      >
        {group.label}
        <ChevronDown size={15} aria-hidden="true" className={cn("transition-transform duration-200", open && "rotate-180")} />
      </button>

      {/* pt-3 creates a hover "bridge" between the trigger and the panel */}
      <div
        id={panelId}
        className={cn(
          "absolute top-full pt-3 transition-all duration-200",
          mega ? "left-1/2 -translate-x-1/3" : "left-1/2 -translate-x-1/2",
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
        )}
      >
        <div
          className={cn(
            "overflow-hidden rounded-2xl border border-line bg-white shadow-[0_24px_60px_rgb(14_43_35/0.18)]",
            mega ? "grid w-[680px] grid-cols-[1fr_240px]" : "w-80",
          )}
        >
          <ul className={cn("p-3", mega && "grid grid-cols-2 gap-1")}>
            {group.items.map((item) => {
              const current = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "group/item flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-leaf-100",
                      current && "bg-leaf-100",
                    )}
                  >
                    <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-leaf-100 text-forest-600 transition-colors group-hover/item:bg-forest-600 group-hover/item:text-white">
                      <Icon name={navIcons[item.href] ?? "leaf"} size={18} strokeWidth={1.9} />
                    </span>
                    <span>
                      <span className="block text-[14.5px] font-semibold text-forest-800">{item.label}</span>
                      {item.description && <span className="block text-[13px] leading-snug text-muted">{item.description}</span>}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {featuredEvent && (
            <Link
              href={featuredEvent.href}
              onClick={onNavigate}
              className="group/event relative flex flex-col justify-end overflow-hidden bg-forest-900 p-5 text-white"
            >
              <Image
                src={featuredEvent.image}
                alt=""
                fill
                sizes="240px"
                className="object-cover opacity-50 transition-transform duration-500 group-hover/event:scale-105"
              />
              <span className="absolute inset-0 bg-linear-to-t from-forest-950 via-forest-950/60 to-transparent" />
              <span className="relative">
                <span className="text-[11px] font-bold tracking-[0.14em] text-gold-300 uppercase">Next event</span>
                <span className="mt-1 block font-heading text-lg leading-snug font-semibold">{featuredEvent.title}</span>
                <span className="mt-2 flex items-center gap-1.5 text-[13px] text-white/80">
                  <CalendarDays size={14} aria-hidden="true" /> {featuredEvent.date}
                </span>
                <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-gold-300">
                  Register interest <ArrowRight size={14} aria-hidden="true" />
                </span>
              </span>
            </Link>
          )}
        </div>
      </div>
    </li>
  );
}

function MobileMenu({ open, pathname, onClose }: { open: boolean; pathname: string; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      className={cn("fixed inset-0 z-[70] lg:hidden", open ? "visible" : "invisible")}
      aria-hidden={!open}
      inert={!open}
    >
      <div
        className={cn("absolute inset-0 bg-forest-950/50 backdrop-blur-sm transition-opacity duration-300", open ? "opacity-100" : "opacity-0")}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-cream shadow-2xl transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-6">
          <span className="flex items-center gap-3">
            <span className="relative size-10 overflow-hidden rounded-full bg-white shadow">
              <Image src="/images/logo.png" alt="" fill sizes="40px" className="object-contain" />
            </span>
            <span className="font-heading text-[15px] font-bold">{site.name}</span>
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex size-11 items-center justify-center rounded-full text-forest-800 hover:bg-leaf-100"
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
          <ul className="space-y-1">
            <li>
              <MobileLink href="/" label="Home" active={pathname === "/"} onClick={onClose} />
            </li>
            {mainNav.map((entry) => {
              if (!isNavGroup(entry)) {
                return (
                  <li key={entry.label}>
                    <MobileLink href={entry.href} label={entry.label} active={isActive(pathname, entry.href)} onClick={onClose} />
                  </li>
                );
              }
              const isOpen = expanded === entry.label || (expanded === null && groupIsActive(pathname, entry));
              return (
                <li key={entry.label}>
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? "" : entry.label)}
                    aria-expanded={isOpen}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-[17px] font-semibold transition-colors hover:bg-leaf-100",
                      groupIsActive(pathname, entry) ? "text-forest-600" : "text-forest-800",
                    )}
                  >
                    {entry.label}
                    <ChevronDown size={20} aria-hidden="true" className={cn("transition-transform duration-200", isOpen && "rotate-180")} />
                  </button>
                  <div className={cn("grid transition-all duration-300", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                    <ul className="overflow-hidden">
                      {entry.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={onClose}
                            aria-current={pathname === item.href ? "page" : undefined}
                            className={cn(
                              "ml-4 flex items-center gap-3 rounded-xl px-4 py-2.5 text-[15px] transition-colors hover:bg-leaf-100",
                              pathname === item.href ? "font-semibold text-forest-600" : "text-forest-800/90",
                            )}
                          >
                            <Icon name={navIcons[item.href] ?? "leaf"} size={18} className="text-forest-600" />
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="space-y-4 border-t border-line bg-white px-4 py-5 sm:px-6">
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/join-us"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-full bg-forest-600 px-4 py-3 text-sm font-semibold text-white hover:bg-forest-700"
            >
              Join Us
            </Link>
            <Link
              href="/volunteer"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-full border border-forest-600/30 px-4 py-3 text-sm font-semibold text-forest-700 hover:bg-leaf-100"
            >
              Volunteer
            </Link>
          </div>
          <div className="flex items-center justify-between text-sm text-muted">
            <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-forest-600">
              <Mail size={16} aria-hidden="true" /> Email us
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin size={16} aria-hidden="true" /> {site.location}
            </span>
          </div>
          <div className="flex gap-2">
            <SocialLinks />
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileLink({ href, label, active, onClick }: { href: string; label: string; active: boolean; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "block rounded-xl px-4 py-3 text-[17px] font-semibold transition-colors hover:bg-leaf-100",
        active ? "bg-leaf-100 text-forest-600" : "text-forest-800",
      )}
    >
      {label}
    </Link>
  );
}

export function SocialLinks({ dark = false }: { dark?: boolean }) {
  const links = [
    { label: "Facebook", href: site.social.facebook, Icon: FacebookIcon },
    { label: "Instagram", href: site.social.instagram, Icon: InstagramIcon },
    { label: "YouTube", href: site.social.youtube, Icon: YoutubeIcon },
  ];
  return (
    <>
      {links.map(({ label, href, Icon: SocialIcon }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex size-10 items-center justify-center rounded-full transition-colors",
            dark ? "bg-white/10 text-white hover:bg-gold-500 hover:text-forest-900" : "bg-leaf-100 text-forest-600 hover:bg-forest-600 hover:text-white",
          )}
        >
          <SocialIcon size={18} />
        </a>
      ))}
    </>
  );
}
