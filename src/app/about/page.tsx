import type { Metadata } from "next";
import Image from "next/image";
import { pillars } from "@/data/about";
import { CtaBand } from "@/components/sections/CtaBand";
import { Gallery } from "@/components/sections/Gallery";
import { ButtonLink } from "@/components/ui/Button";
import { IconBadge } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Everyone can become a nature observer and citizen scientist. Learn about Exploring Neighbourhood's mission and our four pillars.",
};

const gallery = [
  { src: images.roller, alt: "Indian roller perched on a branch" },
  { src: images.frogs, alt: "Tree frog on a red flower" },
  { src: images.milkyWay, alt: "Milky Way over the horizon" },
  { src: images.lake, alt: "Forest meeting a lake, seen from above" },
  { src: images.tree, alt: "A large tree in open grassland" },
  { src: images.seedlings, alt: "Young seedlings growing in pots" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Get Close to Nature and the Sky"
        lead="You don't need to be a professional biologist to discover biodiversity or a physicist to explore the wonders of the sky."
        image={images.about}
        breadcrumbs={[{ label: "About Us" }]}
      />

      {/* Mission */}
      <Section tone="white">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow">Our mission</p>
            <h2 className="mt-3 text-3xl leading-tight font-bold sm:text-4xl">Everyone can become a nature observer and citizen scientist.</h2>
            <p className="mt-5 text-lg text-muted">
              At Exploring Neighbourhood, we believe everyone can become a nature observer and citizen scientist.
            </p>
            <p className="mt-4 text-muted">
              Our mission is to make nature and science accessible to children, students, families and communities. Through
              hands-on experiences and community activities, we encourage people to discover the natural world, identify
              wildlife, record observations, and make informed choices that support conservation.
            </p>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-card-hover">
              <Image src={images.forestPath} alt="A path through a green forest" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-4 hidden rounded-2xl border border-line bg-white p-5 shadow-card sm:block">
              <p className="font-heading text-sm font-bold tracking-wide text-forest-600">Explore • Learn • Record • Conserve</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Four pillars */}
      <Section tone="soft">
        <SectionHeading eyebrow="What guides us" title="Our four pillars" align="center" />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <li key={pillar.title} className="rounded-2xl border border-line bg-white p-7 shadow-card">
              <IconBadge name={pillar.icon} tone={i % 2 ? "gold" : "forest"} />
              <h3 className="mt-5 text-lg font-bold">{pillar.title}</h3>
              <p className="mt-2 text-[15px] text-muted">{pillar.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Nature + sky */}
      <Section tone="white">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
              <Image src={images.birds} alt="A small bird on a branch" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
            </div>
            <div className="relative mt-10 aspect-[3/4] overflow-hidden rounded-3xl">
              <Image src={images.sky} alt="A starry night sky over mountains" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
            </div>
          </div>
          <div>
            <p className="eyebrow">Explore Nature. Discover the Sky.</p>
            <h2 className="mt-3 text-3xl leading-tight font-bold sm:text-4xl">Every experience is an opportunity to learn.</h2>
            <p className="mt-5 text-muted">
              Join our community nature walks to explore the birds and frogs, and other wildlife living around us. Learn from
              experts and fellow nature enthusiasts how to identify species, understand their habitats and the important roles
              they play in ecosystems. Learn how plants and animals around us provide ecological services that help us breathe
              and live.
            </p>
            <p className="mt-4 text-muted">
              Join our guided Sky Watch sessions to observe the Moon, stars and planets through telescopes and discover the
              wonders of the universe.
            </p>
            <p className="mt-4 text-muted">
              Whether you&apos;re exploring a nearby wetland, listening to frogs after rain or observing the Moon through a
              telescope, every experience is an opportunity to learn, connect and contribute.
            </p>
            <blockquote className="mt-8 border-l-4 border-gold-500 pl-5 font-heading text-xl leading-snug font-semibold text-forest-700">
              Discover the nature around you. Explore the sky above you. Become part of the journey.
            </blockquote>
            <div className="mt-8">
              <ButtonLink href="/activities" arrow>
                Explore Activities
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      {/* Gallery */}
      <Section tone="cream">
        <SectionHeading eyebrow="Gallery" title="Life around us" lead="A glimpse of the species and landscapes we explore together." />
        <Gallery items={gallery} />
      </Section>

      <CtaBand />
    </>
  );
}
