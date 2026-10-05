import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { CtaBand } from "@/components/sections/CtaBand";
import { IconBadge, type IconName } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Join Us",
  description:
    "You don't need to be an expert to become an explorer. Join the Exploring Neighbourhood community, take part in activities and share your observations.",
};

const options: { title: string; text: string; href: string; cta: string; icon: IconName }[] = [
  {
    title: "Join the Community",
    text: "Connect with others who share your curiosity about birds, frogs, plants and the sky.",
    href: "/contact",
    cta: "Get in touch",
    icon: "users",
  },
  {
    title: "Participate in Activities",
    text: "Come along to a bird walk, frog walk, sky-watch night or workshop.",
    href: "/events",
    cta: "Register for an Event",
    icon: "binoculars",
  },
  {
    title: "Receive Updates",
    text: "Hear about new events, stories and resources by email.",
    href: "#updates",
    cta: "Subscribe",
    icon: "bell",
  },
  {
    title: "Share Your Observations",
    text: "Record what you see and contribute to biodiversity knowledge.",
    href: "/citizen-science#share",
    cta: "Share Your Observation",
    icon: "camera",
  },
];

export default function JoinUsPage() {
  return (
    <>
      <PageHero
        eyebrow="Join Us"
        title="Become Part of the Community"
        lead="You don't need to be an expert to become an explorer."
        image={images.hills}
        breadcrumbs={[{ label: "Get Involved" }, { label: "Join Us" }]}
      />

      <Section tone="white">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow">There&apos;s a place for you</p>
            <h2 className="mt-3 text-3xl leading-tight font-bold sm:text-4xl">Curiosity is the only requirement.</h2>
            <p className="mt-5 text-lg text-muted">
              Whether you are interested in birds, frogs, astronomy, photography, science or simply spending time outdoors,
              there is a place for you at Exploring Neighbourhood.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-card-hover">
            <Image src={images.forestPath} alt="A path through a forest" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeading eyebrow="Ways to join" title="Choose how you'd like to get involved" align="center" />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {options.map((o, i) => (
            <li key={o.title}>
              <Link
                href={o.href}
                className="group flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
              >
                <IconBadge name={o.icon} tone={i % 2 ? "gold" : "forest"} />
                <h3 className="mt-5 text-lg font-bold">{o.title}</h3>
                <p className="mt-2 flex-1 text-[15px] text-muted">{o.text}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-600">
                  {o.cta} <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="cream" id="updates" size="narrow">
        <div className="rounded-3xl border border-line bg-white p-8 text-center shadow-card sm:p-12">
          <IconBadge name="bell" className="mx-auto" />
          <h2 className="mt-5 text-3xl font-bold">Receive Updates</h2>
          <p className="mx-auto mt-3 max-w-md text-muted">New walks, sky-watch nights, stories and resources — once or twice a month, never spam.</p>
          <NewsletterForm className="mx-auto mt-8 max-w-lg" />
        </div>
      </Section>

      <CtaBand eyebrow="Volunteer" title="Want to do more?" text="Bring your curiosity, skills and enthusiasm — we'd love your help." image={images.hills} />
    </>
  );
}
