import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock, MapPin, Users } from "lucide-react";
import type { Activity } from "@/data/activities";
import type { EventItem } from "@/data/events";
import type { Story } from "@/data/news";
import type { ResearchProject } from "@/data/research";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Section";
import { cn, dateParts, formatDate } from "@/lib/utils";

const cardBase =
  "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover";

export function ActivityCard({ activity, priority = false }: { activity: Activity; priority?: boolean }) {
  return (
    <article className={cardBase}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={activity.image}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 inline-flex size-11 items-center justify-center rounded-xl bg-white/95 text-forest-600 shadow-sm">
          <Icon name={activity.slug} size={22} strokeWidth={1.8} />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold">
          <Link href={activity.href} className="after:absolute after:inset-0">
            {activity.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{activity.summary}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-600">
          Learn more <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}

export function EventCard({ event, variant = "row" }: { event: EventItem; variant?: "row" | "compact" }) {
  const { day, month } = dateParts(event.start);
  const past = new Date(event.start) < new Date();

  if (variant === "compact") {
    return (
      <article className={cardBase}>
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image src={event.image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
          <DateBlock day={day} month={month} className="absolute top-4 left-4" />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-lg leading-snug font-bold">
            <Link href={`/events/${event.slug}`} className="after:absolute after:inset-0">
              {event.title}
            </Link>
          </h3>
          <EventMeta event={event} className="mt-3" />
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-600">
            Register Interest <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </article>
    );
  }

  return (
    <article className={cn(cardBase, "sm:flex-row")}>
      <div className="relative aspect-[16/9] shrink-0 overflow-hidden sm:aspect-auto sm:w-64 lg:w-72">
        <Image src={event.image} alt="" fill sizes="(min-width: 640px) 288px, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col gap-5 p-6 sm:flex-row sm:items-start">
        <DateBlock day={day} month={month} className="hidden sm:flex" />
        <div className="flex flex-1 flex-col">
          <p className="text-sm font-semibold text-forest-600 sm:hidden">{formatDate(event.start, { weekday: "long", day: "numeric", month: "long" })}</p>
          <h3 className="text-xl leading-snug font-bold">
            <Link href={`/events/${event.slug}`} className="after:absolute after:inset-0">
              {event.title}
            </Link>
          </h3>
          <p className="mt-2 text-[15px] text-muted">{event.summary}</p>
          <EventMeta event={event} showAudience className="mt-4" />
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-600">
            {past ? "View event" : "Register Interest"}
            <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </article>
  );
}

export function DateBlock({ day, month, className }: { day: string; month: string; className?: string }) {
  return (
    <span className={cn("flex w-16 shrink-0 flex-col items-center rounded-xl border border-line bg-white py-2 shadow-sm", className)}>
      <span className="font-heading text-2xl leading-none font-bold text-forest-800">{day}</span>
      <span className="mt-1 text-xs font-bold tracking-wider text-forest-600 uppercase">{month}</span>
    </span>
  );
}

export function EventMeta({ event, showAudience = false, className }: { event: EventItem; showAudience?: boolean; className?: string }) {
  return (
    <ul className={cn("space-y-1.5 text-sm text-muted", className)}>
      <li className="flex items-center gap-2">
        <Clock size={15} className="shrink-0 text-forest-600" aria-hidden="true" /> {event.time}
      </li>
      <li className="flex items-center gap-2">
        <MapPin size={15} className="shrink-0 text-forest-600" aria-hidden="true" /> {event.location}
      </li>
      {showAudience && (
        <li className="flex items-center gap-2">
          <Users size={15} className="shrink-0 text-forest-600" aria-hidden="true" /> {event.audience}
        </li>
      )}
    </ul>
  );
}

export function StoryCard({ story, featured = false }: { story: Story; featured?: boolean }) {
  return (
    <article className={cn(cardBase, featured && "lg:grid lg:grid-cols-2")}>
      <div className={cn("relative overflow-hidden", featured ? "aspect-[16/10] lg:aspect-auto lg:min-h-[380px]" : "aspect-[16/10]")}>
        <Image
          src={story.image}
          alt=""
          fill
          sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className={cn("flex flex-1 flex-col p-6", featured && "lg:justify-center lg:p-10")}>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
          <Badge>{story.category}</Badge>
          <time dateTime={story.date}>{formatDate(story.date)}</time>
        </div>
        <h3 className={cn("mt-4 leading-snug font-bold", featured ? "text-2xl sm:text-3xl" : "text-xl")}>
          <Link href={`/news/${story.slug}`} className="after:absolute after:inset-0">
            {story.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{story.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-600">
          Read the Story <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}

export function ProjectCard({ project }: { project: ResearchProject }) {
  const statusTone = {
    Ongoing: "bg-leaf-100 text-forest-600",
    Planned: "bg-sky-100 text-sky-600",
    Completed: "bg-earth-100 text-earth-700",
  }[project.status];

  return (
    <article className={cardBase}>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={project.image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className={cn("absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-bold", statusTone)}>{project.status}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow">{project.theme}</p>
        <h3 className="mt-2 text-xl leading-snug font-bold">
          <Link href={`/research/${project.slug}`} className="after:absolute after:inset-0">
            {project.name}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-[15px] text-muted">{project.question}</p>
        <p className="mt-4 flex items-center gap-2 text-sm text-muted">
          <MapPin size={15} className="text-forest-600" aria-hidden="true" /> {project.location}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-600">
          Explore the Project <ArrowUpRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </article>
  );
}
