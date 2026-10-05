import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { citizenScienceSteps } from "@/data/about";
import { CtaBand } from "@/components/sections/CtaBand";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { CheckList, Section, SectionHeading } from "@/components/ui/Section";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Citizen Science",
  description:
    "Everyone can contribute to science. Learn to observe, identify and record species, and turn observations into useful biodiversity records.",
};

const platforms = [
  { name: "iNaturalist", text: "Photograph any plant, animal or fungus and get help identifying it.", href: "https://www.inaturalist.org" },
  { name: "eBird", text: "Submit bird checklists that feed into global bird research.", href: "https://ebird.org" },
];

export default function CitizenSciencePage() {
  return (
    <>
      <PageHero
        eyebrow="Citizen Science"
        title="Everyone can contribute to science."
        lead="We train people to observe carefully, identify species responsibly and turn observations into useful biodiversity records for national and global conservation efforts."
        image={images.forestPath}
        breadcrumbs={[{ label: "Science" }, { label: "Citizen Science" }]}
      >
        <ButtonLink href="#share" variant="gold" arrow>
          Share Your Observation
        </ButtonLink>
      </PageHero>

      <Section tone="white">
        <SectionHeading eyebrow="How it works" title="Three simple steps" align="center" lead="You don't have to be a professional scientist to explore nature and contribute to science." />
        <ol className="relative grid gap-6 md:grid-cols-3">
          <span aria-hidden="true" className="absolute top-10 right-[16%] left-[16%] hidden h-px border-t-2 border-dashed border-line md:block" />
          {citizenScienceSteps.map((step, i) => (
            <li key={step.title} className="relative rounded-2xl border border-line bg-white p-8 text-center shadow-card">
              <span className="relative mx-auto flex size-20 items-center justify-center rounded-full bg-forest-600 text-white ring-8 ring-leaf-100">
                <Icon name={step.icon} size={32} strokeWidth={1.75} />
              </span>
              <p className="mt-6 text-sm font-bold tracking-wider text-gold-600 uppercase">Step {i + 1}</p>
              <h3 className="mt-1 text-2xl font-bold">{step.title}</h3>
              <p className="mt-3 text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="soft">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-card-hover">
            <Image src={images.roller} alt="Indian roller perched on a branch" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <p className="eyebrow">Why it matters</p>
            <h2 className="mt-3 text-3xl leading-tight font-bold sm:text-4xl">Your observations inform conservation.</h2>
            <p className="mt-5 text-muted">
              Every photo, sound recording and note adds to what we know about where species live and how their populations
              are changing. Together, these records inform national and global conservation.
            </p>
            <CheckList
              className="mt-6"
              items={[
                "Learn field marks, calls and habitats",
                "Photograph and record species responsibly",
                "Submit observations through mobile apps",
                "Contribute to real biodiversity research",
              ]}
            />
          </div>
        </div>
      </Section>

      <Section tone="cream" id="share">
        <SectionHeading
          eyebrow="Share Your Observation"
          title="Start recording today"
          lead="These free platforms let you submit observations from your phone. Join one of our workshops to learn how to use them well."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {platforms.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start justify-between gap-6 rounded-2xl border border-line bg-white p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
            >
              <span>
                <span className="block text-xl font-bold">{p.name}</span>
                <span className="mt-2 block text-muted">{p.text}</span>
              </span>
              <ExternalLink size={20} className="mt-1 shrink-0 text-forest-600" aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/events" arrow>
            Join a workshop
          </ButtonLink>
          <ButtonLink href="/resources" variant="outline">
            Browse resources
          </ButtonLink>
        </div>
      </Section>

      <CtaBand
        eyebrow="Research & Monitoring"
        title="See where the data goes."
        text="Our research projects use citizen-science records alongside acoustic and field monitoring."
        image={images.seedlings}
      >
        <ButtonLink href="/research" variant="gold" size="lg" arrow>
          Explore the research
        </ButtonLink>
      </CtaBand>
    </>
  );
}
