import type { IconName } from "@/components/ui/Icon";

export const pillars: { title: string; description: string; icon: IconName }[] = [
  {
    title: "Nature Discovery",
    description: "Explore local environments through guided walks and field observations.",
    icon: "binoculars",
  },
  {
    title: "Citizen Science",
    description: "Learn to identify species, document biodiversity and contribute to scientific knowledge.",
    icon: "notebook",
  },
  {
    title: "Science & Environmental Education",
    description: "Make science engaging and accessible through interactive learning experiences.",
    icon: "graduation",
  },
  {
    title: "Wildlife Care & Conservation",
    description: "Promote responsible wildlife observation and contribute to local and national conservation.",
    icon: "heart",
  },
];

export const taglineSteps: { label: string; icon: IconName }[] = [
  { label: "Explore", icon: "binoculars" },
  { label: "Learn", icon: "book" },
  { label: "Record", icon: "notebook" },
  { label: "Conserve", icon: "leaf" },
];

export const citizenScienceSteps = [
  {
    title: "Observe",
    description: "Explore your local park, garden, wetland or street and notice the species around you.",
    icon: "eye" as IconName,
  },
  {
    title: "Identify",
    description: "Learn field marks, calls, habitats and other clues used by naturalists and scientists.",
    icon: "search" as IconName,
  },
  {
    title: "Record",
    description: "Photograph, describe and submit observations using appropriate citizen-science platforms.",
    icon: "camera" as IconName,
  },
];
