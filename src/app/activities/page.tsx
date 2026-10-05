import type { Metadata } from "next";
import Image from "next/image";
import { activities } from "@/data/activities";
import { CtaBand } from "@/components/sections/CtaBand";
import { ButtonLink } from "@/components/ui/Button";
import { IconBadge } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { CheckList, Section } from "@/components/ui/Section";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Activities",
  description: "Bird walks, frog walks, sky watch, citizen science and education — practical activities that turn curiosity into knowledge.",
};

export default function ActivitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Activities"
        title="Practical activities that turn curiosity into knowledge"
        lead="…and knowledge into conservation."
        image={images.mistyForest}
        breadcrumbs={[{ label: "Activities" }]}
      >
        <ButtonLink href="/events" variant="gold" arrow>
          Register for an Event
        </ButtonLink>
      </PageHero>

      {/* Quick jump */}
      <div className="sticky top-[68px] z-30 border-b border-line bg-white/95 backdrop-blur sm:top-[72px]">
        <nav aria-label="Activities" className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          {activities.map((a) => (
            <a
              key={a.slug}
              href={`#${a.slug}`}
              className="shrink-0 rounded-full border border-line px-4 py-1.5 text-sm font-medium text-forest-800 transition-colors hover:border-forest-600 hover:bg-leaf-100"
            >
              {a.title}
            </a>
          ))}
        </nav>
      </div>

      {activities.map((activity, i) => (
        <Section key={activity.slug} id={activity.slug} tone={i % 2 ? "soft" : "cream"} className="scroll-mt-36">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className={cn("relative aspect-[4/3] overflow-hidden rounded-3xl shadow-card-hover", i % 2 && "lg:order-2")}>
              <Image src={activity.image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <IconBadge name={activity.slug} />
                <p className="eyebrow">{activity.title}</p>
              </div>
              <h2 className="mt-4 text-3xl leading-tight font-bold sm:text-4xl">{activity.heading}</h2>
              <p className="mt-4 text-lg text-muted">{activity.summary}</p>
              <p className="mt-6 text-sm font-bold tracking-wide text-forest-800 uppercase">{activity.listTitle}</p>
              <CheckList items={activity.list} className="mt-3" />
              <div className="mt-8">
                <ButtonLink href={activity.href} variant="outline" arrow>
                  Learn More
                </ButtonLink>
              </div>
            </div>
          </div>
        </Section>
      ))}

      <CtaBand title="Ready to explore?" text="Find an upcoming walk, sky-watch night or workshop near you." >
        <ButtonLink href="/events" variant="gold" size="lg" arrow>
          Register for an Event
        </ButtonLink>
        <ButtonLink href="/join-us" variant="outline-light" size="lg">
          Join Us
        </ButtonLink>
      </CtaBand>
    </>
  );
}
