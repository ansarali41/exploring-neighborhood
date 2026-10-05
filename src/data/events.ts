import { images } from "@/lib/images";
import type { ActivitySlug } from "./activities";

export type EventItem = {
  slug: string;
  title: string;
  /** ISO date-time in Bangladesh time (+06:00) */
  start: string;
  time: string;
  location: string;
  summary: string;
  audience: string;
  activity: ActivitySlug;
  image: string;
  details?: string[];
};

/*
 * SAMPLE EVENTS — replace dates, times and locations with real ones.
 * Add a new object to this list to publish a new event; past events move to
 * the "Past events" list automatically.
 */
export const events: EventItem[] = [
  {
    slug: "community-bird-walk",
    title: "Community Bird Walk",
    start: "2026-10-17T06:30:00+06:00",
    time: "6:30 AM – 9:00 AM",
    location: "Location to be confirmed",
    summary:
      "Join us for a relaxed community bird walk and learn how to identify common birds by sight and sound.",
    audience: "Everyone — beginners and families welcome",
    activity: "bird-walks",
    image: images.birds,
    details: [
      "Bring binoculars if you have them — we will share spares.",
      "Wear comfortable shoes and clothes in muted colours.",
      "We will record our sightings together for citizen science.",
    ],
  },
  {
    slug: "sky-watch-night",
    title: "Sky Watch Night",
    start: "2026-10-24T18:30:00+06:00",
    time: "6:30 PM – 9:00 PM",
    location: "Location to be confirmed",
    summary:
      "Explore the night sky with telescopes and learn about the Moon, planets, stars and constellations.",
    audience: "Families, students and anyone curious",
    activity: "sky-watch",
    image: images.milkyWay,
    details: [
      "Telescopes are provided.",
      "Sessions depend on clear skies — we will confirm on the day.",
    ],
  },
  {
    slug: "monsoon-frog-walk",
    title: "Evening Frog Walk",
    start: "2026-11-07T19:00:00+06:00",
    time: "7:00 PM – 9:00 PM",
    location: "Location to be confirmed",
    summary:
      "Listen for frog calls after dark and learn how to find, photograph and record frogs responsibly.",
    audience: "Ages 12+ (children with an adult)",
    activity: "frog-walks",
    image: images.frog2,
  },
  {
    slug: "citizen-science-workshop",
    title: "Citizen Science Workshop: Recording with iNaturalist",
    start: "2026-11-21T10:00:00+06:00",
    time: "10:00 AM – 1:00 PM",
    location: "Location to be confirmed",
    summary:
      "A hands-on introduction to photographing species and submitting useful observations through iNaturalist.",
    audience: "Students, teachers and nature enthusiasts",
    activity: "citizen-science",
    image: images.forestPath,
  },
  {
    slug: "winter-bird-count-2026",
    title: "Winter Bird Count",
    start: "2026-01-24T06:30:00+06:00",
    time: "6:30 AM – 10:00 AM",
    location: "Location to be confirmed",
    summary: "Our volunteers counted and recorded wintering birds across local wetlands.",
    audience: "Everyone",
    activity: "bird-walks",
    image: images.lake,
  },
];

const byDate = (a: EventItem, b: EventItem) => +new Date(a.start) - +new Date(b.start);

export function getUpcomingEvents(now = new Date()) {
  return events.filter((e) => new Date(e.start) >= now).sort(byDate);
}

export function getPastEvents(now = new Date()) {
  return events.filter((e) => new Date(e.start) < now).sort((a, b) => byDate(b, a));
}

export const getEvent = (slug: string) => events.find((e) => e.slug === slug);
