import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { activityPages, getActivity } from "@/data/activities";
import { getUpcomingEvents } from "@/data/events";
import { ActivityCard, EventCard } from "@/components/sections/cards";
import { CtaBand } from "@/components/sections/CtaBand";
import { ButtonLink } from "@/components/ui/Button";
import { IconBadge } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { CheckList, Section, SectionHeading } from "@/components/ui/Section";

export function generateStaticParams() {
  return activityPages.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/activities/[slug]">): Promise<Metadata> {
  const activity = getActivity((await params).slug);
  return activity ? { title: activity.title, description: activity.summary } : {};
}

export default async function ActivityPage({ params }: PageProps<"/activities/[slug]">) {
  const activity = getActivity((await params).slug);
  if (!activity) notFound();

  const related = getUpcomingEvents().filter((e) => e.activity === activity.slug);
  const others = activityPages.filter((a) => a.slug !== activity.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={activity.title}
        title={activity.heading}
        lead={activity.lead}
        image={activity.image}
        breadcrumbs={[{ label: "Activities", href: "/activities" }, { label: activity.title }]}
      >
        <ButtonLink href="/events" variant="gold" arrow>
          Register for an Event
        </ButtonLink>
        <ButtonLink href="/contact" variant="outline-light">
          Ask a question
        </ButtonLink>
      </PageHero>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <IconBadge name={activity.slug} />
            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">About {activity.title.toLowerCase()}</h2>
            <p className="mt-5 text-lg text-muted">{activity.summary}</p>
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl">
              <Image src={activity.image} alt="" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
            </div>
          </div>
          <aside className="h-fit rounded-3xl border border-line bg-leaf-100/60 p-8 lg:sticky lg:top-28">
            <h3 className="text-xl font-bold">{activity.listTitle}</h3>
            <CheckList items={activity.list} className="mt-5" />
            <div className="mt-8 space-y-3 border-t border-line pt-6">
              <ButtonLink href="/events" className="w-full" arrow>
                Register for an Event
              </ButtonLink>
              <ButtonLink href="/volunteer" variant="outline" className="w-full">
                Volunteer
              </ButtonLink>
            </div>
          </aside>
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="cream">
          <SectionHeading eyebrow="Upcoming" title={`Next ${activity.title.toLowerCase()}`} />
          <div className="grid gap-6">
            {related.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        </Section>
      )}

      <Section tone="soft">
        <SectionHeading eyebrow="Keep exploring" title="More activities" />
        <div className="grid gap-6 md:grid-cols-3">
          {others.map((a) => (
            <ActivityCard key={a.slug} activity={a} />
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
