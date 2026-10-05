import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { SocialLinks } from "@/components/layout/Header";
import { Container } from "@/components/ui/Section";
import { images } from "@/lib/images";
import { footerNav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest-900 text-white">
      {/* Newsletter band */}
      <div className="border-b border-white/10">
        <Container className="grid items-center gap-6 py-10 lg:grid-cols-[1fr_minmax(0,460px)] lg:py-12">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Stay curious with us</h2>
            <p className="mt-2 text-white/70">Upcoming walks, sky-watch nights and stories from the field — straight to your inbox.</p>
          </div>
          <NewsletterForm dark />
        </Container>
      </div>

      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Link href="/" className="inline-flex items-center gap-4">
            <span className="relative size-20 shrink-0 overflow-hidden rounded-full bg-white ring-4 ring-white/10">
              <Image src={images.logo} alt={`${site.name} logo`} fill sizes="80px" className="object-contain" />
            </span>
            <span>
              <span className="block font-heading text-lg font-bold">{site.name}</span>
              <span lang="bn" className="block text-[15px] text-gold-300">
                {site.banglaTagline}
              </span>
            </span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">
            A community bringing people closer to nature and science in Bangladesh.
          </p>
          <p className="mt-4 text-xs font-semibold tracking-[0.14em] text-white/80 uppercase">{site.tagline}</p>
        </div>

        {footerNav.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold tracking-[0.12em] text-gold-300 uppercase">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[15px] text-white/75 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            {col.title === "Learn" && (
              <div className="mt-8">
                <h3 className="text-sm font-semibold tracking-[0.12em] text-gold-300 uppercase">Contact</h3>
                <ul className="mt-4 space-y-2.5 text-[15px] text-white/75">
                  <li>
                    <a href={`mailto:${site.email}`} className="flex items-start gap-2 break-all hover:text-white">
                      <Mail size={16} className="mt-1 shrink-0" aria-hidden="true" /> {site.email}
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin size={16} aria-hidden="true" /> {site.location}
                  </li>
                </ul>
              </div>
            )}
          </div>
        ))}
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-sm text-white/55 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. {site.motto}.
          </p>
          <div className="flex gap-2">
            <SocialLinks dark />
          </div>
        </Container>
      </div>
    </footer>
  );
}
