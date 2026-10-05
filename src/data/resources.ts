export const resourceCategories = [
  "Bird identification",
  "Frog identification",
  "Plant identification",
  "Wildlife photography",
  "Citizen science",
  "Nature education",
  "Astronomy",
  "Biodiversity",
  "Conservation",
  "Research publications",
] as const;

export const resourceTypes = ["PDF", "Guide", "Link", "Video", "Identification", "Publication"] as const;

export type ResourceCategory = (typeof resourceCategories)[number];
export type ResourceType = (typeof resourceTypes)[number];

export type Resource = {
  title: string;
  description: string;
  category: ResourceCategory;
  type: ResourceType;
  /** File in /public/resources or an external URL */
  href: string;
};

/*
 * SAMPLE RESOURCES — the library grows by adding items to this list.
 * For PDFs, put the file in /public/resources/ and use "/resources/file.pdf".
 */
export const resources: Resource[] = [
  {
    title: "Common Birds of the Neighbourhood",
    description: "A beginner's field sheet to the birds you are most likely to see and hear.",
    category: "Bird identification",
    type: "Identification",
    href: "#",
  },
  {
    title: "Frog Calls: A Listening Guide",
    description: "How to recognise common frog calls and record them with your phone.",
    category: "Frog identification",
    type: "Guide",
    href: "#",
  },
  {
    title: "Getting Started with iNaturalist",
    description: "Create an account, take useful photos and submit your first observation.",
    category: "Citizen science",
    type: "Link",
    href: "https://www.inaturalist.org",
  },
  {
    title: "eBird for Beginners",
    description: "Record bird checklists that contribute to global bird research.",
    category: "Citizen science",
    type: "Link",
    href: "https://ebird.org",
  },
  {
    title: "Photographing Wildlife Responsibly",
    description: "Field ethics and simple techniques for better nature photos.",
    category: "Wildlife photography",
    type: "PDF",
    href: "#",
  },
  {
    title: "Trees and Plants Around Us",
    description: "Identify common native trees and learn the ecosystem services they provide.",
    category: "Plant identification",
    type: "Guide",
    href: "#",
  },
  {
    title: "Your First Night Under the Stars",
    description: "Find the Moon's craters, bright planets and easy constellations.",
    category: "Astronomy",
    type: "Video",
    href: "#",
  },
  {
    title: "Nature Activities for Classrooms",
    description: "Simple outdoor lessons for teachers covering habitats, food webs and observation.",
    category: "Nature education",
    type: "PDF",
    href: "#",
  },
  {
    title: "Why Biodiversity Matters",
    description: "An introduction to ecosystem services and the species that provide them.",
    category: "Biodiversity",
    type: "Guide",
    href: "#",
  },
  {
    title: "Protecting Local Wetlands",
    description: "Practical steps communities can take to care for ponds, rivers and wetlands.",
    category: "Conservation",
    type: "Guide",
    href: "#",
  },
  {
    title: "Research Publications",
    description: "Papers and reports from our monitoring projects will be listed here.",
    category: "Research publications",
    type: "Publication",
    href: "#",
  },
];
