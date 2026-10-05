import { images } from "@/lib/images";

export type ActivitySlug = "bird-walks" | "frog-walks" | "sky-watch" | "citizen-science" | "education";

export type Activity = {
  slug: ActivitySlug;
  title: string;
  /** Card summary used on the home + activities pages */
  summary: string;
  /** Detail page heading */
  heading: string;
  lead: string;
  listTitle: string;
  list: string[];
  image: string;
  href: string;
};

// Copy from the "Activities Page" section of the brief.
export const activities: Activity[] = [
  {
    slug: "bird-walks",
    title: "Bird Walks",
    summary:
      "Learn to identify local birds by sight and sound while exploring the neighbourhood habitats. Learn survey methodology, photography, identification and recording.",
    heading: "Start with the birds around you.",
    lead: "Our guided walks help you learn to identify birds around you.",
    listTitle: "What you'll learn",
    list: [
      "Beginner-friendly identification",
      "Bird calls",
      "Observation and photography",
      "Recording observations for citizen science",
    ],
    image: images.roller,
    href: "/activities/bird-walks",
  },
  {
    slug: "frog-walks",
    title: "Frog Walks",
    summary:
      "Learn to identify local frogs by sight and sound while exploring the neighbourhood habitats. Learn survey methodology, photography, identification and recording.",
    heading: "Start with the frogs around you.",
    lead: "Our guided walks help you learn to identify frogs around you.",
    listTitle: "What you'll learn",
    list: [
      "Beginner-friendly identification",
      "Frog calls",
      "Observation and photography",
      "Recording observations for citizen science",
    ],
    image: images.frogs,
    href: "/activities/frog-walks",
  },
  {
    slug: "sky-watch",
    title: "Sky Watch",
    summary:
      "Explore the night sky through guided telescope sessions, astronomy talks and family-friendly observation nights.",
    heading: "Look up. Ask questions. Explore.",
    lead: "From the Moon and planets to constellations and meteor showers, our sky-watch sessions connect people with astronomy and science.",
    listTitle: "Sessions can include",
    list: [
      "Telescope demonstrations",
      "Naked-eye sky orientation",
      "Astronomy talks",
      "Simple activities for young learners",
    ],
    image: images.sky,
    href: "/activities/sky-watch",
  },
  {
    slug: "citizen-science",
    title: "Citizen Science",
    summary:
      "Learn how to record biodiversity through citizen science platforms, submit observations through mobile apps (iNaturalist, etc.) and contribute observations to inform national and global conservation.",
    heading: "Everyone can contribute to science.",
    lead: "We train people to observe carefully, identify species responsibly and turn observations into useful biodiversity records for national and global conservation efforts.",
    listTitle: "How it works",
    list: ["Observe", "Identify", "Record"],
    image: images.forestPath,
    href: "/citizen-science",
  },
  {
    slug: "education",
    title: "Education",
    summary:
      "Hands-on workshops for children, students and adults covering ecosystem services, wildlife, plants, insects, and astronomy.",
    heading: "Building the next generation of explorers.",
    lead: "We create practical learning opportunities where science starts with direct experience.",
    listTitle: "What we offer",
    list: [
      "Wildlife identification workshops",
      "School and community engagement",
      "Nature photography and field skills",
      "Environmental awareness activities",
      "Astronomy talks and presentations",
    ],
    image: images.seedlings,
    href: "/activities/education",
  },
];

export const getActivity = (slug: string) => activities.find((a) => a.slug === slug);

/** Activities that have their own page under /activities/[slug] */
export const activityPages = activities.filter((a) => a.href.startsWith("/activities/"));
