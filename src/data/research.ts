import { images } from "@/lib/images";

export const researchThemes = [
  {
    title: "Acoustic Monitoring",
    description: "Using sound recordings to monitor frogs, birds and other wildlife.",
    icon: "audio",
  },
  {
    title: "Bird Monitoring",
    description: "Recording bird diversity, distribution and changes in local bird communities.",
    icon: "bird",
  },
  {
    title: "Biodiversity Monitoring",
    description: "Documenting plants, animals and other organisms through field observations and citizen science.",
    icon: "leaf",
  },
  {
    title: "Agriculture & Biodiversity",
    description: "Exploring how agricultural landscapes can support biodiversity and ecosystem health.",
    icon: "sprout",
  },
] as const;

export type ResearchProject = {
  slug: string;
  name: string;
  status: "Ongoing" | "Planned" | "Completed";
  theme: (typeof researchThemes)[number]["title"];
  location: string;
  species: string;
  question: string;
  methods: string[];
  learning: string;
  results: string;
  image: string;
};

/*
 * SAMPLE PROJECTS — the structure follows the brief:
 * Project name · Location · Species/ecosystem · Research question · Methods ·
 * What we are learning · Results/publications.
 * Add a new object here to publish a new project page.
 */
export const projects: ResearchProject[] = [
  {
    slug: "frog-chorus-acoustic-survey",
    name: "Frog Chorus Acoustic Survey",
    status: "Ongoing",
    theme: "Acoustic Monitoring",
    location: "Wetlands and ponds (to be confirmed)",
    species: "Frogs and toads; freshwater wetland ecosystems",
    question: "Which frog species are calling in our local wetlands, and how does activity change through the monsoon?",
    methods: ["Automated audio recorders", "Evening call surveys", "Citizen-science photo records"],
    learning: "Early recordings suggest calling activity peaks in the first hours after rainfall.",
    results: "Results and publications will be shared here.",
    image: images.frog2,
  },
  {
    slug: "neighbourhood-bird-monitoring",
    name: "Neighbourhood Bird Monitoring",
    status: "Ongoing",
    theme: "Bird Monitoring",
    location: "Urban and village neighbourhoods (to be confirmed)",
    species: "Resident and migratory birds",
    question: "How do bird communities differ between green and built-up neighbourhoods?",
    methods: ["Monthly point counts", "Standardised walking routes", "eBird / iNaturalist records"],
    learning: "Trees and water bodies appear to make a large difference to local bird diversity.",
    results: "Results and publications will be shared here.",
    image: images.birds,
  },
  {
    slug: "farmland-biodiversity",
    name: "Biodiversity in Farm Landscapes",
    status: "Planned",
    theme: "Agriculture & Biodiversity",
    location: "Agricultural landscapes (to be confirmed)",
    species: "Birds, insects and field-margin plants",
    question: "Which farming practices help wildlife thrive alongside crops?",
    methods: ["Field-margin surveys", "Insect and pollinator counts", "Conversations with farmers"],
    learning: "Project starting soon.",
    results: "Results and publications will be shared here.",
    image: images.hills,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
