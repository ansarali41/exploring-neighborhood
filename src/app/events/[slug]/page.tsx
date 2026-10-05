import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { events, getEvent, getUpcomingEvents } from "@/data/events";
import { getActivity } from "@/data/activities";
import { InterestForm } from "@/components/forms/InterestForm";
import { EventCard } from "@/components/sections/cards";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { CheckList, Section, SectionHeading } from "@/components/ui/Section";
import { site } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/events/[slug]">): Promise<Metadata> {
  const event = getEvent((await params).slug);
  return event ? { title: event.title, description: event.summary } : {};
}

export default async function EventPage({ params }: PageProps<"/events/[slug]">) {
  const event = getEvent((await params).slug);
  if (!event) notFound();

  const activity = getActivity(event.activity);
  const isPast = new Date(event.start) < new Date();
  const more = getUpcomingEvents().filter((e) => e.slug !== event.slug).slice(0, 2);
  const longDate = formatDate(event.start, { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: event.start,
    description: event.summary,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: { "@type": "Place", name: event.location, address: site.location },
    organizer: { "@type": "Organization", name: site.name, url: site.url },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        eyebrow={activity?.title ?? "Event"}
        title={event.title}
        lead={event.summary}
        image={event.image}
        breadcrumbs={[{ label: "Events", href: "/events" }, { label: event.title }]}
      />

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div>
            <dl className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: CalendarDays, label: "Date", value: longDate },
                { icon: Clock, label: "Time", value: event.time },
                { icon: MapPin, label: "Location", value: event.location },
                { icon: Users, label: "Who can attend", value: event.audience },
              ].map(({ icon: IconCmp, label, value }) => (
                <div key={label} className="flex gap-4 rounded-2xl border border-line bg-cream p-5">
                  <IconCmp size={22} className="mt-0.5 shrink-0 text-forest-600" aria-hidden="true" />
                  <div>
                    <dt className="text-sm font-bold tracking-wide text-muted uppercase">{label}</dt>
                    <dd className="mt-0.5 font-semibold">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl">
              <Image src={event.image} alt="" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
            </div>

            <h2 className="mt-10 text-2xl font-bold">About this event</h2>
            <p className="mt-3 text-lg text-muted">{event.summary}</p>
            {event.details && <CheckList items={event.details} className="mt-6" />}
            {activity && (
              <div className="mt-8">
                <ButtonLink href={activity.href} variant="outline" arrow>
                  More about {activity.title.toLowerCase()}
                </ButtonLink>
              </div>
            )}
          </div>

          <aside id="register" className="h-fit scroll-mt-28 rounded-3xl border border-line bg-white p-7 shadow-card-hover lg:sticky lg:top-28 sm:p-8">
            {isPast ? (
              <div className="text-center">
                <h2 className="text-2xl font-bold">This event has ended</h2>
                <p className="mt-2 text-muted">Thanks to everyone who joined! Check out what&apos;s coming up next.</p>
                <ButtonLink href="/events" className="mt-6" arrow>
                  Upcoming events
                </ButtonLink>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold">Register Interest</h2>
                <p className="mt-1 mb-6 text-[15px] text-muted">Places are limited — let us know you&apos;re coming.</p>
                <InterestForm eventTitle={event.title} />
              </>
            )}
          </aside>
        </div>
      </Section>

      {more.length > 0 && (
        <Section tone="soft">
          <SectionHeading eyebrow="Also coming up" title="More events" />
          <div className="grid gap-6">
            {more.map((e) => (
              <EventCard key={e.slug} event={e} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
