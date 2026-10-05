import Image from "next/image";
import { activities } from "@/data/activities";
import { citizenScienceSteps, pillars, taglineSteps } from "@/data/about";
import { getUpcomingEvents } from "@/data/events";
import { sortedStories } from "@/data/news";
import { ActivityCard, EventCard, StoryCard } from "@/components/sections/cards";
import { CtaBand } from "@/components/sections/CtaBand";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, IconBadge } from "@/components/ui/Icon";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const upcoming = getUpcomingEvents().slice(0, 3);
  const latest = sortedStories.slice(0, 3);

  return (
    <>
      {/* ——— Hero ——— */}
      <section className="relative isolate flex min-h-160 items-center overflow-hidden bg-forest-950 text-white lg:min-h-[min(100svh,920px)]">
        <Image src={images.hero} alt="Sunlight falling through a green forest" fill priority sizes="100vw" quality={85} className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-forest-950/95 via-forest-950/70 to-forest-950/20" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-linear-to-t from-forest-950/70 to-transparent" />

        <Container size="wide" className="grid items-center gap-12 pt-32 pb-36 lg:grid-cols-[1.25fr_1fr] lg:pb-40">
          <div className="max-w-2xl animate-fade-up">
            <p lang="bn" className="text-lg font-semibold text-gold-300">
              {site.banglaTagline}
            </p>
            <h1 className="mt-3 text-[2.75rem] leading-[1.02] font-bold sm:text-6xl lg:text-7xl">Discover What Lives Around You</h1>
            <p className="mt-5 text-xl font-medium text-white sm:text-2xl">Explore Your Neighbourhood. Connect with Nature.</p>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/80">
              Welcome to Exploring Neighbourhood — a community bringing people closer to nature and science. Discover local
              biodiversity, explore the natural world, share ideas, and build skills to help care for our environment.
            </p>
            <div className="mt-9">
              <ButtonLink href="/activities" variant="gold" size="lg" arrow>
                Explore Activities
              </ButtonLink>
            </div>
          </div>

          <div className="relative hidden justify-center lg:flex">
            <div className="absolute size-[420px] rounded-full bg-gold-300/20 blur-3xl" />
            <div className="relative size-[380px] overflow-hidden rounded-full bg-white shadow-2xl ring-8 ring-white/15 xl:size-[420px]">
              <Image src={images.logo} alt={`${site.name} logo`} fill priority sizes="420px" className="object-contain" />
            </div>
          </div>
        </Container>

        {/* Tagline strip */}
        <div className="absolute inset-x-0 bottom-0">
          <Container size="wide">
            <ul className="grid grid-cols-4 overflow-hidden rounded-t-2xl border border-b-0 border-white/15 bg-white/10 backdrop-blur-md">
              {taglineSteps.map((step, i) => (
                <li
                  key={step.label}
                  className={cn(
                    "flex flex-col items-center gap-1.5 px-2 py-4 text-center sm:flex-row sm:justify-center sm:gap-3 sm:py-5",
                    i > 0 && "border-l border-white/15",
                  )}
                >
                  <Icon name={step.icon} size={22} className="text-gold-300" />
                  <span className="text-sm font-semibold tracking-wide sm:text-base">{step.label}</span>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      </section>

      {/* ——— Welcome + four pillars ——— */}
      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <p className="eyebrow">Welcome</p>
            <h2 className="mt-3 text-3xl leading-tight font-bold sm:text-4xl">
              A community bringing people closer to nature and science.
            </h2>
            <p className="mt-5 text-lg text-muted">
              From nature walks and sky watching to citizen science, workshops, and community activities, there are many ways
              to get involved, learn together, and make a difference.
            </p>
            <p className="mt-4 text-muted">
              You don&apos;t have to be a professional scientist to explore nature, learn about biodiversity and contribute to
              science. Discover what&apos;s happening, find resources, and connect with others who share your curiosity about the
              world around you.
            </p>
            <div className="mt-8">
              <ButtonLink href="/about" variant="outline" arrow>
                Learn More
              </ButtonLink>
            </div>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {pillars.map((pillar, i) => (
              <li
                key={pillar.title}
                className={cn(
                  "rounded-2xl border border-line p-6 transition-shadow hover:shadow-card",
                  i === 0 || i === 3 ? "bg-leaf-100/60" : "bg-cream",
                )}
              >
                <IconBadge name={pillar.icon} tone={i % 2 ? "gold" : "forest"} />
                <h3 className="mt-4 text-lg font-bold">{pillar.title}</h3>
                <p className="mt-1.5 text-[15px] text-muted">{pillar.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ——— Activities ——— */}
      <Section tone="soft">
        <SectionHeading
          eyebrow="Activities"
          title="Practical activities that turn curiosity into knowledge."
          lead="…and knowledge into conservation. Birds, frogs, plants and the night sky — there's something for every explorer."
          action={
            <ButtonLink href="/activities" variant="outline" arrow>
              All activities
            </ButtonLink>
          }
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {activities.map((activity, i) => (
            <div key={activity.slug} className={i < 3 ? "lg:col-span-2" : "lg:col-span-3"}>
              <ActivityCard activity={activity} />
            </div>
          ))}
        </div>
      </Section>

      {/* ——— Citizen science ——— */}
      <section className="relative isolate overflow-hidden bg-forest-900 py-20 text-white lg:py-28">
        <Image src={images.forestPath} alt="" fill sizes="100vw" className="-z-20 object-cover opacity-20" />
        <div className="absolute inset-0 -z-10 bg-linear-to-br from-forest-950 via-forest-900/95 to-forest-800/90" />
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow text-gold-300">Citizen Science</p>
            <h2 className="mt-3 text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">Everyone can contribute to science.</h2>
            <p className="mt-5 text-lg text-white/80">
              We train people to observe carefully, identify species responsibly and turn observations into useful
              biodiversity records for national and global conservation efforts.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/citizen-science" variant="gold" arrow>
                Learn More
              </ButtonLink>
              <ButtonLink href="/citizen-science#share" variant="outline-light">
                Share Your Observation
              </ButtonLink>
            </div>
          </div>
          <ol className="space-y-4">
            {citizenScienceSteps.map((step, i) => (
              <li key={step.title} className="flex gap-5 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <span className="font-heading text-4xl leading-none font-bold text-gold-300/90">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="flex items-center gap-2 text-xl font-bold">
                    <Icon name={step.icon} size={20} className="text-gold-300" /> {step.title}
                  </h3>
                  <p className="mt-1.5 text-white/75">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ——— Upcoming events ——— */}
      <Section tone="cream">
        <SectionHeading
          eyebrow="Events"
          title="Upcoming events"
          lead="Walks, sky-watch nights and workshops — come and explore with us."
          action={
            <ButtonLink href="/events" variant="outline" arrow>
              See all events
            </ButtonLink>
          }
        />
        {upcoming.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((event) => (
              <EventCard key={event.slug} event={event} variant="compact" />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-line bg-white p-8 text-center text-muted">
            New events are announced soon — subscribe to our newsletter to hear first.
          </p>
        )}
      </Section>

      {/* ——— Stories ——— */}
      <Section tone="white">
        <SectionHeading
          eyebrow="News & Stories"
          title="From the field"
          lead="Species of the month, field notes and the people helping document biodiversity."
          action={
            <ButtonLink href="/news" variant="outline" arrow>
              All stories
            </ButtonLink>
          }
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((story) => (
            <StoryCard key={story.slug} story={story} />
          ))}
        </div>
      </Section>

      <CtaBand
        title="Wants to participate? Start here."
        text="Whether you are interested in birds, frogs, astronomy, photography, science or simply spending time outdoors, there is a place for you at Exploring Neighbourhood."
      />
    </>
  );
}
