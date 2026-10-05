import type { Metadata } from "next";
import { getPastEvents, getUpcomingEvents } from "@/data/events";
import { EventCard } from "@/components/sections/cards";
import { CtaBand } from "@/components/sections/CtaBand";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Events",
  description: "Community bird walks, frog walks, sky-watch nights and citizen-science workshops. Register your interest.",
};

export default function EventsPage() {
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();

  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Come and explore with us"
        lead="Relaxed, beginner-friendly walks, sky-watch nights and workshops. Everyone is welcome."
        image={images.birds}
        breadcrumbs={[{ label: "Events" }]}
      />

      <Section tone="cream">
        <SectionHeading eyebrow="Upcoming" title="Upcoming events" />
        {upcoming.length ? (
          <div className="grid gap-6">
            {upcoming.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-line bg-white p-10 text-center">
            <p className="text-lg font-semibold">No events scheduled right now.</p>
            <p className="mt-2 text-muted">Subscribe below and we&apos;ll let you know when the next one is announced.</p>
          </div>
        )}

        <div className="mt-12 grid items-center gap-6 rounded-3xl border border-line bg-leaf-100/70 p-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">Never miss an event</h2>
            <p className="mt-1 text-muted">Get new walks and sky-watch nights in your inbox.</p>
          </div>
          <NewsletterForm />
        </div>
      </Section>

      {past.length > 0 && (
        <Section tone="white">
          <SectionHeading eyebrow="Archive" title="Past events" />
          <div className="grid gap-6 opacity-90">
            {past.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        </Section>
      )}

      <CtaBand />
    </>
  );
}
