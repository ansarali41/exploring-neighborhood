/**
 * Global site settings. Edit this file to update contact details,
 * social links and navigation across the whole website.
 */
export const site = {
  name: "Exploring Neighbourhood",
  tagline: "Explore • Learn • Record • Conserve",
  banglaTagline: "আমাদের চারপাশের প্রকৃতি",
  motto: "People for nature in Bangladesh",
  description:
    "Exploring Neighbourhood is a community-based nature and science initiative in Bangladesh — nature walks, bird and frog observations, sky watching, citizen science and environmental education.",
  url: "https://exploringneighbourhood.org",
  email: "nature@exploringneighbourhood.org",
  location: "Bangladesh",
  social: {
    // TODO: add real profile links
    facebook: "#",
    instagram: "#",
    youtube: "#",
  },
} as const;

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  label: string;
  /** Section landing page — used for the active state of the group */
  href: string;
  items: NavLink[];
};

export type NavEntry = NavLink | NavGroup;

export const isNavGroup = (entry: NavEntry): entry is NavGroup => "items" in entry;

/**
 * The brief lists 11 menu items. They are grouped into 6 top-level entries
 * so the header stays on a single line and easy to scan.
 */
export const mainNav: NavEntry[] = [
  { label: "About", href: "/about" },
  {
    label: "Activities",
    href: "/activities",
    items: [
      { label: "All Activities", href: "/activities", description: "Everything we do, in one place" },
      { label: "Bird Walks", href: "/activities/bird-walks", description: "Identify birds by sight and sound" },
      { label: "Frog Walks", href: "/activities/frog-walks", description: "Listen for frogs after the rain" },
      { label: "Sky Watch", href: "/activities/sky-watch", description: "Telescopes, the Moon and planets" },
      { label: "Education", href: "/activities/education", description: "Workshops for all ages" },
    ],
  },
  {
    label: "Science",
    href: "/citizen-science",
    items: [
      { label: "Citizen Science", href: "/citizen-science", description: "Observe, identify and record species" },
      { label: "Research & Monitoring", href: "/research", description: "Learning from the living world" },
    ],
  },
  { label: "Events", href: "/events" },
  {
    label: "Learn",
    href: "/news",
    items: [
      { label: "News & Stories", href: "/news", description: "Field notes, species and spotlights" },
      { label: "Resources", href: "/resources", description: "Guides, ID sheets and publications" },
    ],
  },
  {
    label: "Get Involved",
    href: "/join-us",
    items: [
      { label: "Join Us", href: "/join-us", description: "Become part of the community" },
      { label: "Volunteer", href: "/volunteer", description: "Share your time and skills" },
      { label: "Contact", href: "/contact", description: "Questions, ideas and partnerships" },
    ],
  },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Activities", href: "/activities" },
      { label: "Citizen Science", href: "/citizen-science" },
      { label: "Research & Monitoring", href: "/research" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { label: "Events", href: "/events" },
      { label: "Join Us", href: "/join-us" },
      { label: "Volunteer", href: "/volunteer" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "News & Stories", href: "/news" },
      { label: "Resources", href: "/resources" },
    ],
  },
];
